
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
        const avgTax = .25; 
        let lostTaxSavings = userAvg * avgTax;
        lostTaxSavings = lostTaxSavings.toFixed(2);

        res.locals.moneyLost = moneyLost;
        res.locals.lostTaxSavings = lostTaxSavings;
    
        return next()
    }
}

module.exports = estimateController;