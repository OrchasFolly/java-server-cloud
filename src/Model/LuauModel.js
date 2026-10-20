import Connection from "../DataBase/connectMySQL.js";

export default class LogsModel {
    #id;
    #send_time;
    #origen;
    #header;
    #place_id;

    constructor(id, send_time, header, origen, place_id) {
        this.#id = id;
        this.#send_time = send_time;
        this.#header = header;
        this.#origen = origen;
        this.#place_id = place_id;

        this.init();
    }

    get id() {
        return this.#id;
    }

    set id(newId) {
        this.#id = newId;
    }

    get send_time() {
        return this.#send_time;
    }

    set send_time(newSendTime) {    
        this.#send_time = newSendTime;
    }

    get header() {
        return this.#header;
    }

    set header(newHeader) {
        this.#header = newHeader;
    }

    get origen() {
        return this.#origen;
    }

    set origen(newOrigen) {
        this.#origen = newOrigen;
    }

    get place_id() {
        return this.#place_id;
    }

    set place_id(newPlaceId) {
        this.#place_id = newPlaceId;
    }

    toJSON(){
        return {
            "id": this.#id,
            "send_time": this.#send_time,
            "header": this.#header,
            "origen": this.#origen,
            "place_id": this.#place_id
        }
    }

    #tableName = "Luau_logs";

    async init()
    {
        const conection = await Connection.connectSingle();
        try {
            const sql = `
            CREATE TABLE IF NOT EXISTS ${this.#tableName} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                send_file_time VARCHAR(255) NOT NULL,
                header VARCHAR(255) NOT NULL,
                origen VARCHAR(255) NOT NULL,
                place_id VARCHAR(255) NOT NULL
            )
            `;
            await conection.execute(sql);
        } catch ( err ) {
            console.log("Error:" + err);
        }
    }

    async insert()
    {
            const conection = await Connection.connectSingle();
            try {
                await conection.beginTransaction();
                const sql = `INSERT INTO ${this.#tableName} (send_file_time, header, origen, place_id)
                            VALUES (?, ?, ?, ?)`;
                const param = [
                    this.#send_time,
                    this.#header,
                    this.#origen,
                    this.#place_id
                ];

                await conection.execute(sql, param);
                await conection.commit();
                await conection.release();
            } catch ( err ) {
                conection.rollback();
                console.log(err);
            }
    }
    
    async update()
    {
            const conection = await Connection.connectSingle();
            try {
                await conection.beginTransaction();
                const sql = `UPDATE ${this.#tableName} SET 
                            send_file_time = ?
                            header = ?
                            origen = ?
                            place_id = ?
                            WHERE id = ?`;            
                const param = [
                    this.#send_time,
                    this.#header,
                    this.#origen,
                    this.#place_id,
                    this.#id
                ];
                await conection.execute(sql, param);
                await conection.commit();
                await conection.release();
            } catch ( err ) {
                conection.rollback();
                console.log(err);
            }
    }
    
    async delete()
    {
            const conection = await Connection.connectSingle();
            try {
                await conection.beginTransaction();
                const sql = `DELETE FROM ${this.#tableName} WHERE id = ?`;
                const param = [this.id];
                await conection.execute(sql, param);
                await conection.commit();
                await conection.release();
            } catch ( err ) {
                conection.rollback();
                console.log(err);
            }
    }
    
    async consult()
    {
        const conection = await Connection.connectSingle();
        try {
            await conection.beginTransaction();
            const sql = `SELECT * FROM ${this.#tableName} ORDER BY id`;
            const [col, line] = await conection.execute(sql);
            await conection.release();
            let response = [];
            for (const item of col){
                const client = new LogsModel
                (
                    item.id,
                    item.origen,
                    item.header,
                    item.send_time,
                    item.place_id
                );
                response.push(client);
                                        
            }
            return response;
        } catch ( err ) {
            console.log(err);
        }
    }
        
    async keyConsult(key)
    {
        const conection = await Connection.connectSingle();
        try {
            await conection.beginTransaction();
            const sql = `SELECT * FROM ${this.#tableName} WHERE id LIKE '${key}%'`;
            const [col, line] = await conection.execute(sql, [key]);
            await conection.release();
            let response = [];
            for (const item of col){
                const client = new LogsModel
                (
                    item.id,
                    item.origen,
                    item.header,
                    item.send_time,
                    item.place_id
                );
                response.push(client);
                                        
            }
            return response;
        } catch ( err ) {
            console.log(err);
        }
    }
}