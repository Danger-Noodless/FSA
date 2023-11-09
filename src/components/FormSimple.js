import React, {useEffect, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';

const FormSimple = ({setServerResponse}) => {
  const [form, setForm] = useState({
    expense23: '',
    expense22: '',
    expense21: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      expense23: form.expense23,
      expense22: form.expense22,
      expense21: form.expense21,
    };
    console.log('DATA', data);
    fetch('api/estimate', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((expenses) => {
        console.log(expenses);
        setServerResponse([expenses.moneyLost, expenses.lostTaxSavings]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form className='bg-white p-8 rounded shadow-md w-full sm:w-96'>
        <label className='text-lg font-semibold text-gray-700'>
          What were your average medical expenses in 2023?
        </label>
        <input
          type='text'
          className='w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500'
          name='expense23'
          placeholder='$'
          onChange={handleChange}
        />
        <label className='text-lg font-semibold text-gray-700'>
          What were your average medical expenses in 2022?
        </label>
        <input
          type='text'
          className='w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500'
          name='expense22'
          placeholder='$'
          onChange={handleChange}
        />
        <label className='text-lg font-semibold text-gray-700'>
          What were your average medical expenses in 2021?
        </label>
        <input
          type='text'
          className='w-full border rounded p-2 mt-2 mb-3 focus:outline-none focus:border-blue-500'
          name='expense21'
          placeholder='$'
          onChange={handleChange}
        />
        <button
          type='submit'
          className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormSimple;
