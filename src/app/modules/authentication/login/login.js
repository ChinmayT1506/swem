import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './login.scss'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ashokaEmb from "../../../../assets/images/ashokaEmb.png"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DELETE, POST } from '../../../../services/api';
import { getLoginData } from '../../../redux/actions/loginAction';

export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [eyeIcon, setEyeIcon] = useState(false);
    const [loginEntry, setLoginEntry] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setLoginEntry(prevVal => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }
    // 9540952030
    // Test@777
    // login Authentication
    async function submitLogin(event) {
        event.preventDefault();
        let payload = {
            mobile: loginEntry.mobNum,
            password: loginEntry.password
        };
        const res = await POST("/user/session", payload);
        if (res.data.success) {
            localStorage.setItem("ACCESS_TOKEN", res.data.result.token)
            // localStorage.setItem("USER_TYPE", res.data.result.user_type)
            toast.success("Login Successful")
            setTimeout(() => {
                navigate("/dashboard")
            }, 1500);
            dispatch(getLoginData(res.data.result))            
            console.log(res.data.result)
            // document.getElementById("loginBtn").disabled = "true"
        }
        else {
            navigate("/")
            toast.error(res.data.message)
        }
    }

    // Timer for logout
    // setTimeout(async () => {
    //     const res = await DELETE("/user/session")
    //     console.log(res);
    //     if (res.data.success) {
    //         localStorage.removeItem("ACCESS_TOKEN")
    //         toast.error("Invalid User Token")
    //         setTimeout(() => {
    //             navigate("/")
    //         }, 1500);
    //     }
    // }, 1691825004878);


    function toggleButton() {
        let eyeToggle = document.getElementById('passwordInput');
        if (eyeToggle.type === 'password') {
            eyeToggle.type = 'text';
            setEyeIcon(true)
        }
        else {
            eyeToggle.type = 'password';
            setEyeIcon(false)
        }
    }

    function onlyNumeric(event) {
        let inputVal = event.target.value
        let pattern = /^[0-9]+$/;
        if (pattern.test(inputVal)) {
            document.getElementById('mobNum').value = inputVal;
        }
        else {
            let num = inputVal.slice(0, -1);
            document.getElementById('mobNum').value = num;
        }
    }

    return (
        <Grid className='login-container'>
            <Box className='login-wrapper'>
                <Box className='login-Header'>
                    <h2>GOVERNMENT OF JAMMU AND KASHMIR</h2>
                </Box>
                <Stack className='login-credentials-box' spacing={2}>
                    <Box className="ImageBox">
                        <img src={ashokaEmb} alt="ashokaEmb" className='ashokaEmb' />
                    </Box>
                    <form onSubmit={submitLogin}>
                        <Stack className='login-form' spacing={2.1}>
                            <label htmlFor='mobNum' >Mobile Number</label>
                            <input onChange={handleChange} onInput={onlyNumeric} className='input-Class' id="mobNum" type='tel' name='mobNum' placeholder='Enter Mobile Number' maxLength={10} autoComplete='off'></input>
                            <label htmlFor='password'>Password</label>
                            <Grid className='passwordInput'>
                                <input onChange={handleChange} className='password-input-Class' id='passwordInput' type='password' name='password' placeholder='Enter Password'></input>
                                <Box className="eyeIconDiv">
                                    {(eyeIcon) ? <RemoveRedEyeIcon onClick={toggleButton} className='eyeIcon' fontSize='small' /> : <VisibilityOffIcon onClick={toggleButton} className='eyeIcon' fontSize='small' />}
                                </Box>
                            </Grid>
                            <button id="loginBtn">Login</button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Grid>
    )
}
