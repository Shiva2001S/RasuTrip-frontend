import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import styles from '../styles/Register.module.css';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      navigate('/')
      // navigate('https://rasutrip-backend.onrender.com/home')
    }
  }, [])

  const notify = (warning) => {
    toast.warn(warning, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }


  const handle = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      notify('Password length must be greater than 5');
      return;
    }

    // const data = await axios.post('http://localhost:80/register', { name, email, password });
    const data = await axios.post('https://rasutrip-backend.onrender.com/register', { name, email, password });
    if (data.data.message == 'successfull') {
      navigate('/login');
      // navigate('https://rasutrip-backend.onrender.com/login');
    } else {
      notify(data.data.message);
    }
  }
  return (
    <div className={styles.par}>
      <form onSubmit={handle} className={styles.frm}>
        <input type="text" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="text" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <input type="text" placeholder='Enter your name' onChange={(e) => setName(e.target.value)} value={name} />
        <button type='submit'>Register</button>
      </form>
      <Link className={styles.loginlink} to={'/login'}>Login</Link>
    </div>
  )
}

export default Register
