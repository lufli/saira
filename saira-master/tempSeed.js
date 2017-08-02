const User = require('./models/user');
const Dish = require('./models/dish');

const users = [{
    email:'abc@123.com',
    password:'abc123'
},{
    email:'123@abc.com',
    password:'123abc'
}];

const dishes =[{
    name:'dish1',
    price:11
},{
    name:'dish2',
    price:12
}];

// const populateDishes = (done)=>{
//     Dish.remove({}).then(()=>{
//         Dish.insertMany(todos);
//     }).then(()=>done());//remove all documents then insert our test data
// };

// (function(done){
//     User.remove({}).then(()=>{
//     User.insertMany(dishes)
//     }).then(()=>done())
// })();

module.exports = {users,dishes};
