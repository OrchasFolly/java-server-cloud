import LogsModel from "../Model/LogsModel.js";

export default class LogsControl
{
    static insert(req, res)
    {
        res.type('application/json');

        if(req.method === "POST" && req.is('application/json'))
        {
            const data = req.body;
            const files = data.Files;
            for (const key in files) {
                if (Object.hasOwnProperty.call(files, key)) {
                    const file = files[key];
                    const header = file.Header;
                    const origen = file.Origen;
                    const send_time = file.SendFileTime;
                    const create_time = file.CreationTime;
                    const text_lines = file.TextLines;

                    console.log("header: ", header + " origen: " + origen + " send_time: " + send_time + " create_time: " + create_time + " text_lines: " + text_lines);

                    if(send_time && create_time && header && origen && text_lines)
                    {
                        const client = new LogsModel(null, header, origen, send_time, create_time, text_lines);
                        client.insert().then(() => {
                            res.status(200).json({
                                status: true,
                                message: "success insert"
                            });
                        }).catch((erro) => {
                            res.status(500).json({
                                status: false,
                                message: erro.message
                            });
                        });
                    }
                    else
                    {
                        res.status(400).json({
                            status: false,
                            message: "send all data correctly"
                        });
                    }
                }
                else
                {
                    res.status(400).json({
                        status: false,
                        message: "send all data correctly"
                    });
                }
            }
        }
        else
        {
            res.status(400).json({
                status:false,
                message:"refuse or not allowed method"
            });
        }
    }

    static update(req, res)
    {
        res.type('application/json');

        if(req.method === "PUT" && req.is('application/json'))
        {
            const data = req.body;
            const id = data.id;
            const header = data.Header;
            const origen = data.Origen;
            const send_file_time = data.SendFileTime;
            const create_file_time = data.CreationTime;
            const text_lines = data.TextLines;

            if(id && header && origen && send_file_time && create_file_time && text_lines)
            {
                const client = new LogsModel(id, header, origen, send_file_time, create_file_time, text_lines);
                client.update().then(() => {
                    res.status(200).json({
                        status: true,
                        message: "success update"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
            else
            {
                res.status(400).json({
                    status: false,
                    message: "send all data correctly"
                });
            }
        }
        else
        {
            res.status(400).json({
                status:false,
                message:"refuse or not allowed method"
            });
        }
    }

    static delete(req, res)
    {
        res.type('application/json');

        if(req.method === "DELETE" && req.is('application/json'))
        {
            const data = req.body;
            const id = data.id;

            if(id)
            {
                const client = new LogsModel(id);
                client.delete().then(() => {
                    res.status(200).json({
                        status: true,
                        message: "success delete"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
            else
            {
                res.status(400).json({
                    status: false,
                    message: "send all data correctly"
                });
            }
        }
        else
        {
            res.status(400).json({
                status:false,
                message:"refuse or not allowed method"
            });
        }
    }

    static consult(req, res)
    {
        res.type('application/json');

        if(req.method === "GET")
        {
            const client = new LogsModel();

            if (req.params.key)
            {
                client.keyConsult(req.params.key).then((response) => {
                    res.status(200).json(
                        {
                            "status": true,
                            "clients": response
                        }
                    );
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
            else
            {
                client.consult('').then((response) => {
                    res.status(200).json(
                        {
                            "status": true,
                            "clients": response
                        }
                    );
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
        }
        else
        {
            res.status(400).json({
                status:false,
                message:"refuse or not allowed method"
            });
        }
    }
}