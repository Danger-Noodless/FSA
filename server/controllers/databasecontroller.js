const client = require('./model.js');
const databasecontroller = {
  async getuser(req, res, next) {
    console.log('getuser controller');
    try {
      const userName = res.locals.username;
      console.log('name💘💘', userName);

      if (!userName) {
        return next({
          status: 400,
          error: 'Name parameter is required.',
        });
      }

      const selectQuery = 'SELECT * FROM fsa_app_db WHERE username = $1';
      const selectParams = [userName];

      const result = await client.query(selectQuery, selectParams);
      console.log('result ', result);

      if (result.rows.length === 0) {
        return next({
          status: 404,
          error: 'User not found.',
        });
      }

      res.locals.user = result.rows[0];
      next();
    } catch (error) {
      return next({
        status: 500,
        error: error.message,
      });
    }
  },

  // async makeuser(req, res, next) {

  //   console.log('makeuser controller invoked')
  //   try {
  //     const {
  //       username,
  //       password,
  //     } = req.body;

  //     // console.log('😀 😃 😄 😁 😆 😅 😂 🤣 🥲 🥹 ☺️ 😊 😇 🙂 🙃 😉 😌 😍',req.body)

  //     // manage error for incomplete user creation
  //     if (!username || !age || !salary) {
  //       next({
  //         status: 400,
  //         error: 'Name, age, and salary required.',
  //       });
  //     }

  //     // create new user
  //     const insertQuery = `INSERT INTO fsa_app_db (username, hashpassword) VALUES ($1, $2)`;
  //     const insertParams = [
  //       username,
  //       password
  //     ];

  //     // const result = await client.query(insertQuery, insertParams);
  //     // res.locals.message = 'User creation succesful.';
  //     return next();
  //   } catch (error) {
  //     return next({
  //       status: 500,
  //       error: error,
  //     });
  //   }
  // },

  async updateUser(req, res, next) {
    try {
      const {
        username,
        age,
        salary,
        taxPercent,
        employerCont,
        medCost1,
        medCost2,
        medCost3,
      } = req.body;
      console.log('BACKEND', req.body);
      // can likely eliminate this interior get request once we have a locals chain after auth implementation
      const selectQuery = 'SELECT * FROM fsa_app_db WHERE username = $1';
      const selectParams = [username];

      const userResults = await client.query(selectQuery, selectParams);
      console.log('line😍95😍😍😍😍😍😍username', username)
      if (userResults.rows.length === 0) {
        return next({
          status: 404,
          error: 'User not found.',
        });
      }

      const currentUser = userResults.rows[0];
      console.log('currentUser ', currentUser);
      const currentUserID = currentUser.id;
      console.log('currentUserID ', currentUserID);


      const updatedName = username || currentUser.username;
      // const updatedHashPassword = hashpassword || currentUser.hashpassword;
      const updatedAge = age || currentUser.age;
      const updatedSalary = salary || currentUser.salary;
      const updatedTaxPercent = taxPercent || currentUser.taxPercent;
      const updatedEmployerCont = employerCont || currentUser.employerCont;
      const updatedMedCost1 = medCost1 || currentUser.medCost1;
      const updatedMedCost2 = medCost2 || currentUser.medCost2;
      const updatedMedCost3 = medCost3 || currentUser.medCost3;

      const updateParams = [
        updatedName,
        updatedAge,
        updatedSalary,
        updatedTaxPercent,
        updatedEmployerCont,
        updatedMedCost1,
        updatedMedCost2,
        updatedMedCost3
      ];

      console.log('😃 😄 😁 😆 😅 ',updateParams)
      
      const updateQuery = `
                UPDATE fsa_app_db
                SET age = $2,
                salary = $3,
                "taxPercent" = $4,
                "employerCont" = $5,
                "medCost1" = $6,
                "medCost2" = $7,
                "medCost3" = $8
                WHERE username = $1
            `;

      try {
        const updateResult = await client.query(updateQuery, updateParams);
        console.log("successfully updated entry")
      } catch (err) {
        console.log('😀 😃 😄 😁 😆 😅 😂 🤣 🥲 🥹 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 UNABLE TO UPDATE DATA')
        console.log('ERRRRRRRR', err)
      }



      const calculations = {};

      calculations.avgMedicalExpenses =
        (updatedMedCost1 + updatedMedCost2 + updatedMedCost3) / 3;
      calculations.avgMedicalExpenses =
        calculations.avgMedicalExpenses.toFixed(2);
      calculations.yearlyCont =
        calculations.avgMedicalExpenses - updatedEmployerCont;
      calculations.monthlyCont = calculations.yearlyCont / 12;
      calculations.salaryAfterCont =
        updatedSalary - calculations.avgMedicalExpenses;

      //   const updateParams = [
      //     updatedName,
      //     updatedAge,
      //     updatedSalary,
      //     updatedTaxPercent,
      //     updatedEmployerCont,
      //     updatedMedCost1,
      //     updatedMedCost2,
      //     updatedMedCost3,
      //     currentUserID,
      //   ];

      //   const updateParams = [
      //     updatedName,
      //     updatedHashPassword,
      //     updatedAge,
      //     updatedSalary,
      //     updatedTaxPercent,
      //     updatedEmployerCont,
      //     updatedMedCost1,
      //     updatedMedCost2,
      //     updatedMedCost3,
      //     currentUserID,
      //   ];

      //   const result = await client.query(updateQuery, updateParams);

      res.locals.message = 'User updated successfully';
      //   res.locals.updatedUser = result.rows;
      res.locals.calculations = calculations;

      return next();
    } catch (error) {
      return next({
        status: 500,
        error: error,
      });
    }
  },

  async deleteuser(req, res, next) {
    try {
      const username = res.locals.user;

      // can likely eliminate this interior get request once we have a locals chain after auth implementation
      const selectQuery = 'SELECT * FROM fsa_app_db WHERE name = $1';
      const selectParams = [username];

      const userResults = await client.query(selectQuery, selectParams);

      if (userResults.rows.length === 0) {
        return next({
          status: 404,
          error: 'User not found.',
        });
      }

      const currentUser = userResults.rows[0];
      console.log('currentUser ', currentUser);
      const currentUserID = currentUser.id;
      console.log('currentUserID ', currentUserID);

      const deleteQuery = 'DELETE FROM fsa_app_db WHERE id = $1';
      const deleteParams = [currentUserID];
      const deleteResult = await client.query(deleteQuery, deleteParams);

      res.locals.deletedUser = deleteResult;
      res.locals.message = 'User deleted';
    } catch (error) {
      return next({
        status: 500,
        error: error.message,
      });
    }
  },
};

module.exports = databasecontroller;
