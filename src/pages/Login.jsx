import React from 'react';
import bg from "../aset/bg-01.jpg";
import CardLogin from '../components/CardLogin';

function Login() {
    return (
        <div className='relative'>
            <img className='w-screen h-screen absolute' src={bg} alt="background"/>
            <CardLogin />
        </div>
    )
}

export default Login