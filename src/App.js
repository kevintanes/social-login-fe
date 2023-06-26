import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import axios from 'axios';
import { API_URL } from "./helper/index"
import React from 'react';
import { authLoginAction } from './reducers/auth';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  const keepLogin = async () => {
    try {
      let email = localStorage.getItem("userLogin");

      let res = await axios.post(`${API_URL}/user/keep-login`, {
        email
      });

      console.log(`keepLogin`, res.data);

      dispatch(authLoginAction(res.data[0]))

    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    keepLogin();
  }, []);


  return (
    <div className='bg-gray-100'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landingpage" element={<LandingPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
