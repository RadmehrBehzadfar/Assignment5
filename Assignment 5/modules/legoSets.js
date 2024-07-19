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


const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
  return new Promise((resolve, reject) => {
    setData.forEach(setElement => {
      let setWithTheme = { ...setElement, theme: themeData.find(themeElement => themeElement.id == setElement.theme_id).name }
      sets.push(setWithTheme);
      resolve();
    });
  });

}

function getAllSets() {
  return new Promise((resolve, reject) => {
    resolve(sets);
  });
}

function getSetByNum(setNum) {

  return new Promise((resolve, reject) => {
    let foundSet = sets.find(s => s.set_num == setNum);

    if (foundSet) {
      resolve(foundSet)
    } else {
      reject("Unable to find requested set");
    }

  });

}

function getSetsByTheme(theme) {

  return new Promise((resolve, reject) => {
    let foundSets = sets.filter(s => s.theme.toUpperCase().includes(theme.toUpperCase()));

    if (foundSets.length > 0) {
      resolve(foundSets)
    } else {
      reject("Unable to find requested sets");
    }

  });

}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme }

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
    primaryKey: true
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

const setData = require("../data/setData");
const themeData = require("../data/themeData");

sequelize.sync().then(async () => {
  try {
    await Theme.bulkCreate(themeData);
    await Set.bulkCreate(setData);
    console.log("-----");
    console.log("data inserted successfully");
  } catch (err) {
    console.log("-----");
    console.log(err.message);
  }

  process.exit();
}).catch((err) => {
  console.log('Unable to connect to the database:', err);
});
