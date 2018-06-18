const { db, Gardener, Plot, Vegetable } = require('./models')

db.sync({force: true})
.then(() => {
  console.log('Success!!')
  db.close()
})
.catch((err) => {
  console.log('Something went wrong!')
  console.log(err)
  db.close()
});

Gardener.bulkCreate([
  { name: "Jim", age: 67 },
  { name: 'Sandy', age:55 },
  { name:'Bob', age: 50 }
])
.then(() => {
  return Gardener.findAll();
})
.then(gardeners => console.log(gardeners))
.catch(err => console.error(err));
