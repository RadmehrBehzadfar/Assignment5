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
const { Theme, Set, sequelize } = require('./models');
const setData = require("./data/setData");
const themeData = require("./data/themeData");

sequelize.sync({ force: true }).then(async () => {
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
