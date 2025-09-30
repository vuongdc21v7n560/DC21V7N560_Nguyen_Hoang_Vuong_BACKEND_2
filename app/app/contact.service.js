// app/services/contact.service.js
const MongoDB = require('../utils/mongodb.util');
const { ObjectId } = require('mongodb');

const COLLECTION = 'contacts';

class ContactService {
  constructor() {
    this.db = MongoDB.getDb();
    this.collection = this.db.collection(COLLECTION);
  }

  async create(data) {
    const result = await this.collection.insertOne(data);
    return await this.collection.findOne({ _id: result.insertedId });
  }

  async findAll() {
    return await this.collection.find({}).toArray();
  }

  async findOne(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id, data) {
    if (!ObjectId.isValid(id)) return null;
    const filter = { _id: new ObjectId(id) };
    await this.collection.updateOne(filter, { $set: data });
    return await this.collection.findOne(filter);
  }

  async delete(id) {
    if (!ObjectId.isValid(id)) return false;
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async deleteAll() {
    const result = await this.collection.deleteMany({});
    return result.deletedCount;
  }

  async findAllFavorite() {
    return await this.collection.find({ favorite: true }).toArray();
  }
}

module.exports = ContactService;
