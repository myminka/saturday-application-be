import dotenv from "dotenv";
import App from './app/app';
import CarsController from './cars/cars.controller';
import CarsRepository from "./cars/car.repository";

dotenv.config();

const app = new App(
  [
    new CarsController(new CarsRepository()),
  ],
  process.env.PORT,
);

app.listen();
