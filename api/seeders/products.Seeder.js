const { Seeder } =require( 'mongoose-data-seed');
const  product  =require( '../src/model/product');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync("db/products.json",'utf8'))
 
class productSeeder extends Seeder {
  async shouldRun() {
    return product.countDocuments()
      .exec()
      .then(count => count === 0);
  }
 
  async run() {
    return product.create(data);
  }
}
 
module.exports= productSeeder;