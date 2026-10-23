import Connection from "../DataBase/connectMySQL.js";

export default class LogsModel {
    #id;
    #send_time;
    #create_time;
    #header;
    #text_lines;
    #origen;

    constructor(id, header, origen, send_time, create_time, text_lines) {
        this.#id = id;
        this.#header = header;
        this.#origen = origen;
        this.#send_time = send_time;
        this.#create_time = create_time;
        this.#text_lines = text_lines;

        this.init();
    }

    get id() {
        return this.#id;
    }

    set id(newId) {
        this.#id = newId;
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

    get send_time() {
        return this.#send_time;
    }

    set send_time(newSendTime) {    
        this.#send_time = newSendTime;
    }

    get create_time() {
        return this.#create_time;
    }

    set create_time(newCreateTime) {
        this.#create_time = newCreateTime;
    }

    get text_lines() {
        return this.#text_lines;
    }

    set text_lines(newTextLines) {
        this.#text_lines = newTextLines;
    }

    toJSON(){
        return {
            "id": this.#id,
            "header": this.#header,
            "origen": this.#origen,
            "send_time": this.#send_time,
            "create_time": this.#create_time,
            "text_lines": this.#text_lines
        }
    }

    #tableName = "Data_logs";

    async init()
    {
        const conection = await Connection.connectSingle();
        try {
            const sql = `
                CREATE TABLE IF NOT EXISTS ${this.#tableName} (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    header VARCHAR(255) NOT NULL,
                    origen VARCHAR(255) NOT NULL,
                    send_file_time VARCHAR(255) NOT NULL,
                    create_file_time VARCHAR(255) NOT NULL,
                    text_lines TEXT NOT NULL
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
                const sql = `INSERT INTO ${this.#tableName} (header, origen, send_file_time, create_file_time, text_lines)
                            VALUES (?, ?, ?, ?, ?)`;
                const param = [
                    this.#header,
                    this.#origen,
                    this.#send_time,
                    this.#create_time,
                    this.#text_lines
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
                            text_lines = ?
                            create_file_time = ?
                            send_file_time = ?
                            origen = ?
                            header = ?
                            WHERE id = ?`;            
                const param = [
                    this.#text_lines,
                    this.#create_time,
                    this.#send_time,
                    this.#origen,
                    this.#header,
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
                    item.header,
                    item.origen,
                    item.send_file_time,
                    item.create_file_time,
                    item.text_lines
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
                    item.header,
                    item.origen,
                    item.send_file_time,
                    item.create_file_time,
                    item.text_lines
                );
                response.push(client);
                                        
            }
            return response;
        } catch ( err ) {
            console.log(err);
        }
    }
}