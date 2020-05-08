const config = {
    SERVER_PORT: process.env.PORT || 3000,
    DDBB: {
        NAME: 'delilahdb',
        USER: 'root',
        PASS: '',
        PORT: '3306',
        HOST: 'https://sleepy-mesa-92891.herokuapp.com'
    },
    JWT: {
        PRIVATE_KEY: 'secret',
        EXPIRES_TIME: 10
    }
}
module.exports = config