var CONFIG = require("config"),
	passport = require('passport'),
	md5 = require('MD5'),
	FacebookStrategy = require('passport-facebook').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	LocalStrategy = require('passport-local').Strategy;

// helper functions
function findById(id, fn) {
	People.findOne(id).exec(function(err, user) {
		if (err) {
			return fn(null, null);
		} else {
			return fn(null, user);
		}
	});
}

function findByUsername(u, fn) {
	People.findOne({
		username: u,
		activated: true
	}).exec(function(err, user) {
		// Error handling
		if (err) {
			return fn(null, null);
			// The People was found successfully!
		} else {
			return fn(null, user);
		}
	});
}

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	findById(id, function(err, user) {
		done(err, user);
	});
});


// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a email and password), and invoke a callback
// with a user object.
passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done) {
		// asynchronous verification, for effect...
		process.nextTick(function() {
			// Find the user by email. If there is no user with the given
			// email, or the password is not correct, set the user to `false` to
			// indicate failure and set a flash message. Otherwise, return the
			// authenticated `user`.
			People.findOneByEmail(email, function(err, user) {
				if (err) {
					return done(null, err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Unknown email ' + email
					});
				}
				crypto.compare(password, user.password, function(response) {
					if (!response) return done(null, false, {
						message: 'Invalid Password'
					}); // error passwords dont compare
					var returnPeople = {
						email: user.email,
						createdAt: user.createdAt,
						id: user.id
					};
					return done(null, returnPeople, {
						err: false,
						message: 'Logged In Successfully'
					});
				});

			});
		});
	}
));


var createUser = function(userInfo, fn) {
	var userData = {
		reviewer: true,
		critic: false,
		star: false,
		admin: false,
		social: {}
	};
	switch (userInfo.provider) {
		case "twitter":
			userData.name = userInfo.displayName;
			userData.uid = userInfo.id;
			userData.handle = userInfo.username;
			userData.themeBgColor = "#" + userInfo._json.profile_background_color;
			userData.hostedImage = userInfo._json.profile_image_url;
			userData.hostedBanner = userInfo._json.profile_banner_url;
			userData.themeBgColor = userInfo._json.profile_background_color;
			break;
		case "google":
			userData.name = userInfo._json.name;
			userData.uid = userInfo._json.id;
			userData.email = userInfo._json.email;
			userData.firstname = userInfo._json.given_name;
			userData.lastname = userInfo._json.family_name;
			userData.gender = userInfo._json.gender;
			userData.hostedImage = userInfo._json.picture;
			userData.gravatar = "http://www.gravatar.com/avatar/" + md5(userInfo._json.email);
			userData.admin = /@diveinsight.com\s*$/.test(userInfo._json.email);
			break;
		case "facebook":
			userData.name = userInfo._json.name;
			userData.uid = userInfo.id;
			userData.email = userInfo._json.email;
			userData.firstname = userInfo._json.first_name;
			userData.lastname = userInfo._json.last_name;
			userData.gender = userInfo.gender;
			userData.gravatar = "http://www.gravatar.com/avatar/" + md5(userInfo._json.email);
			break;
	}

	People.findOrCreate({
		uid: userInfo.id
	}, userData).exec(function(err, person){
		fn(err, person);
	});
};


var verifyHandler = function(token, tokenSecret, profile, done) {
	process.nextTick(function() {
		createUser(profile, function(err, user){
			return done(err, user);
		});
	});
};

passport.use(new FacebookStrategy({
	clientID: CONFIG.FACEBOOK.clientID,
	clientSecret: CONFIG.FACEBOOK.clientSecret,
	callbackURL: CONFIG.FACEBOOK.callbackURL
}, verifyHandler));

passport.use(new GoogleStrategy({
	clientID: CONFIG.GOOGLE.clientID,
	clientSecret: CONFIG.GOOGLE.clientSecret,
	callbackURL: CONFIG.GOOGLE.callbackURL
}, verifyHandler));

passport.use(new TwitterStrategy({
	consumerKey: CONFIG.TWITTER.clientID,
	consumerSecret: CONFIG.TWITTER.clientSecret,
	callbackURL: CONFIG.TWITTER.callbackURL
}, verifyHandler));