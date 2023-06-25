const { Seeder } =require( 'mongoose-data-seed');
const  subCategory  =require( '../src/model/subCategory');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync("db/sub_categories.json",'utf8'))
 
class subCategoriesSeeder extends Seeder {
  async shouldRun() {
    return subCategory.countDocuments()
      .exec()
      .then(count => count === 0);
  }
 
  async run() {
    return subCategory.create(data);
  }
}
 
module.exports= subCategoriesSeeder;