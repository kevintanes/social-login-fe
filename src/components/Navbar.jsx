import React from 'react';
import { Dropdown, Spinner } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogoutAction } from "../reducers/auth";

function NavbarComponent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const username = useSelector((state) => state.authReducer.username);


    return (

        <nav className="bg-white container mx-auto border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
            <div className='flex justify-end'>
                <Dropdown inline={true} label={username}>
                    {/* <Dropdown.Item className='lg:hidden' onClick={() => { navigate("/home") }}>
                        Home
                    </Dropdown.Item>
                    <Dropdown.Item className='lg:hidden' onClick={() => { navigate("/profile") }}>
                        Profile
                    </Dropdown.Item> */}
                    <Dropdown.Item
                        onClick={() => {
                            dispatch(authLogoutAction())
                            navigate("/", { replace: true })
                        }}
                    >
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </nav>
    )
}

export default NavbarComponent