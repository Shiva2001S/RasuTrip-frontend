import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    if(password.length < 6){
      window.alert("Password length must be greater than 5");
      return;
    }

    const data = await axios.post('http://localhost:80/register', {name, email, password});
    if(data.data.message == 'successfull'){
      navigate('/login');
    }
  }
  return (
    <div>
      <form onSubmit={handle}>
        <input type="text" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="text" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <input type="text" placeholder='Enter your name' onChange={(e) => setName(e.target.value)} value={name} />
        <button type='submit'>Register</button>
      </form>
      <Link to={'/login'}>Login</Link>
    </div>
  )
}

export default Register
