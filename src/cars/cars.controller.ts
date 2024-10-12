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
        try {
            const cars = await this._repository.getAll();
            return response.status(200).json(cars);
        } catch (error) {
            response.status(500).json({ error: 'Failed to get all' });
        }
    }

    get = async (request: Request, response: Response) => {
        try {
            const id: string = String(request.params['id'])
            const car = await this._repository.get(id);

            if (!car) {
                return response.status(404).json('Failed to find & get');
            }

            return response.status(200).json(car);
        } catch (error) {
            response.status(500).json({ error: 'Failed to get' });
        }
    }

    post = async (request: Request, response: Response) => {
        try {
            const car: Car = request.body;
            await this._repository.post(car)
            return response.status(201).json(car);
        } catch (error) {
            return response.status(500).json({ error: 'Failed to post' });
        }
    }

    delete = async (request: Request, response: Response) => {
        try {
            const id: string = String(request.params['id'])
            const deleted = await this._repository.delete(id);

            if (deleted) {
                return response.status(200).json();
            }

            return response.status(404).json('Failed to find & delete');
        } catch (error) {
            response.status(500).json({ error: 'Failed to delete' });
        }
    }
}

export default CarsController;
