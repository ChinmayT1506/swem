import React from 'react'
import { USER_CONSTANT } from '../constants/userConstant'
import { DELETE } from '../services/api'
import { useDispatch } from 'react-redux'
import { delLoginData } from '../app/redux/actions/loginAction'
import { useNavigate } from 'react-router-dom'

export const LogoutFunc = async () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const USER_TYPE = USER_CONSTANT?.user_type
    console.log(USER_TYPE)
    const res = await DELETE("/user/session")
    dispatch(delLoginData(USER_CONSTANT))
    if (res.data.success) {
        localStorage.removeItem("ACCESS_TOKEN")
        // toast.success("User Logged Out Successfully")
        setTimeout(() => {
            navigate("/")
        }, 1500);
    }
}
