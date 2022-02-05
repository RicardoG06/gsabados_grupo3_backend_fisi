const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
    return stringValue;
});

const databaseConfig = {
    'host': 'ec2-34-205-46-149.compute-1.amazonaws.com',
    'port': 5432,
    'database': 'd3fdd1paovov48',
    'user': 'gaabyrximxsunb',
    'password': '4c2ade99312d46141bd3cc33c483df9ed17ad2df2694e44bc8baeef04811a898',
    'ssl':{rejectUnauthorized: false}
};

const db = pgp(databaseConfig);
module.exports = db;