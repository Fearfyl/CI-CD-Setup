import models from '../models/index.js';
import db from '../config/connection.js';

export default async function cleanDb(modelName: "Question", collectionName: string) {
  try {
    const model = models[modelName];
    if (!model?.db?.db) {
      throw new Error(`Model ${modelName} or its database connection does not exist`);
    }

    const modelExists = await model.db.db.listCollections({ name: collectionName }).toArray();

    if (modelExists.length > 0) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
