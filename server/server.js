import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

const app=express();

mongoose.connect(process.env.DB_URL)
.then(()=>console.log('DB CONNECTED!'))
.catch((err)=>console.log(`DB CONNECTION ERROR: ${err}`))

app.use(morgan('dev'));
app.use(cors({origin:true, credentials:true}));

app.use(json());
app.use(urlencoded({extended:false}));

const PORT=process.env.PORT || 4040;

app.listen(PORT, ()=>console.log(`server on ${PORT}`));