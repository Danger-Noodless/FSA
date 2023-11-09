import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const ResultBox = ({serverResponse}) => {

  let divText = '';

  if (isNaN(serverResponse[0]) || isNaN(serverResponse[1])) {
    divText = <div>Please enter numbers to calculate your estimate!</div>;
  } else if (serverResponse[0] && serverResponse[1]) {
    divText = (
      <div>
        <strong>Results:</strong>
        <br />
        <br data-testid='amount1'/>
        If you contributed the full amount, you likely lost{' '}
        <strong className='text-red-600'>${serverResponse[0]}</strong>.
        <br />
        <br data-testid='amount2'/>
        If you did not contribute, you likely lost{' '}
        <strong className='text-red-600'>${serverResponse[1]}</strong> in tax
        savings!
        <br />
      </div>
    );
  } else {
    divText = <div>Enter your expenses to see your estimate!</div>;
  }

  return (
    <div className='bg-white p-8 rounded shadow-md w-full sm:w-96'>
      <div className='max-w-3xl mx-auto text-center mt-3 mb-5 text-xl font-semibold'>
        {divText}
      </div>
    </div>
  );
};

export default ResultBox;
