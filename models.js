const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr');

const Gardener = db.define('Gardener',{
  name: {
    type: Sequelize.STRING
  },
  age:{
    type: Sequelize.INTEGER
  }
})

const Plot = db.define('Plot', {
  size: {
    type: Sequelize.INTEGER
  },
  shaded: {
    type: Sequelize.BOOLEAN
  }
})


const Vegetable = db.define('Vegetable',{
  name:{
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },

  planted_on:{
    type: Sequelize.DATE
  }
})

//These have to go together to make all methods reciprocal(1:1)
//Each has one getter and one setter
//Through is not necessary here as its one:one
Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

//Create a brand-new join table (different from 1:1 and 1:many)
//Vegetable can be found on any plot, as well as plots have many vegetables
//Through parameter is necessary as this generates name of join table(thereby the same for both)
//No changes occur to original tables
//You can then use that join table in any way you can use other tables
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'})
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'})

Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})


module.exports = { db, Gardener, Plot, Vegetable };
