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
        clientID: "523617801190-dldfkt99lh8n4bbjuksgq8s9d0sd6mo9.apps.googleusercontent.com",
        clientSecret: "Pp_cyGrnHnYuhV97QdFbwwdK",
        callbackURL: "http://www.moviemotion.in/auth/google/callback"
    },

    FACEBOOK: {
        clientID: "1491874857695664",
        clientSecret: "afb1f20bc499c502d1c29ae7219bd925",
        callbackURL: "http://www.moviemotion.in/auth/facebook/callback"
    },

    TWITTER: {
        clientID: "rfEaVdipXAOWYAnWN1OdqYKnS",
        clientSecret: "Va5VOmyr8Okz7NqGZFTkYB6z0yQ4ou5Ys35avLVXPya5LlnoIt",
        callbackURL: "http://www.moviemotion.in/auth/twitter/callback",

        consumer_key: '5jIb9hGLNQOk5V3GM35UEw',
        consumer_secret: 'sB9M4KT7FDsYwhNgdgcef2QVeWDlA2tUaU7F4pfCg',
        access_token: '591636649-NadMurem9Ayx7B16HiSTQieu28F7mAMuBe9DzMf7',
        access_token_secret: 't1zLkYJSjCdWvfkvJQ40x0DxGVnxXbXjrOa4SKXyXYVta'
    },
};