module.exports = {
    DB: {
        adapter: 'sails-mongo',
        host: 'localhost',
        port: 27017,
        user: '',
        password: '',
        database: 'moviemotion'
    },

    GOOGLE: {
        clientID: "523617801190-ngceudm9gi6r045ka846sji6131edso9.apps.googleusercontent.com",
        clientSecret: "WaV0Gnug0GrTxaWzeVmsCOJd",
        callbackURL: "http://localhost:1337/auth/google/callback"
    },

    FACEBOOK: {
        clientID: "1491876574362159",
        clientSecret: "f15632294a97aa05972d4279e402caaa",
        callbackURL: "http://localhost:1337/auth/facebook/callback"
    },

    TWITTER: {
        clientID: "ClcXrdRIYWO3jlEGP711R6Yo5",
        clientSecret: "p5wgUDbIixSJlkg8Wz4hfGnTqaZNeFkxIjOb1gnZb03nIHElvI",
        callbackURL: "http://127.0.0.1:1337/auth/twitter/callback",

        consumer_key: '5jIb9hGLNQOk5V3GM35UEw',
        consumer_secret: 'sB9M4KT7FDsYwhNgdgcef2QVeWDlA2tUaU7F4pfCg',
        access_token: '591636649-Br5zBs40aPG3Ahb81vE0fVWjNasHzRCYJf5N1ylM',
        access_token_secret: 'HltvjlfWfhx1vFAhLVkfoh4nbQeapPHFW4IzZSQ'
    },
};