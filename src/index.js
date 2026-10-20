import express from 'express';
import cors from 'cors';
import javaRouter from './Routes/JavaRouter.js';
import logsModel from './Model/LogsModel.js';

const port = 5423;
const localhost = "localhost"; // "0.0.0.0"
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.urlencoded({extended:true, limit: '100mb'}));
app.use(express.json({limit: '100mb'}));

app.use("/java", javaRouter);

app.get('', async (req, res) => {
    const action = new logsModel();
    const response = await action.consult()
    console.log(response);

    res.status(201).json({
        status: true,
        message: "message successfully returned",
        list: response
    });
})

app.listen(port,localhost, ()=>{
    console.log(`Backend running in http://${localhost}:${port}`);
});