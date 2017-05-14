var mysql  = require('mysql');

function createDBConnection() {

    if (!process.env.NODE_ENV || process.env.node === 'dev')
    {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bam'
        });
    }
    else if(process.env.NODE_ENV == 'test')
    {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bam_test'
        });
    }
    
}

//wrapper
module.exports = function() {
    return createDBConnection;
}
