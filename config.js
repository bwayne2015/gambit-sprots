'use strict';
require('dotenv').config();

exports.const = {
	apiPort: process.env.PORT ||  6005,
    dbHost: process.env.DB_HOST || 'localhost',
    dbUser: process.env.DB_USER || 'postgres',
    dbPassword: process.env.DB_PASSWORD || '',
    database: process.env.DATABASE || 'prisma',
    defaultLanguage: 'english'
};
