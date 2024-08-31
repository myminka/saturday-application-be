import Car from './car.interface';

class CarsRepository {
    private _id: number = 0;
    private _cars: Car[] = [];

    getAll(): Car[] {
        return this._cars;
    }

    get(id: number): Car {
        const car = this._cars.find(c => c.id === id);
        if (!car) return { id: -1, brand: '', model: '', year: -1 }
        return car;
    }

    post(car: Car): void {
        car.id = this._id;
        this._id++;
        this._cars.push(car);
    }

    delete(id: number): void {
        const index = this._cars.findIndex(c => c.id === id);
        if (index > -1) {
            this._cars.splice(index, 1);
        }
    }
}

export default CarsRepository
