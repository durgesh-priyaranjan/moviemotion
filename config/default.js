module.exports = {
    DIR: {
        APP_DIR: function() {
            return __dirname;
        },
        MEDIA_DIR_PATH: function() {
            return __dirname + "/media";
        },
        MEDIA_PUB_PATH_PRE: function() {
            return "/media/";
        }
    },

    MEDIA: {
        type: "local"
    }
}