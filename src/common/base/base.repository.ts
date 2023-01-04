import { Injectable, NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model, ProjectionType, UpdateQuery } from 'mongoose';

@Injectable()
export abstract class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async find(filterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.model.find(filterQuery);
  }

  async findOne(filterQuery: FilterQuery<T>, projection: ProjectionType<T> = {}): Promise<T | null> {
    return this.model.findOne(filterQuery, projection).sort({ createdAt: 'desc' }).exec();
  }

  async findById(id: string, projection?: Record<string, unknown>): Promise<T> {
    const model = await this.findOne({ _id: id }, projection);
    if (!model) throw new NotFoundException(`Not found with id: ${id}`);

    return model;
  }

  async create(createModel: unknown): Promise<T> {
    const nModel = new this.model(createModel);

    return nModel.save();
  }

  async findOneAndUpdate(filterQuery: FilterQuery<T>, updateData: UpdateQuery<unknown>): Promise<T | null> {
    return this.model.findOneAndUpdate(filterQuery, updateData, {
      new: true,
      returnOriginal: false,
    });
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const result = await this.model.deleteMany(filterQuery);

    return result.deletedCount >= 1;
  }


  async insertMany(filterQuery:FilterQuery<T>[]):Promise<T[]|null>{
    const  data = await this.model.insertMany(filterQuery)
    return data
  }



  getModel(): Model<T> {
    return this.model;
  }
}
