/********************************************************************************
*  WEB322 – Assignment 05
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Radmehr Behzadfar Student ID: 148786221 Date: 2024-07-19
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/

require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false
  }
});

const Theme = sequelize.define('Theme', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
}, {
  timestamps: false
});

const Set = sequelize.define('Set', {
  set_num: {
    type: Sequelize.STRING,
    primaryKey: trues
  },
  name: Sequelize.STRING,
  year: Sequelize.INTEGER,
  num_parts: Sequelize.INTEGER,
  theme_id: Sequelize.INTEGER,
  img_url: Sequelize.STRING
}, {
  timestamps: false
});

Set.belongsTo(Theme, { foreignKey: 'theme_id' });

const setData = require("../faculty-solution-A4 - Copy/data/setData.json");
const themeData = require("../faculty-solution-A4 - Copy/data/themeData.json");

function initialize() {
  return sequelize.sync().then(async () => {
    try {
      await Theme.bulkCreate(themeData);
      await Set.bulkCreate(setData);
      console.log("Data inserted successfully");
    } catch (err) {
      console.log("Error inserting data: ", err.message);
    }
  }).catch((err) => {
    console.log('Unable to connect to the database:', err);
  });
}

function getAllSets() {
  return Set.findAll({
    include: [Theme]
  });
}

function getSetByNum(setNum) {
  return Set.findOne({
    where: { set_num: setNum },
    include: [Theme]
  });
}

function getSetsByTheme(theme) {
  return Set.findAll({
    include: [{
      model: Theme,
      where: { name: { [Sequelize.Op.iLike]: `%${theme}%` } }
    }]
  });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
