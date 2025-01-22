export default () => ({
    mongo: {
        connection_string: process.env.MONGO_CONNECTION_STRING
    },
    app: {
        appPort: 3000,
    },
});
