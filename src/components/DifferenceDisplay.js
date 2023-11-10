import React from 'react';
import { useLocation } from 'react-router-dom';

const DifferenceDisplay = () => {
  const { state } = useLocation();

  const { avgMedicalExpenses, yearlyCont, monthlyCont, salaryAfterCont } = state[0].calculations;
  const { taxableIncome, totalTax, netIncome } = state[1].financials;


// (yearlyCont * 0.30)


// [ {}, {} ]
// array[0].calculations = { avgMedicalExpenses, yearlyCont, monthlyCont, salaryAfterCont }
// array[1].financials = {
//           "taxableIncome": 123456,
//           "totalTax": "31365.44",
//           "netIncome": "92090.56"
//       }


  // res.locals.financials = {
  //   taxableIncome, // pre
  //   totalTax, // tax owed
  //   netIncome, // after
  // };


//   {
//     "financials": {
//         "taxableIncome": 123456,
//         "totalTax": "31365.44",
//         "netIncome": "92090.56"
//     }
// }
// state = {
//   message: res.locals.message,
//   calculations: res.locals.calculations,
//   updatedUser: res.locals.updatedUser,
// }





  return (
   <div className='w-full'>
    <table className='bg-white table-auto rounded shadow-md border-collapse'>
      <thead className='bg-blue-400'>
        <tr>
          <th></th>
          <th className='text-white p-3'>Without FSA</th>
          <th className='text-white p-3'>With FSA</th>
        </tr>
      </thead>

      <tbody>
        <tr className='divide-y'>
          <td className='text-slate-700 p-3'>Annual Income</td>
          <td className='text-slate-700 p-3'>${taxableIncome}</td>
          <td className='bg-orange-100 text-slate-700 p-3'>${taxableIncome}</td>
        </tr>

        <tr className='divide-y'>
          <td className='text-slate-700 p-3'>FSA Contribution</td>
          <td className='text-slate-700 p-3'>$0</td>
          <td className='bg-orange-100 text-slate-700 p-3'>${yearlyCont}</td>
        </tr>

        <tr className='divide-y'>
          <td className='text-slate-700 p-3'>Taxable Income</td>
          <td className='text-slate-700 p-3'>${taxableIncome}</td>
          <td className='bg-orange-100 text-slate-700 p-3'>${salaryAfterCont}</td>
        </tr>

        <tr className='divide-y'>
          <td className='text-slate-700 p-3'>Estimated Tax Withholdings</td>
          <td className='text-slate-700 p-3'>${totalTax}</td>
          <td className='bg-orange-100 text-slate-700 p-3'>${totalTax - yearlyCont}</td>
        </tr>

        <tr className='divide-y'>
          <td className='text-slate-700 p-3'>Estimated Health Expenses</td>
          <td className='text-slate-700 p-3'>${avgMedicalExpenses}</td>
          {/* come back later */}
          <td className='bg-orange-100 text-slate-700 p-3'>${avgMedicalExpenses - yearlyCont}</td>
        </tr>

        <tr className='divide-y'>
          <td className='text-slate-700 p-3'>Net Pay</td>
          <td className='text-slate-700 p-3'>${netIncome - yearlyCont}</td>
          <td className='bg-orange-100 text-slate-700 p-3'>${netIncome - yearlyCont + ' + 💰💰💰'}</td>
        </tr>

        <tr className='divide-y'>
          <td className='text-slate-700 p-3'>Estimated Tax Savings</td>
          <td className='text-slate-700 p-3'>$0</td>
          <td className='bg-orange-100 text-slate-700 p-3'>💰💰💰</td>
        </tr>        
      </tbody>

    </table>
   </div>
  );
};

{/* <div className='bg-white text-sm grid grid-rows-8 grid-cols-3'>
<div className=''>
  <dt className='display-term'></dt>
  <dd className='display-row-def-without'>Without FSA</dd>
  <dd className='display-row-def-with'>With FSA</dd>
</div>
<hr />
<div>
  <dt className='display-term'>Annual Income</dt>
  <dd className='display-row-def-without'>$1000</dd>
  <dd className='display-row-def-with'>$1500</dd>
</div>
<hr />
<div>
  <dt className='display-term'>FSA Contribution</dt>
  <dd className='display-row-def-without'>$1000</dd>
  <dd className='display-row-def-with'>$1500</dd>
</div>
<hr />
<div>
  <dt className='display-term'>Taxable Income</dt>
  <dd className='display-row-def-without'>$1000</dd>
  <dd className='display-row-def-with'>$1500</dd>
</div>
<hr />
<div>
  <dt className='display-term'>Estimated Tax Withholdings</dt>
  <dd className='display-row-def-without'>$1000</dd>
  <dd className='display-row-def-with'>$1500</dd>
</div>
<hr />
<div>
  <dt className='display-term'>Estimated Health Expense</dt>
  <dd className='display-row-def-without'>$1000</dd>
  <dd className='display-row-def-with'>$1500</dd>
</div>
<hr />
<div>
  <dt className='display-term'>Net Pay</dt>
  <dd className='display-row-def-without'>$1000</dd>
  <dd className='display-row-def-with'>$1500</dd>
</div>
<hr />
<div>
  <dt className='display-term'>Estimated Tax Savings</dt>
  <dd className='display-row-def-without'>$1000</dd>
  <dd className='display-row-def-with'>$1500</dd>
</div>
</div> */}

export default DifferenceDisplay;
