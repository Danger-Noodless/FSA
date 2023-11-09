const estimateController = {
  // takes no auth req inputs and produces estimate output
  estimate(req, res, next) {
    // do we want to produce an estimate if less than 3 years are provided?
    const { expense23, expense22, expense21 } = req.body;

    console.log(expense21, expense22, expense23);

    const parsedExpense23 = parseFloat(expense23);
    const parsedExpense22 = parseFloat(expense22);
    const parsedExpense21 = parseFloat(expense21);

    let length = 3;

    if (typeof parsedExpense21 !== 'number') {
      parsedExpense21 = 0;
      length--;
    }
    if (typeof parsedExpense22 !== 'number') {
      parsedExpense22 = 0;
      length--;
    }
    if (typeof parsedExpense23 !== 'number') {
      parsedExpense23 = 0;
      length--;
    }

    const sum = parsedExpense21 + parsedExpense22 + parsedExpense23;
    let userAvg = sum / length;
    userAvg = userAvg.toFixed(2);
    console.log('userAvg ', userAvg);

    // static amount
    const maxCont = 3050;
    let moneyLost = maxCont - userAvg;
    moneyLost = moneyLost.toFixed(2);
    console.log('moneyLost ', moneyLost);

    // need to update avgTax to dynamic data
    const avgTax = 0.25;
    let lostTaxSavings = userAvg * avgTax;
    lostTaxSavings = lostTaxSavings.toFixed(2);

    res.locals.moneyLost = moneyLost;
    res.locals.lostTaxSavings = lostTaxSavings;

    return next();
  },

  taxCalculator(req, res, next) {
    const { salary } = req.body;
    const taxableIncome = salary;

    const federalTaxBrackets = [
      { limit: 0, rate: 0 },
      { limit: 11000, rate: 0.1 },
      { limit: 44725, rate: 0.12 },
      { limit: 95375, rate: 0.22 },
      { limit: 182100, rate: 0.24 },
      { limit: 231250, rate: 0.32 },
      { limit: 578125, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ];

    const californiaTaxBrackets = [
      { limit: 0, rate: 0 },
      { limit: 23942, rate: 0.02 },
      { limit: 37788, rate: 0.04 },
      { limit: 52455, rate: 0.06 },
      { limit: 66285, rate: 0.08 },
      { limit: 338639, rate: 0.093 },
      { limit: 406364, rate: 0.103 },
      { limit: 677275, rate: 0.113 },
      { limit: Infinity, rate: 0.123 },
    ];

    const calculateTax = (income, brackets) => {
      let tax = 0;
      let lastLimit = 0;

      for (const { limit, rate } of brackets) {
        if (income > limit) {
          tax += (limit - lastLimit) * rate;
        } else {
          tax += (income - lastLimit) * rate;
          break;
        }
        lastLimit = limit;
      }

      return tax;
    };

    try {
      const federalTax = calculateTax(salary, federalTaxBrackets);
      const californiaTax = calculateTax(salary, californiaTaxBrackets);
      const totalTax = (federalTax + californiaTax).toFixed(2);
      const netIncome = (taxableIncome - totalTax).toFixed(2);

      //   res.locals.totalTax = totalTax;

      res.locals.financials = {
        taxableIncome,
        totalTax,
        netIncome,
      };

      return next();
    } catch (error) {
      next({
        log: `Express error handler caught middleware error in estimatecontroller.taxCalculator. Error: ${error}`,
        status: 500,
        message: { err: `Error calculating tax burder: ${error}` },
      });
    }
  },
};

module.exports = estimateController;
