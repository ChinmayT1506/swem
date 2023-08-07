import React, { useState } from 'react'
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

export default function Login() {

    const navigate = useNavigate()

    const LoginCred = {
        mobNum: '7840054376',
        password: 'xyz123'
    }

    const [loginEntry, setLoginEntry] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setLoginEntry(prevVal => {
            return {
                ...prevVal,
                [name]: value
            }
        })
        console.log(loginEntry)
    }

    function submitLogin(event) {
        event.preventDefault();
        if (JSON.stringify(LoginCred) === JSON.stringify(loginEntry)) {
            localStorage.setItem("accessToken", JSON.stringify(loginEntry.mobNum))
            navigate("/dashboard")
        }
        else {
            navigate("/login")
            toast.error("Inavlid User Credentials")
        }
    }

    const [eyeIcon, setEyeIcon] = useState(false);

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
                    <form>
                        <Stack className='login-form' spacing={2.1}>
                            <label htmlFor='mobNum' >Mobile Number</label>
                            <input onChange={handleChange} className='input-Class' type='tel' name='mobNum' placeholder='Enter Mobile Number' maxLength={10} autoComplete='off'></input>
                            <label htmlFor='password'>Password</label>
                            <Grid className='passwordInput'>
                                <input onChange={handleChange} className='password-input-Class' id='passwordInput' type='password' name='password' placeholder='Enter Password'></input>
                                <Box className="eyeIconDiv">
                                    {(eyeIcon) ? <RemoveRedEyeIcon onClick={toggleButton} className='eyeIcon' fontSize='small' /> : <VisibilityOffIcon onClick={toggleButton} className='eyeIcon' fontSize='small' />}
                                </Box>
                            </Grid>
                            <button onClick={submitLogin}>Login</button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
            <ToastContainer
position="top-right"
autoClose={5000}
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
