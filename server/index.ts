import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import authRouter from './src/auth/authRoute';
import connectToDatabase from './src/database/db';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const port = process.env.PORT;
const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
    credentials: true 

}

app.use(cors(corsOptions));
app.use(
    session({
        secret: process.env.SESSION_SECRET as string | 'sessino',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            collectionName: 'sessions',
        }),
        cookie: {
            httpOnly: true,
                secure: true,
                sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24,
            
        }
    })
)

app.use('/', authRouter)
connectToDatabase();

app.get('/', (req, res)=> {
    console.log(req.session)
    res.send("Its working fine!")

})

app.listen(3000, ()=> {
    console.log("app is listening on port:", port);
})