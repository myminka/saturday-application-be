import Car from './car.interface';

import { MongoClient, Collection, ObjectId } from 'mongodb';

class CarsRepository {
    private _client: MongoClient = new MongoClient('mongodb://localhost:27017');
    private _collection: Collection<Car> | undefined;

    async connect() {
        try {
            await this._client.connect();
            console.log("Connected to MongoDB successfully.");
            this._collection = this._client.db('saturday_application_db').collection('cars');
        } catch (error) {
            console.error("Failed to connect to MongoDB.", error);
        }
    }
    
    async close() {
        await this._client.close();
        console.log("Disconnected from MongoDB successfully.");
    }

    async getAll(): Promise<Car[]> {
        if (!this._collection) throw new Error("Collection is not initialized");

        return await this._collection.find({}).toArray();
    }

    async get(id: string): Promise<Car | null> {
        if (!this._collection) throw new Error("Collection is not initialized");

        return await this._collection.findOne({ _id: new ObjectId(id) });
    }

    async post(car: Car): Promise<void> {
        if (!this._collection) throw new Error("Collection is not initialized");

        await this._collection.insertOne(car);
    }

    async delete(id: string): Promise<boolean> {
        if (!this._collection) throw new Error("Collection is not initialized");

        return (await this._collection.deleteOne({ _id: new ObjectId(id) })).deletedCount > 0;
    }
}

export default CarsRepository
