import { Inter } from 'next/font/google';
import React, { useState, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import { SlCalender } from "react-icons/sl";
import { BiPhone, BiUserCircle } from "react-icons/bi";
import { VscOrganization } from "react-icons/vsc";
import { MdOutlineMail } from "react-icons/md";

import moment from "moment";

const inter = Inter({ subsets: ['greek'] })

export default function Home() {
  const [startDate, setStartDate] = useState(new Date());
    // Setting success or failure messages states
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
  //const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      fullname: event.target.name.value,
      dob: event.target.dob.value,
      affiliation: event.target.affiliation.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/v1/form'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();

    if(result.status== true)
    {
      alert('Successfully Submitted...')

    const res = await fetch("/api/v1/sendgrid", {
      body: JSON.stringify({
        email: 'kussoftware05@gmail.com',
        fullname: 'hello',
        affiliation: 'demo',
        phone: '5678934567',
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      console.log(JSON.stringify(error));
      setShowSuccessMessage(false);
      setShowFailureMessage(true);
      return;
    }
  //console.log(fullname, email, phone, affiliation);

    }
    else
    {
      alert('Opps! Something wrong...')
    }
  }
  return (
    <main className="items-center p-24 mainPage" style={inter.style}>

      <div className="headBox">
        <p className='headText'>Hand on training on Wet tissue anastomosis</p>
      </div>

      <div className="mb-32 grid text-center items-center col-12 formSection">
        {/* Basic HTML Form  */}
        <form onSubmit={handleSubmit}>
          <div className='my-4 formInput'>
            <label for="name" className='formInputLabel'>Enter Name <span className='mark'>*</span>:</label>
            <div className='iconwithInput'>
              <input type="text" name="name" id="name" className='py-2 textBoxSize' required />
              <span className='iconShow'><BiUserCircle /></span>
            </div>
          </div>
          <div className='my-4 formInput'>
            <label for="name" className='formInputLabel'>Enter DOB <span className='mark'>*</span>:</label>
            <div className='iconwithInput'>
              <input type="text" name="dob" id="dob" value= {moment(startDate.toDateString()).format('DD/MM/yyyy')}  className='py-2 textBoxSize' required />          
              <span className='iconShow'>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<span><SlCalender /></span>}
                todayButton="TODAY"
                placeholderText="Click to select a date"
                format={'DD/MM/yyyy'} 
                required
              />
              </span>
            </div>
          </div>
          {/* <div>
            <input type="text" name="dob" id="dob" value={date.toDateString()} style={{ marginLeft: '165px', padding: 10 }} />
          </div> */}
          <div className='my-4 formInput'>
            <label for="name" className='formInputLabel'>Enter Affiliation <span className='mark'>*</span>:</label> 
            <div className='iconwithInput'>         
              <input type="text" name="affiliation" id="affiliation" className='py-2 textBoxSize' required />
              <span className='iconShow'><VscOrganization /></span>
            </div>
          </div>
          <div className='my-4 formInput'>
            <label for="name" className='formInputLabel'>Enter Phone <span className='mark'>*</span>:</label>
            <div className='iconwithInput'>
              <input
                type="text"
                id="phone"
                name="phone"
                pattern="[1-9]{1}[0-9]{9}"
                maxlength="10"
                required
                className='py-2 textBoxSize'
              />
             <span className='iconShow'><BiPhone /></span>
             </div>
          </div>
          <div className='my-4 formInput'>
            <label className='formInputLabel' for="name">Enter Email <span className='mark'>*</span>:</label>
            <div className='iconwithInput'>
              <input type="email" name="email" id="email" className='py-2 textBoxSize' required />
              <span className='iconShow'><MdOutlineMail /></span>
            </div>
          </div>
          <button type="submit" className='subBtn'>Submit</button>
        </form>

      </div>
    </main>
  )
}

