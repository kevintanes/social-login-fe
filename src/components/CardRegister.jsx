import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { API_URL } from '../helper';
import { ToastContainer, toast } from 'react-toastify';

function CardRegister() {

    const navigate = useNavigate();

    const [visible, setVisible] = React.useState("password");
    const [visibleConfrim, setVisibleConfrim] = React.useState("password");

    const handleVisible = () => {
        if (visible == 'password') {
            setVisible("text");
        } else {
            setVisible("password")
        }
    }

    const handleVisibleConfrim = () => {
        if (visibleConfrim == 'password') {
            setVisibleConfrim("text");
        } else {
            setVisibleConfrim("password")
        }
    }

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmationPassword, setconfirmationPassword] = React.useState("");

    const btnSignUp = async () => {
        try {
            if (email == "" && password == "" && confirmationPassword == "") {
                toast.warning(`your input is empty`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000
                });
            } else {
                let res = await axios.post(`${API_URL}/user/register`, {
                    email,
                    password,
                    confirmationPassword
                })

                if (res) {
                    toast.success(`${res.data.message}`, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 1000
                    });
                    setTimeout(() => {
                        navigate("/")
                    }, (2000));
                }
            }

        } catch (error) {
            console.log(error);
            toast.error(`${error.response.data.message}`, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000
            });
        }
    };



    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto relative top-40">
            <form>
                <h1 className='text-5xl font-bold text-center py-10'>
                    Sign Up
                </h1>
                <label className='text-md font-light'>
                    Email
                </label>
                <input
                    type="email"
                    className="mt-2 mb-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Type your email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className='text-md font-light'>
                    Password
                </label>
                <div className='flex mt-2'>
                    <input
                        type={visible}
                        className="mb-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleVisible} type="button" className='text-2xl ml-3'>
                        {
                            visible == "password" ? <AiFillEye /> : <AiFillEyeInvisible />
                        }
                    </button>
                </div>
                <label className='text-md font-light'>
                    Confrim Password
                </label>
                <div className='flex mt-2'>
                    <input
                        type={visibleConfrim}
                        className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="password"
                        required
                        onChange={(e) => setconfirmationPassword(e.target.value)}
                    />
                    <button onClick={handleVisibleConfrim} type="button" className='text-2xl ml-3'>
                        {
                            visibleConfrim == "password" ? <AiFillEye /> : <AiFillEyeInvisible />
                        }
                    </button>
                </div>
                <button
                    onClick={btnSignUp}
                    type="button"
                    className="my-6 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                >
                    Sign Up
                </button>
                <hr />

                <div className='text-center text-md font-light mt-4'>
                    <div>
                        Already have an Account?
                    </div>

                    <button className='font-normal hover:text-blue-800 mt-2 hover:underline' onClick={() => navigate("/")}>
                        SIGN IN
                    </button>

                </div>
            </form>
            <ToastContainer />

        </div>
    )
}

export default CardRegister