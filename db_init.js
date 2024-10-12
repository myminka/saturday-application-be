const dbName = 'saturday_application_db'

db = db.getSiblingDB(dbName);

db.dropDatabase();

db.createCollection("cars");

db.cars.insertMany([
    { brand: 'Toyota', model: 'Chaser', year: '1999' },
    { brand: 'Nissan', model: 'Skyline', year: '1999' },
    { brand: 'Toyota', model: 'Supra', year: '1999' },
    { brand: 'Nissan', model: 'Silvia', year: '1999' },
]);

print("The DB has been recreated!");
