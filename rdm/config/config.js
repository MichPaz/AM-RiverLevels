const creds = {
  env: {
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.PSQL_HOST || 'localhost',
    dialect: 'postgresql'
  },
};

module.exports = creds;
