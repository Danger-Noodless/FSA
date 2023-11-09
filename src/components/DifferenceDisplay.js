import React from 'react';

const DifferenceDisplay = () => {

  return (
    <div>
      <div>
        <dt className='display-term'></dt>
        <dd className='display-row-def-without'>Without FSA</dd>
        <dd className='display-row-def-with'>With FSA</dd>
      </div>
      <div>
        <dt className='display-term'>Annual Income</dt>
        <dd className='display-row-def-without'></dd>
        <dd className='display-row-def-with'></dd>
      </div>
      <div>
        <dt className='display-term'>FSA Contribution</dt>
        <dd className='display-row-def-without'></dd>
        <dd className='display-row-def-with'></dd>
      </div>
      <div>
        <dt className='display-term'>Taxable Income</dt>
        <dd className='display-row-def-without'></dd>
        <dd className='display-row-def-with'></dd>
      </div>
      <div>
        <dt className='display-term'>Estimated Tax Withholdings</dt>
        <dd className='display-row-def-without'></dd>
        <dd className='display-row-def-with'></dd>
      </div>
      <div>
        <dt className='display-term'>Estimated Health Expense</dt>
        <dd className='display-row-def-without'></dd>
        <dd className='display-row-def-with'></dd>
      </div>
      <div>
        <dt className='display-term'>Net Pay</dt>
        <dd className='display-row-def-without'></dd>
        <dd className='display-row-def-with'></dd>
      </div>
      <div>
        <dt className='display-term'>Estimated Tax Savings</dt>
        <dd className='display-row-def-without'></dd>
        <dd className='display-row-def-with'></dd>
      </div>
    </div>
  );
};

export default DifferenceDisplay;
