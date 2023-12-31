import '../../CSS/Registration.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Registration() {


  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({ email: '', password: '', confPass: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const [statusColor, setStatusColor] = useState('');
  const [isCheck,setIsCheck] = useState(false);

  const handleEmailChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleConfPasswordChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const setCheck = ()=>{
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
              const response = await fetch('http://localhost:3000/addData', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
              });

              const result = await response.json();

              // Optionally, update the state with the newly inserted data
              setData([...data, { id: result.id, email: newData.email, password: newData.password }]);
              setStatus('Signup successful!');
              setStatusColor('text-green-600 text-xl');
              window.location.reload();

              // Clear the form
              setNewData({ email: "", password: "", confPass: "" });
            } catch (error) {
              console.error('Error adding data:', error);
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
      console.log('Authentication successful', response.data);
      navigate('/home');
    } catch (error) {
      // Handle authentication failure (e.g., show error message)
      console.error('Authentication failed', error.message);
    }
  }

  return (
    <div className="mainBody">
      <div className="section">
        <h2 className="title">
        </h2>
        <input type="checkbox" onChange={()=>{isCheck}} id="check" className="checkbox" />
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
              <span>
                <button type="submit" className='submitBtn'>Sign up</button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration;