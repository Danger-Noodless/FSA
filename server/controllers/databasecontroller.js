const client = require('./model.js');
const databasecontroller = {
  async getuser(req, res, next) {
    console.log('getuser controller');
    try {
      const userName = res.locals.user;
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

  async makeuser(req, res, next) {
    try {
      const {
        username,
        hashPassword,
        age,
        salary,
        taxPercent,
        employerCont,
        medCost1,
        medCost2,
        medCost3,
      } = req.body;

      // manage error for incomplete user creation
      if (!username || !age || !salary) {
        next({
          status: 400,
          error: 'Name, age, and salary required.',
        });
      }

      // create new user
      const insertQuery = `INSERT INTO fsa_app_db (username, hashPassword, age, salary, taxPercent, employerCont, medCost1, medCost2, medCost3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
      const insertParams = [
        username,
        hashPassword,
        age,
        salary,
        taxPercent,
        employerCont,
        medCost1,
        medCost2,
        medCost3,
      ];

      const result = await client.query(insertQuery, insertParams);
      res.locals.message = 'User creation succesful.';
      return next();
    } catch (error) {
      return next({
        status: 500,
        error: error,
      });
    }
  },

  async updateUser(req, res, next) {
    try {
      const {
        username,
        hashPassword,
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
      const updatedHashPassword = hashPassword || currentUser.hashPassword;
      const updatedAge = age || currentUser.age;
      const updatedSalary = salary || currentUser.salary;
      const updatedTaxPercent = taxPercent || currentUser.taxPercent;
      const updatedEmployerCont = employerCont || currentUser.employerCont;
      const updatedMedCost1 = medCost1 || currentUser.medCost1;
      const updatedMedCost2 = medCost2 || currentUser.medCost2;
      const updatedMedCost3 = medCost3 || currentUser.medCost3;

      //   const updateQuery = `
      //             UPDATE fsa_app_db
      //             SET username = $1, hashPassword = $2, age = $3, salary = $4, taxPercent = $5, employerCont = $6, medCost1 = $7, medCost2 = $8, medCost3 = $9
      //             WHERE id = $9
      //         `;

      //   const updateQuery = `
      //   UPDATE fsa_app_db
      //   SET username = $1, hashPassword = $2, age = $3, salary = $4, taxPercent = $5, employerCont = $6, medCost1 = $7, medCost2 = $8, medCost3 = $9
      //   WHERE id = $10
      // `;

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
