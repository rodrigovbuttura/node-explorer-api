const dotenv = require('dotenv');
const fs = require('fs');
const env = fs.existsSync('./.env');

dotenv.config({ 
    path: (!env) ? ".env.developer" : ".env" 
});
