const mysql = require('mysql-await');
require('dotenv').config();

const connectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
}

let connectionPool;

async function createConnectionPool() {
    console.log('Start Connection');
    connectionPool = await mysql.createPool(connectionConfig);
    connectionPool.on('error', (err)=>{
        connectionPool.awaitEnd();
        createConnectionPool();
    })
    connectionPool.on(`release`, (connection)=>{
        console.log(`Connection ${connection.threadId} released`);
    })
    connectionPool.on('acqired', (connection)=>{
        console.log(`Connection ${connection.threadId} connected`);
    })
    console.log('SuccessConnection');
}

createConnectionPool();

async function changeOrderStatus(orderId) {
    try {
        const result = await connectionPool.awaitQuery(`UPDATE order_table SET status=? WHERE id=?`, [0, orderId]);
        return result.insertId;
    }
    catch (err) {
        console.log(err);
        return 'SERVER_ERROR';
    }
}

module.exports = {
    changeOrderStatus
}
