import mysql from "mysql2/promise";

export default class Connection
{
    static connectionPool
    
    static async connectSingle()
    {
        if (Connection.connectionPool == null)
        {
            Connection.connectionPool = mysql.createPool({ 
                host: '64.181.163.74',
                user: 'rootR123',
                database: 'Testando',
                port: 3306,
                password: 'out123456',
                waitForConnections: true,
                connectionLimit: 500,
                maxIdle: 500, // max idle connections, the default value is the same as `connectionLimit`
                idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
                queueLimit: 0,
                enableKeepAlive: true,
                keepAliveInitialDelay: 0,
            });
        }
        return await Connection.connectionPool.getConnection();
    }
}