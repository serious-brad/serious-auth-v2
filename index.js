import express from "express";
import { config } from "dotenv";
import { userRouter } from "./modules/User/UserRouter.js";
import { db } from "./db.js";
import cookieParser from "cookie-parser";

config()
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', userRouter);

app.listen(process.env.PORT, async () => {
  try {
    await db.sync({ force: false });

    console.log('Connection has been established successfully.');
    console.log('\x1b[34m%s\x1b[0m', `Listening PORT: ${process.env.PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})
