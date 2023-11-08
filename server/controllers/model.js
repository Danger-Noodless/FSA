const { Client } = require('pg'); // Use 'Client' instead of 'DB'

// previous group's URI
// const PG_URI = 'postgres://unbrdbbu:YlyeXVScMxCm2eFHy-ANcjRLiWdfUK4C@bubble.db.elephantsql.com/unbrdbbu';

// our URI
const PG_URI =
  'postgres://rbnzayte:w5w_t5q23ejXEShRkeJALXfAUbgCDIad@bubble.db.elephantsql.com/rbnzayte';

// host name/address: bubble.db.elephantsql.com
// maintenance and name: unbrdbbu
// password: YlyeXVScMxCm2eFHy-ANcjRLiWdfUK4C



const client = new Client({
  connectionString: PG_URI,
});

client.connect();

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return client.query(text, params, callback);
  },
};
