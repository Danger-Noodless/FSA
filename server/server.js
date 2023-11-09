const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const PORT = 3000;
const estimateController = require('./controllers/estimatecontroller.js');
const dbcontroller = require('./controllers/databasecontroller.js');
const authcontroller = require('./controllers/authcontroller.js');
const databasecontroller = require('./controllers/databasecontroller.js');
const cors = require('cors');

const htmlDirectory = path.join(__dirname, 'public', 'index.html');
// Do we need a CSS directory?
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const apiRouter = express.Router();
app.use('/api', apiRouter);

// serve HTML directory at get // does this need router ??
apiRouter.get('/', (req, res) => {
  return res.status(200).sendFile(htmlDirectory);
});

// no auth get request for managing basic estimate on landing page
apiRouter.post('/estimate', estimateController.estimate, (req, res) => {
  return res.status(200).json({
    moneyLost: res.locals.moneyLost,
    lostTaxSavings: res.locals.lostTaxSavings,
  });
});
// tested? [x]

// log-in
apiRouter.post(
  '/login',
  authcontroller.login,
  databasecontroller.getuser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

// tested? x

// sign-up
apiRouter.post(
  '/signup',
  authcontroller.signup,
  databasecontroller.makeuser,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  }
);

// tested? x

// route for patching user info
apiRouter.patch(
  '/updateuser',
  authcontroller.isLoggedIn,
  databasecontroller.updateUser,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

// ** John testing for authcontroller.isLoggedIn
app.get('/isLoggedIn', authcontroller.isLoggedIn, (req, res) =>
  res.sendStatus(200)
);

// auto-trigger this when userInfo is updated // updates widget
apiRouter.get('/updatedQuote', (req, res) => {});

// need to look at locals id persistence once auth is in place

apiRouter.delete(
  '/deleteuser',
  authcontroller.isLoggedIn,
  databasecontroller.deleteuser,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  }
);

// tested x

// 😂 🤣 🥲 🥹 😊 😇 🙂 🙃 😉 😌 😍
// update user complex form info
apiRouter.post(
  '/complexUserInfo',
  databasecontroller.updateUser,
  (req, res) => {
    return res.status(200).json({
      message: res.locals.message,
      calculations: res.locals.calculations,
      updatedUser: res.locals.updatedUser,
    });
  }
);

apiRouter.post(
  '/calculateTaxes',
  estimateController.taxCalculator,
  (req, res) => {
    return res.status(200).json({ financials: res.locals.financials });
  }
);

// global error handler // does the router
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// tested x

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
