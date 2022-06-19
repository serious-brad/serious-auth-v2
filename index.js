import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { db } from "./db.js";
import { userRouter } from "./modules/user/userRouter.js";
import { authRouter } from "./modules/auth/authRouter.js";
import { errorMiddleware } from "./modules/error/errorMiddleware.js";

config()
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', [userRouter, authRouter]);

app.use(errorMiddleware)

app.listen(process.env.PORT, async () => {
  try {
    await db.sync({ force: true });

    console.log('Connection has been established successfully.');
    console.log('\x1b[34m%s\x1b[0m', `Listening PORT: ${process.env.PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})
