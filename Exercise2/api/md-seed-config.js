const  mongoose =require( 'mongoose');
const Users =require( './seeders/user.Seeder');
const Categories= require( './seeders/categories.Seeder');
const subCategories =require( './seeders/subCategories.Seeder');
const Products= require( './seeders/products.Seeder');
require('dotenv').config()
const mongoURL = process.env.DB_CONNECTION || 'mongodb://localhost:27017/test';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
module.exports.seedersList = {
  Users,
  Categories,
  subCategories,
  Products
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
module.exports.connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
module.exports.dropdb = async () => mongoose.connection.db.dropDatabase();
