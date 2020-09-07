const config = {
    SERVER_PORT: process.env.PORT || 3000,
    DDBB: {
        NAME: 'delilahdb',
        USER: 'root',
        PASS: '',
        PORT: '3306',
        HOST: '127.0.0.1'
    },
    JWT: {
        PRIVATE_KEY: 'secret',
        EXPIRES_TIME: 20
    }
}
module.exports = config