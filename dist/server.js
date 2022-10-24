"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const express = require("express");
const mongoose_1 = require("mongoose");
const UserController_1 = require("./controllers/UserController");
const TuitController_1 = require("./controllers/TuitController");
const LikeController_1 = require("./controllers/LikeController");
const FollowController_1 = require("./controllers/FollowController");
const BookmarkController_1 = require("./controllers/BookmarkController");
const MessageController_1 = require("./controllers/MessageController");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.kndb1tp.mongodb.net";
const DB_NAME = "fse";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose_1.default.connect(connectionString);
//create RESTful Web service API
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const likeController = LikeController_1.default.getInstance(app);
const followController = FollowController_1.default.getInstance(app);
const bookmarkController = BookmarkController_1.default.getInstance(app);
const messageController = MessageController_1.default.getInstance(app);
app.get('/', (req, res) => res.send('Welcome to Foundation of Software Engineering!'));
app.get('/hello', (req, res) => res.send('Hello World!'));
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on AWS if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
//# sourceMappingURL=server.js.map