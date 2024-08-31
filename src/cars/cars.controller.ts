import { Request, Response, Router } from 'express';
import Car from './car.interface';
import Controller from '../app/controller.interface';
import CarsRepository from './car.repository';

class CarsController implements Controller {
    public path = '/cars';
    public router = Router();

    public _repository: CarsRepository;

    constructor(repository: CarsRepository) {
        this._repository = repository

        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.get_all);
        this.router.get(`${this.path}/:id`, this.get);
        this.router.post(this.path, this.post);
        this.router.delete(`${this.path}/:id`, this.delete);
    }

    get_all = (request: Request, response: Response) => {
        const cars = this._repository.getAll();
        return response.status(200).json(cars);
    }

    get = (request: Request, response: Response) => {
        const id: number = Number(request.params['id'])
        const car = this._repository.get(id);
        return response.status(200).json(car);
    }

    post = (request: Request, response: Response) => {
        const car: Car = request.body;
        this._repository.post(car)
        return response.status(201).json(car);
    }

    delete = (request: Request, response: Response) => {
        const id: number = Number(request.params['id'])
        this._repository.delete(id);
        return response.status(201);
    }
}

export default CarsController;
