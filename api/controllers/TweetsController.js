/**
 * TweetsController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var CONFIG = require("config"),
    Twit = require('twit'),
    analyze = require('Sentimental').analyze,
    positivity = require('Sentimental').positivity,
    util = require("util"),
    negativity = require('Sentimental').negativity;

var T = new Twit({
    consumer_key: CONFIG.TWITTER.consumer_key,
    consumer_secret: CONFIG.TWITTER.consumer_secret,
    access_token: CONFIG.TWITTER.access_token,
    access_token_secret: CONFIG.TWITTER.access_token_secret
});

module.exports = {
    changed: function(tweetFilter) {


        /**
         * [insertTweets: It will insert the tweet in the Tweets DB]
         * @param  {[obj/Array]} tweetObj [Object for single tweet / Array for array of tweets]
         * @return {[Null]}
         */
        var insertTweets = function insertTweets(tweetObj) {
            var tweets = [],

                /**
                 * [formatTweets Extract the fields we require]
                 * @param  {[tweet obj]} tweet [provided by api]
                 * @return {[Null]}
                 */
                formatTweets = function formatTweets(tweet) {
                    return {
                        created_at: tweet.created_at,
                        text: tweet.text,
                        id_str: tweet.id_str,
                        owner: tweet.user.screen_name,
                        owner_name: tweet.user.name,
                        owner_img: tweet.user.profile_image_url,
                        hashes: tweet.entities.hashtags,
                        positivity: positivity(tweet.text),
                        users_involved: tweet.entities.user_mentions
                    };
                };


            // If array iterate through array to get tweets formatted
            if (util.isArray(tweetObj)) {
                _.forEach(tweetObj, function(tweet) {
                    if ( tweet.text.indexOf("RT") !== 0){
                        tweets.push(formatTweets(tweet));
                    }
                });
            } else {
                 if ( tweetObj.text.indexOf("RT") !== 0){
                    tweets = formatTweets(tweetObj);
                }
            }

            // Insert tweets in DB
            Tweets.create(tweets, function(err, tweets) {
                Tweets.publishCreate(tweets);
            });
        };

        /**
         * [fetchTweets Fetch the tweets from API]
         * @param  {["@"/"#"]} tweetType [can be handle or hash]
         * @return {[Null]}
         */
        var fetchTweets = function fetchTweets(tweetType) {
            var url = "statuses/user_timeline",
                tweets = [],
                filter = {
                    count: 100
                };

            if (tweetType === "@") {
                filter.screen_name = tweetFilter.name;
            } else {
                url = "search/tweets";
                filter.q = tweetFilter.name;
            }

            T.get(url, filter, function(err, tweetsArr, response) {

                if (err) { return;}

                if (util.isArray(tweetsArr)) {
                    insertTweets(tweetsArr);
                } else if(util.isArray(tweetsArr.statuses)){
                    insertTweets(tweetsArr.statuses);
                }
                
            });
        };


        /**
         * [findFilterText Fetch the tweetfilter array]
         * @return {[string]} [comma separated string from array of filter]
         */
        var findFilterText = function findFilterText( cb ) {
            // body...
            Tweetfilters.find({})
            .exec(function(err, filters){
                if ( err ) return;

                var filterText = _.flatten(filters, 'name');
                filterText = filterText.join(',');
                cb( filterText );
            });
        };


        /**
         * [listenForTweets description]
         * @return {[type]} [description]
         */
        var listenForTweets = function listenForTweets(){

            // Fetch all the tweetfilters present
            // Create comma separated value of filters
            // Track them (filters)
            // Listen for new tweets
            findFilterText(function( filterText ){
                if ( !filterText ) { return; }

                var hashes = T.stream('statuses/filter', { track: filterText});
                hashes.on('tweet', function (tweet) {
                    insertTweets(tweet);
                });
            });
        };


        // Fetch tweets for newly added tags
        if( tweetFilter ){
            fetchTweets(tweetFilter.type);
        }

        // Start listening for all the tags present in TweetFilter
        // listenForTweets();
    }
};