import { ObjectId } from "mongodb";

interface Car {
    _id: ObjectId;
    brand: string;
    model: string;
    year: number;
}

export default Car;
