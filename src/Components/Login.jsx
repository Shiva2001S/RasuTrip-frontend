import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import styles from '../styles/Login.module.css'
import { toast } from "react-toastify";
const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.token) {
      navigate('/home')
    }
  }, [])
  
  const handle = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post('http://localhost:80/login', { email, password });
      setCookie('token', data.data.token, { path: '/', maxAge: 60 * 60 * 12 });

      if (data.data.message == 'successfull') {
        navigate('/home');
      }
    } catch (error) {
      console.log(error)
      notify()
    }

  }

  const notify = () => {
    toast.error('Please enter correct email and password', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <div className={styles.par} >
      <form className={styles.frm} onSubmit={handle}>
        <input className={styles.inp1} type="text" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
        <input className={styles.inp2} type="text" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <button className={styles.loginbtn} type='submit'>Login</button>
      </form>
      <Link className={styles.reglink} to={'/register'}>Register</Link>
    </div>
  )
}

export default Login
