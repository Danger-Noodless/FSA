import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ResultBoxComplex = () => {
  // fetch('api/')
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  //   .catch(e => console.log(e));

  const { state } = useLocation();
  console.log('😂 🤣 🥲 🥹 😊 😇 🙂 🙃 😉 😌 😍', state);
  // pass in backend response here
  const { avgMedicalExpenses, yearlyCont, monthlyCont, salaryAfterCont } =
    state.calculations;

  return (
    <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
      <div className="max-w-3xl mx-auto text-center mt-3 mb-5 text-xl font-semibold">
        <strong>Results:</strong>
        <br />
        <br />
        If you contributed the full amount, you likely lost{' '}
        <strong className="text-red-600">
          ${yearlyCont - avgMedicalExpenses}
        </strong>
        .
        <br />
        <br />
        If you did not contribute, you likely lost{' '}
        <strong className="text-red-600">${salaryAfterCont}</strong> in tax
        savings!
        <br />
        <br />
        Your annual FSA contributions will be:
        <br />
        <br />
        Your estimated annual tax savings will be:
        <br />
        <br />
        Your monthly withholdings will be:
        <br />
        <br />
        The difference in your after-tax monthly pay will be:
        <br />
        <br />
      </div>
    </div>
  );
};

export default ResultBoxComplex;
