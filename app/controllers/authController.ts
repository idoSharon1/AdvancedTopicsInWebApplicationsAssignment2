import { Request, Response } from 'express';
import userModel, { IUser } from '../db/models/UsersModel.js';
import bcrypt from 'bcrypt';
import { generateToken, verifyRefreshToken } from '@app/utils/auth.js';


 const register = async (req: Request, res: Response) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
};

 const login = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).send('wrong username or password');
            return;
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).send('wrong username or password');
            return;
        }
        if (!process.env.TOKEN_SECRET) {
            res.status(500).send('Server Error');
            return;
        }

        // generate token
        const tokens = generateToken(user._id);
        if (!tokens) {
            res.status(500).send('Server Error');
            return;
        }
        if (!user.refreshToken) {
            user.refreshToken = [];
        }
        user.refreshToken.push(tokens.refreshToken);
        await user.save();
        res.status(200).send(
            {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                _id: user._id
            });

    } catch (err) {
        res.status(400).send(err);
    }
};

 const logout = async (req: Request, res: Response) => {
    try {
        const user = await verifyRefreshToken(req.body.refreshToken);
        await user.save();
        res.status(200).send("success");
    } catch (err) {
        res.status(400).send("fail");
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const user : IUser | null = await userModel.findOne({ email: req.params.email});
        if (!user) {
            res.status(400).send('username not exsits');
            return;
        }
        res.status(200).send({user});
    } catch (err) {
        res.status(400).send(err);
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users : IUser[] | null = await userModel.find();
        if (!users) {
            res.status(400).send('users not exsits');
            return;
        }
        res.status(200).send({users});
    } catch (err) {
        res.status(400).send(err);
    }
};


export default {
    register,
    login,
    logout,
    getUserById,
    getAllUsers
};