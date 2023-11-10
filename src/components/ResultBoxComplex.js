import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DifferenceDisplay from './DifferenceDisplay';

const ResultBoxComplex = () => {
  // fetch('api/')
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  //   .catch(e => console.log(e));

  const { state } = useLocation();
  console.log('😂 🤣 🥲 🥹 😊 😇 🙂 🙃 😉 😌 😍', state);
  // pass in backend response here
  const { avgMedicalExpenses, yearlyCont, monthlyCont, salaryAfterCont } =
    state[0].calculations;

  const { taxableIncome, totalTax, netIncome } = state[1].financials;


  const taxSavings = yearlyCont * 0.30;

  return (
    <div className='flex space-x-6 place-items-center'>
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
          <div className="max-w-3xl mx-auto text-center mt-3 mb-5 text-xl font-semibold">
              <strong>Results:</strong>
              <br />
              <br />
              Your annual FSA contribution will be: {' '}
              <strong className="text-red-600">${yearlyCont}
              </strong>
              <br />
              <br />
              Your estimated annual tax savings will be: {' '}
              <strong className="text-red-600">${taxSavings}</strong>
              <br />
              <br />
              Your monthly withholdings will be:{' '}
              <strong className="text-red-600">${monthlyCont.toFixed(2)}</strong> 
              <br />
              <br />
              The difference in your after-tax monthly pay will be:{' '}
              <strong className="text-red-600">${((netIncome/12) - ((netIncome/12) - monthlyCont)).toFixed(2)}</strong> 
              <br />
              <br />
          </div>
        </div>
        <DifferenceDisplay />
    </div>

  );
};

export default ResultBoxComplex;
