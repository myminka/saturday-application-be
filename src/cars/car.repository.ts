import Car from './car.interface';

import { MongoClient, Collection, ObjectId } from 'mongodb';

class CarsRepository {
    private _client: MongoClient = new MongoClient('mongodb://localhost:27017');
    private _collection: Collection<Car> | undefined;

    async connect() {
        try {
            await this._client.connect();
            console.log("Connected to MongoDB successfully!");
            this._collection = this._client.db('saturday_application_db').collection('cars');
        } catch (err) {
            console.error("Failed to connect to MongoDB", err);
        }
    }
    
    async close() {
        await this._client.close();
        console.log("MongoDB connection closed.");
    }

    async getAll(): Promise<Car[]> {
        if (!this._collection) throw new Error("Collection is not initialized");

        return await this._collection.find({}).toArray();
    }

    async get(id: string): Promise<Car> {
        if (!this._collection) throw new Error("Collection is not initialized");

        const car = await this._collection.findOne({ _id: new ObjectId(id) });
        
        if (!car) return { _id: new ObjectId(-1), brand: '', model: '', year: -1 }

        return car
    }

    async post(car: Car): Promise<void> {
        if (!this._collection) throw new Error("Collection is not initialized");

        await this._collection.insertOne(car);
    }

    async delete(id: string): Promise<void> {
        if (!this._collection) throw new Error("Collection is not initialized");

        await this._collection.deleteOne({ _id: new ObjectId(id) });
    }
}

export default CarsRepository
