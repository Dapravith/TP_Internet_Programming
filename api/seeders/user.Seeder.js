const { Seeder } = require('mongoose-data-seed');
const  User  =require( '../src/model/user');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync("db/users.json",'utf8'))
 
class UsersSeeder extends Seeder {
  async shouldRun() {
    return User.countDocuments()
      .exec()
      .then(count => count === 0);
  }
 
  async run() {
    return User.create(data);
  }
}
 
module.exports= UsersSeeder;