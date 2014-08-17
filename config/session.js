/**
 * Session Configuration
 * (sails.config.session)
 *
 * Sails session integration leans heavily on the great work already done by
 * Express, but also unifies Socket.io with the Connect session store. It uses
 * Connect's cookie parser to normalize configuration differences between Express
 * and Socket.io and hooks into Sails' middleware interpreter to allow you to access
 * and auto-save to `req.session` with Socket.io the same way you would with Express.
 *
 * For more information on configuring the session, check out:
 * http://links.sailsjs.org/docs/config/session
 */
var CONFIG = require("config");

module.exports.session = {
	secret: '91d5eb33663ccbec111dee68fa539cbf',
	adapter: 'mongo',
	host: CONFIG.DB.host,
	port: CONFIG.DB.port,
	user: CONFIG.DB.user,
	password: CONFIG.DB.password,
	db: CONFIG.DB.database,
	collection: 'sessions'
};