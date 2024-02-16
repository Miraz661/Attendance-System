import '../../../CSS/Registration.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Registration() {


  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({ email: '', password: '', confPass: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const [statusColor, setStatusColor] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [user, setUser] = useState('users');
  const [verified, setVerified] = useState(0);
  const [massege,setMassege] = useState('');


  const handleEmailChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleConfPasswordChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const setCheck = () => {
    setIsCheck(true);
  }

  const validatePassword = (password) => {
    //At least 8 characters, one letter, one number.
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    return passwordRegex.test(password);
  }


  const handleAddData = async (e) => {
    e.preventDefault();
    let userForomat = newData.email;
    userForomat = userForomat.split("@");
    userForomat = userForomat[1];
    if (newData.password === newData.confPass) {
      if (userForomat === 'uttarauniversity.edu.bd') {
        if (newData.password.length >= 8) {
          if (validatePassword(newData.password)) {
            try {
              const response = await axios.post('http://localhost:3000/verify/user', { email: newData.email });

              setVerified(response.data.code);
              setMassege('Please check your mail for the code...');

              console.log(response.data.code);
            } catch (error) {
              console.error(error);
            }
          } else {
            setStatusColor('text-orange-500 text-sm');
            setStatus('Include at least one uppercase letter and one number.')
          }
        } else {
          setStatusColor('text-orange-500 text-sm');
          setStatus('Password must be at least 8 characters long.')
        }
      } else {
        setStatusColor('text-orange-500 text-sm');
        setStatus('Invalid Email Address!');
      }
    } else {
      setStatusColor('text-orange-500 text-sm');
      setStatus('Passwords don\'t match.');
    }
  };

  const handleValidation = async (e) => {
    e.preventDefault();
    if (verified == e.target.code.value) {
      try {
        const response = await axios.post(`http://localhost:3000/addData/${user}`, newData);

        // Optionally, update the state with the newly inserted data
        setData([...data, { id: response.data.id, email: newData.email, password: newData.password }]);
        setStatus('Signup successful!');
        setStatusColor('text-green-600 text-xl');
        setUser('users');
        setVerified(0);
        setMassege('Signup Successful...Now you can login!');

        let userId = newData.email;
        userId = userId.split("@");
        userId = userId[0]+"batches";

        try {
          const response = await axios.post('http://localhost:3000/createUser/table',{userId});
          // console.log(response.data);
        } catch (error) {
          console.error(error);
        }

        // Clear the form
        setNewData({ email: "", password: "", confPass: "" });
      } catch (error) {
        console.error('Error adding data:', error);
      }
    } else {
      // console.log("Invalid code..."+e.target.code.value);
    }
  }

  const handlSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    try {
      const response = await axios.post('http://localhost:3000/auth', {
        email,
        password,
      });

      // Handle successful authentication (e.g., store tokens, redirect)
      // console.log('Authentication successful', response.data);
      navigate(`/home?user=${response.data.email}`);
    } catch (error) {
      // Handle authentication failure (e.g., show error message)
      console.error('Authentication failed', error.message);
    }
  }

  return (
    <div className="mainBody relative">
      <p className={`absolute top-12 bg-[#2b2b6d] rounded text-[wheat] ${massege==''?'':'p-2'}`}>{massege}</p>
      {
        verified ?
          <div className="verify rounded py-10 px-6">
            <h2 className='text-center font-semibold text-2xl text-[wheat] pb-4'>Verify</h2>
            <form onSubmit={handleValidation} className='px-3'>
              <label htmlFor="code" className='block text-white'>OTP Code:</label>
              <input className='mb-6 px-3 py-2 text-black' name='code' id="code" type='text' placeholder='Enter code ...' required />
              <button className='block border-2 border-white px-4 py-2 rounded text-white' type='submit'>Submit</button>
            </form>
          </div>
          :
          <div className="section">
            <h2 className="title">
            </h2>
            <input type="checkbox" onChange={() => { isCheck }} id="check" className="checkbox" />
            <div className="main">
              <div className="front">
                <h2>Login</h2>
                <form onSubmit={handlSubmit}>
                  <span>
                    <input type="email" name="email" id="email" className="swing" placeholder="Enter Email" required />
                    <label htmlFor="email">Email</label>
                  </span>
                  <span>
                    <input type="password" name="password" id="pass" className="swing" placeholder="Enter Password" required />
                    <label htmlFor="pass">Password</label>
                  </span>
                  <span>
                    <a href="#" className="reset">Forget Password</a>
                  </span>
                  <span>
                    <button type="submit" className='submitBtn'>Login</button>
                    <label htmlFor="check" onClick={setCheck} className='text-md underline text-white cursor-pointer'>Create account</label>
                  </span>
                </form>
              </div>
              <div className="back">
                <p className={`${statusColor} font-semibold text-center`}>{status}</p>
                <h2>Sign up</h2>
                <form onSubmit={handleAddData}>
                  <span>
                    <input type="email" name="email" id="reg1" className="swing" placeholder="Enter Your Email" value={newData.email} onChange={handleEmailChange} required />
                    <label htmlFor="reg1">Name</label>
                  </span>
                  <span>
                    <input type="password" name="password" id="reg2" className="swing" placeholder='Enter Password' value={newData.password} onChange={handlePasswordChange} required />
                    <label htmlFor="reg2">Password</label>
                  </span>
                  <span>
                    <input type="password" name="confPass" id="reg3" className="swing" placeholder='Confirm Password' value={newData.confPass} onChange={handleConfPasswordChange} required />
                    <label htmlFor="password">Confirm</label>
                  </span>
                  <span className='flex justify-between'>
                    <button type="submit" className='submitBtn'>Sign up</button>
                  </span>
                </form>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default Registration;