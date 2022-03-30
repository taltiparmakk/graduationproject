const winston = require('winston');
const logger = winston.createLogger({

  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'project-service' },
  transports: [
    
    new winston.transports.File({ filename: '../logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: '../logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: '../logs/combined.log', level: 'info' }),
    
    
  ],
});

module.exports = logger;