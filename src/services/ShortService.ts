import { IShort } from '../models/Short';
import { nanoid } from 'nanoid';
import mongoService from './MongoService';
import { ObjectId, WithId } from 'mongodb';

class ShortService {
  constructor() {}

  private HASH_LENGTH = 8;
  private COLLECTION_NAME = 'links';

  async create(data: Pick<IShort, 'origin'>) {
    const hash = nanoid(this.HASH_LENGTH);
    const date = new Date().toISOString();

    const newShort: Omit<IShort, '_id'> = {
      hash,
      createdAt: date,
      origin: data.origin,
    };

    const created = await mongoService
      .getCollection(this.COLLECTION_NAME)
      .insertOne(newShort);

    return { ...newShort, _id: new ObjectId(created.insertedId) };
  }

  async getAll() {
    const data = await mongoService
      .getCollection(this.COLLECTION_NAME)
      .find()
      .toArray();

    return data;
  }

  async getOnceById(id: string) {
    const found = await mongoService
      .getCollection(this.COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    return found;
  }

  async getOnceByHash(hash: string) {
    const found = await mongoService
      .getCollection(this.COLLECTION_NAME)
      .findOne({ hash });
    return found;
  }

  async update(id: string, data: Partial<IShort>) {}

  async updateHash(id: string) {
    const hash = nanoid(this.HASH_LENGTH);

    const updated = await mongoService
      .getCollection<IShort>(this.COLLECTION_NAME)
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { hash } });

    return {
      ...updated.value,
      hash,
    };
  }

  async updateOrigin(id: string, origin: string) {
    const updated = await mongoService
      .getCollection<IShort>(this.COLLECTION_NAME)
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { origin } });

    return {
      ...updated.value,
      origin,
    };
  }

  async delete(id: string) {
    const deleted = await mongoService
      .getCollection(this.COLLECTION_NAME)
      .findOneAndDelete({ _id: new ObjectId(id) });

    return {
      ...deleted.value,
      deleted: deleted.ok,
    };
  }
}

const shortService = new ShortService();

export default shortService;
