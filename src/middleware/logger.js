const pino = require('pino');

const infoLogger = pino(
	{
		level: 'info',
		prettyPrint: {
			colorize: true,
			crlf: false,
			levelFirst: true,
			messageKey: 'msg',
			timestampKey: 'time',
			translateTime: true,
			ignore: 'pid,hostname',
		},
	},
	pino.destination(1)
);

const errorLogger = pino(
	{
		level: 'error',
		prettyPrint: {
			colorize: true,
			crlf: false,
			errorLikeObjectKeys: ['err', 'error'],
			levelFirst: true,
			messageKey: 'msg',
			timestampKey: 'time',
			translateTime: true,
			ignore: 'pid,hostname',
		},
	},
	pino.destination(1)
);

module.exports = { errorLogger, infoLogger };
