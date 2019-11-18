import { IWrite } from '../Interfaces/base/IWrite';
import { IRead } from '../Interfaces/base/IRead';

import { MongoClient, Db, Collection, InsertOneWriteOpResult } from 'mongodb';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {

    // public readonly _collection: Collection;
  
    // constructor(db: Db, collectionName: string) {
    //   this._collection = db.collection(collectionName);
    // }
  
    async create(item: T): Promise<boolean> {
      console.log('item', item);
      // const result: InsertOneWriteOpResult = await this._collection.insert(item);
      // return !!result.result;
      return true;
    }
  
    update(id: string, item: T): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    find(item: T): Promise<T[]> {
      throw new Error('Method not implemented.');
    }
    findOne(id: string): Promise<T> {
      throw new Error('Method not implemented.');
    }
  }