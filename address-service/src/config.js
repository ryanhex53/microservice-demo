const DB_HOST = process.env.DB_HOST || 'localhost:27017';
const RPC_PORT = process.env.RPC_PORT || 8080;
const USER_RPC_HOST = process.env.USER_RPC_HOST || 'localhost';
const USER_RPC_PORT = process.env.USER_RPC_PORT || 8080;

module.exports = { DB_HOST, RPC_PORT, USER_RPC_HOST, USER_RPC_PORT };