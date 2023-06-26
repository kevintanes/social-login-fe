import React from 'react';
import { BiLogoFacebook, BiLogoGoogle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { API_URL } from '../helper';
import { authLoginAction } from "../reducers/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login"


function CardLogin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [visible, setVisible] = React.useState("password");

    const handleVisible = () => {
        if (visible == 'password') {
            setVisible("text");
        } else {
            setVisible("password")
        }
    }

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const btnLogin = async () => {
        if (email == "" && password == "") {
            toast.warning(`your input is empty`, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000
            });
        } else {
            try {
                let res = await axios.post(`${API_URL}/user/login`, {
                    email,
                    password
                })
                // console.log(`btnLogin`, res);

                localStorage.setItem("userLogin", res.data.data.email)
                dispatch(authLoginAction(res.data.data))
                navigate("/landingpage")


            } catch (error) {
                console.log(error);
                toast.error(`${error.response.data.message}`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000
                });

            }
        }
    };

    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto relative top-40">
            <form>
                <h1 className='text-5xl font-bold text-center py-10'>
                    Login
                </h1>
                <label className='text-md font-light'>
                    Email
                </label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="mt-2 mb-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Type your email"
                    required
                />
                <label className='text-md font-light'>
                    Password
                </label>
                <div className='flex mt-2'>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type={visible}
                        className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="password"
                        required
                    />
                    <button onClick={handleVisible} type="button" className='text-2xl ml-3'>
                        {
                            visible == "password" ? <AiFillEye /> : <AiFillEyeInvisible />
                        }
                    </button>
                </div>
                <button
                    onClick={btnLogin}
                    type="button"
                    className="my-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                >
                    Login
                </button>
                <hr />

                <div className='text-center text-md font-light mt-4'>
                    <span>
                        or connect with
                    </span>

                    <div className='flex justify-center gap-4 mt-6'>
                        <LoginSocialFacebook
                            appId="924299778674770"
                            onResolve={(response) => {
                                console.log(response);

                            }}
                            onReject={(error) => {
                                console.log(error);
                            }}
                        >
                            <button className='w-10 h-10 bg-blue-500 rounded-full'>
                                <div className='ml-1 text-center'>
                                    <BiLogoFacebook size={"30px"} color="white" />
                                </div>
                            </button>
                        </LoginSocialFacebook>
                        <LoginSocialGoogle
                            client_id="48325015742-jj8o0h3sflk5nrevsu6lta5t7rthhfqf.apps.googleusercontent.com"
                            onResolve={(response) => {
                                console.log(response);
                            }}
                            onReject={(err) => {
                                console.log(err);
                            }}
                        >
                            <button className='w-10 h-10 bg-red-500 rounded-full'>
                                <div className='ml-1 text-center'>
                                    <BiLogoGoogle size={"30px"} color="white" />
                                </div>
                            </button>

                        </LoginSocialGoogle>
                    </div>
                </div>

                <div className='text-center text-md font-light mt-10'>
                    <div>
                        or Sign Up Using
                    </div>

                    <button className='font-normal hover:text-blue-800 mt-2 hover:underline' onClick={() => navigate("/register")}>
                        SIGN UP
                    </button>

                </div>
            </form >

            <ToastContainer />
        </div >
    )
}

export default CardLogin