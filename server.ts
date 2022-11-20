/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>messages</li>
 *     <li>bookmarks</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import * as express from "express";
import {Request, Response} from "express";
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/AuthController";
import DislikeController from "./controllers/DislikeController";

const session = require("express-session");

const cors = require('cors')
const app = express();
const corsConfig = {
    // origin: 'http://localhost:3000',
    origin: 'https://a4-sparkly-macaron-8217a9-fse.netlify.app',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsConfig));
app.use(express.json());

require('dotenv').config();

let sess = {
    secret: process.env.REACT_APP_API_BASE,
    cookie: {
        secure: false
    },
    resave: false,
    saveUninitialized: true
}

if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

app.use(session(sess));

// build the connection string
const PROTOCOL = "mongodb+srv";

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const HOST = "cluster0.kndb1tp.mongodb.net";
const DB_NAME = "fse";
const DB_QUERY = "retryWrites=true&w=majority";

const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString)

//create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const authenticationController = AuthenticationController.getInstance(app);
const dislikeController = DislikeController.getInstance(app);

app.use('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://a4-sparkly-macaron-8217a9-fse.netlify.app");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, " +
        "Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next()
});

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/env', (req, res) => res.send(process.env));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on AWS if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
