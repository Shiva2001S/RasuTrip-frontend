import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import styles from '../styles/Home.module.css'
import { toast } from "react-toastify";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(!cookies.token){
      navigate('/login');
      return;
    }

    // axios.get('http://localhost:80/view', {
    //   headers: {
    //     authorization: `Bearer ${cookies.token}`
    //   }
    axios.get('https://rasutrip-backend.onrender.com/view', {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    }).then((backendData) => {
      if (backendData.data.message == 'successfull') {
        setData(backendData.data.data[0]);
        notify(backendData.data.data[0].name)
      }
    }).catch(error => {
      console.log(error);
    })

  }, [])

  const notify = (name) => {
    toast.success(`Welcome ${name}`, {
      position: "top-right",
      autoClose: 3000, // 3 sec
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }

  const handleLogout = () => {
    removeCookie('token');
    navigate('/login');
  }

  const handleUpdate = async () => {
    let name = data.name;
    let email = data.email;
    let newPassword = password;

    // const data2 = await axios.put('http://localhost:80/update', { name, email, newPassword }, { headers: { authorization: `Bearer ${cookies.token}` } })
    const data2 = await axios.put('https://rasutrip-backend.onrender.com/update', { name, email, newPassword }, { headers: { authorization: `Bearer ${cookies.token}` } })
    console.log(data2);
    if (data2.data.message == 'successful') {
      setPassword('');
      // const data = await axios.post('http://localhost:80/login', { email, password });
      const data = await axios.post('https://rasutrip-backend.onrender.com/login', { email, password });
      setCookie('token', data.data.token, { path: '/', maxAge: 60 * 60 * 12 });
    }


  }
  return (
    <div className={styles.par}>
      <div className={styles.ch1}>
        <div className={styles.ch11}>Name : {data ? data.name : ""}</div>
        <div className={styles.ch12}>Email : {data ? data.email : ''}</div>
      </div>
      {cookies.token ? <button className={styles.logout} onClick={handleLogout}>Logout</button> : ""}
      <div>
        {password.length > 0 ? <button className={styles.upbtn} onClick={handleUpdate}>Update Password</button> : ""}
      </div>
      <div>
        <input className={styles.inp} type='text' placeholder='Enter the updated password' onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>
    </div>
  )
}

export default Home
