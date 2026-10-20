import LuauModel from "../Model/LogsModel.js";

export default class LuauControl
{
    static insert(req, res)
    {
        res.type('application/json');

        if(req.method === "POST" && req.is('application/json'))
        {
            const data = req.body;
            const send_time = data.SendTime;
            const header = data.Header;
            const origen = data.Origen;
            const place_id = data.PlaceId;

            console.log(send_time, header, origen, place_id);

            if(send_time && header && origen && place_id)
            {
                const client = new LuauModel(null, send_time, header, origen, place_id);
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
            const client = new LuauModel();

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