import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./configuration/config";
import dbProvider from "./dbProvider";
import entities from './domain/entities';
import router from "./router";
import errorMiddleware from "./middleware/errorMiddleware";

const PORT = config.PORT;
const BASE_ROUTE = config.BASE_ROUTE;
const application = express();

application.use(cors);
application.use(cookieParser());
application.use(json());
application.use(errorMiddleware);
application.use(BASE_ROUTE, router);

const startApp = async () => {
  try {
    await dbProvider.authenticate();
    entities.forEach(async (e) => await e.sync());
    application.listen(PORT, () => console.log(`Server started on ${PORT} port!`));
  } catch (e) {
    console.error(e as Error);
  }
};

startApp();
