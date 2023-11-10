import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import ResultBox from './ResultBox';
import axios from 'axios';

const FormComplex = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    salary: '',
    taxBracket: '',
    pastExpenses: '',
    employerContrib: '',
  });

  const [fetched, setFetched] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    console.log('before', form);

    setForm({
      //asynchronous
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log('after', form);
  }, [form]);

  // testing/debugging

  console.log('PRESTATE');
  const {state} = useLocation();
  const {username, hashpassword} = state;
  console.log('credentials in formcomplex.js', username, hashpassword);

  useEffect(() => {
    const formData = {
      username,
      age: Number(form.age),
      salary: Number(form.salary),
      taxPercent: Number(form.taxBracket),
      employerCont: Number(form.employerContrib),
      medCost1: Number(form.pastExpenses),
      medCost2: Number(form.pastExpenses),
      medCost3: Number(form.pastExpenses),
    };

    const fetchData = async () => {
      try {
        const response = await axios.post('api/complexUserInfo', formData);
        console.log('🤣 🥲formdata', formData)
        console.log('🤣 🥲formdata', formData.salary)
        const responseTax = await axios.post('api/calculateTaxes', {salary: formData.salary});
        
        
        console.log(responseTax.data)

        const responseProp = [response.data, responseTax.data]
        console.log('responseProp😂 🤣 🥲 🥹 😊 😇 🙂 🙃 😉 😌 😍', responseProp)
        navigate('/ResultBoxComplex', {state: responseProp});
      } catch (err) {
        alert(err);
      }
    };

    if (fetched) {
      fetchData();
    }
  }, [fetched]);


  // const handleSubmit = () => {
  //   // console.log(form);
  //   // const data = {
  //   //   name: '',
  //   //   age: '',
  //   //   salary: '',
  //   //   taxBracket: '',
  //   //   pastExpenses: '',
  //   //   employerContrib: '',
  //   // };

  //   // fetch('api/users')
  //   fetch('api/complexUserInfo', {
  //     method: 'POST',
  //     body: JSON.stringify(dummyData),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       console.log('😂 🤣 🥲 🥹 😊 😇 🙂 🙃 😉 😌 😍')
  //       // const navigate = useNavigate();
  //       // navigate('/');
  //       res.json();
  //       console.log("RES", res);
  //     })
  //     .then((json) => console.log("JSON", json))
  //     .then((expenses) => {
  //       console.log("EXPENSES", expenses);
  //     })
  //     .catch((err) => {
  //       console.log('testing error');
  //       alert(err)
  //       console.log(err);
  //     });
  // };

  return (
    // conditional
    <div className='mb-20'>
      <div className='mt-16'>
        <h2 className='max-w-3xl mx-auto text-center mt-3 mb-5 text-xl font-semibold'>
          How Much Should You Contribute to Your Flexible Spending Account
          (FSA)?
        </h2>
        <p className=' max-w-3xl mx-auto text-center text-lg mb-3'>
          Fill out the information below so that you can find out!
        </p>
      </div>
      <div className='flex justify-center mt-5'>
        <form className='bg-white p-8 rounded shadow-md sm:w-5/12 '>
          <label className='text-lg font-semibold text-gray-700'>
            What is your name?
          </label>
          <input
            type='text'
            className='w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500'
            name='name'
            placeholder='John Doe'
            onChange={handleChange}
          />
          <label className='text-lg font-semibold text-gray-700'>
            What is your age?
          </label>
          <input
            type='text'
            className='w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500'
            name='age'
            placeholder='33'
            onChange={handleChange}
          />
          <label className='text-lg font-semibold text-gray-700'>
            What is your annual income?
          </label>
          <input
            type='text'
            className='w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500'
            name='salary'
            placeholder='$100,000'
            onChange={handleChange}
          />
          <label className='text-lg font-semibold text-gray-700'>
            What is your tax bracket?
          </label>
          <input
            type='text'
            className='w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500'
            name='taxBracket'
            placeholder='$95,375 to $182,100'
            onChange={handleChange}
          />
          <label className='text-lg font-semibold text-gray-700'>
            What were your average annual medical expenses in the past 3 years?
          </label>
          <input
            type='text'
            className='w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500'
            name='pastExpenses'
            placeholder='$1000'
            onChange={handleChange}
          />
          <label className='text-lg font-semibold text-gray-700'>
            How much does your employer contribute to your FSA?
          </label>
          <input
            type='text'
            className='w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500'
            name='employerContrib'
            placeholder='$500'
            onChange={handleChange}
          />
          <button
            type='submit'
            className='mt-3 flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            onClick={(e) => {
              e.preventDefault();
              setFetched(true);
            }}
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
