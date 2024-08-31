import { Request, Response, Router } from "express";

interface Controller {
    path: string;
    router: Router;
    get_all(request: Request, response: Response): void;
    get(request: Request, response: Response): void;
    post(request: Request, response: Response): void;
    delete(request: Request, response: Response, id: number): void;
}

export default Controller;
