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

// app/services/contact.service.js
const { ObjectId } = require('mongodb');

class ContactService {
  /**
   * @param {Db} db - MongoDB database instance (vd: MongoDB.getDb())
   */
  constructor(db) {
    if (!db) throw new Error('Missing db instance in ContactService');
    this.Contact = db.collection('contacts');
  }

  // Tạo mới contact, trả về document vừa tạo
  async create(data) {
    if (!data || !data.name || !data.email) {
      throw new Error('Name and email are required');
    }
    const doc = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      favorite: !!data.favorite,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await this.Contact.insertOne(doc);
    return await this.Contact.findOne({ _id: result.insertedId });
  }

  // Lấy danh sách (hỗ trợ filter by name)
  async findAll(filter = {}) {
    const query = {};
    if (filter.name) query.name = { $regex: filter.name, $options: 'i' };
    return await this.Contact.find(query).toArray();
  }

  // Lấy 1 contact theo id
  async findOne(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.Contact.findOne({ _id: new ObjectId(id) });
  }

  // Cập nhật contact, trả về document sau khi update
  async update(id, data) {
    if (!ObjectId.isValid(id)) return null;
    const updateDoc = {
      $set: {
        ...data,
        updatedAt: new Date()
      }
    };
    const result = await this.Contact.findOneAndUpdate(
      { _id: new ObjectId(id) },
      updateDoc,
      { returnDocument: 'after' } // Node driver v4+ dùng returnDocument
    );
    return result.value; // null nếu không tìm thấy
  }

  // Xóa 1 contact theo id, trả true/false
  async delete(id) {
    if (!ObjectId.isValid(id)) return false;
    const result = await this.Contact.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  // Xóa tất cả contact, trả số lượng xóa
  async deleteAll() {
    const result = await this.Contact.deleteMany({});
    return result.deletedCount;
  }

  // Lấy tất cả favorite
  async findAllFavorite() {
    return await this.Contact.find({ favorite: true }).toArray();
  }
}

module.exports = ContactService;

const { ObjectId } = require("mongodb");
const { dbName } = require("../utils/mongodb.util");

class ContactService {
  constructor(client) {
    this.collection = client.db(dbName).collection("contacts");
  }

  // Tạo contact mới
  async create(payload) {
    const result = await this.collection.insertOne(payload);
    return result.ops ? result.ops[0] : { _id: result.insertedId, ...payload };
  }
}

module.exports = ContactService;


