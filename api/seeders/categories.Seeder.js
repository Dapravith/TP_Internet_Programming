const { Seeder } =require( 'mongoose-data-seed');
const  Category  =require( '../src/model/category');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync("db/categories.json",'utf8'))
 
class categoriesSeeder extends Seeder {
  async shouldRun() {
    return Category.countDocuments()
      .exec()
      .then(count => count === 0);
  }
 
  async run() {
    return Category.create(data);
  }
}
 
module.exports= categoriesSeeder;