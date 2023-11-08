import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ResultBox from './ResultBox';

const FormComplex = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    salary: '',
    taxBracket: '',
    pastExpenses: '',
    employeeContrib: '',
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const data = {
      name: '',
      age: '',
      salary: '',
      taxBracket: '',
      pastExpenses: '',
      employerContrib: '',
    };

    // fetch('api/users')
    fetch('http://localhost:3000/api', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((expenses) => {
        console.log(expenses);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className='mb-20'>
      <div className='mt-16'>
            <h2 className='max-w-3xl mx-auto text-center mt-3 mb-5 text-xl font-semibold'>
              How Much Should You Contribute to Your Flexible Spending Account (FSA)?
            </h2>
            <p className=' max-w-3xl mx-auto text-center text-lg mb-3'>
              Fill out the information below so that you can find out!
            </p>
      </div>
      <div className='flex justify-center mt-5'>
        <form className="bg-white p-8 rounded shadow-md sm:w-5/12 ">
          <label className="text-lg font-semibold text-gray-700">
            What is your name?
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="name"
            placeholder='John Doe'
            onChange={handleChange}
          />
          <label className="text-lg font-semibold text-gray-700">
            What is your age?
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="age"
            placeholder='33'
            onChange={handleChange}
          />
          <label className="text-lg font-semibold text-gray-700">
            What is your annual income?
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="salary"
            placeholder='$100,000'
            onChange={handleChange}
          />
          <label className="text-lg font-semibold text-gray-700">
            What is your tax bracket?
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="taxBracket"
            placeholder='$95,375 to $182,100'
            onChange={handleChange}
          />
          <label className="text-lg font-semibold text-gray-700">
           What were your average annual medical expenses in the past 3 years?
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="pastExpenses"
            placeholder='$1000'
            onChange={handleChange}
          />
          <label className="text-lg font-semibold text-gray-700">
            How much does your employer contribute to your FSA?
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="employerContrib"
            placeholder='$500'
            onChange={handleChange}
          />
          <button
            type="submit"
            className="mt-3 flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        {/* <ResultBoxComplex /> */}
      </div>
    </div>
  );
};

export default FormComplex;
