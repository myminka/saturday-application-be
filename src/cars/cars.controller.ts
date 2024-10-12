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

        this.initRoutes();
    }

    public async init(): Promise<void> {
        await this._repository.connect();
    }

    initRoutes() {
        this.router.get(this.path, this.get_all);
        this.router.get(`${this.path}/:id`, this.get);
        this.router.post(this.path, this.post);
        this.router.delete(`${this.path}/:id`, this.delete);
    }

    get_all = async (request: Request, response: Response) => {
        const cars = await this._repository.getAll();
        return response.status(200).json(cars);
    }

    get = async (request: Request, response: Response) => {
        const id: string = String(request.params['id'])
        const car = await this._repository.get(id);
        return response.status(200).json(car);
    }

    post = async (request: Request, response: Response) => {
        const car: Car = request.body;
        await this._repository.post(car)
        return response.status(201).json(car);
    }

    delete = async (request: Request, response: Response) => {
        const id: string = String(request.params['id'])
        await this._repository.delete(id);
        return response.status(201).json();
    }
}

export default CarsController;
