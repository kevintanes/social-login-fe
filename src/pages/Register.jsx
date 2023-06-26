import React from 'react';
import bg from "../aset/bg-01.jpg";
import CardRegister from '../components/CardRegister';

function Register() {
    return (
        <div className='relative'>
            <img className='w-screen h-screen absolute' src={bg} alt="background" />
            <CardRegister />
        </div>
    )
}

export default Register