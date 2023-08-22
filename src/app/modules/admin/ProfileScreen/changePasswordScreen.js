import React, { useState } from 'react';
import './changePasswordScreen.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { PATCH, PUT } from '../../../../services/api';
import { useSelector } from 'react-redux';

export default function ChangePasswordScreen() {

    const navigate = useNavigate();
    const [entry, setEntry] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(prevVal => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }

    const [eyeIcon, setEyeIcon] = useState(false);
    const [eyeIcon2, setEyeIcon2] = useState(false);

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

    function toggleButton2() {
        let eyeToggle = document.getElementById('ConfirmPasswordInput');
        if (eyeToggle.type === 'password') {
            eyeToggle.type = 'text';
            setEyeIcon2(true)
        }
        else {
            eyeToggle.type = 'password';
            setEyeIcon2(false)
        }
    }

    // edit data
    async function handleSubmit(event) {
        // console.log(entry._id)
        event.preventDefault();
        const res = await PATCH("/user/password/change", {
            oldPassword: entry.oldPassword,
            newPassword: entry.password === entry.confirmPassword ? entry.password : "",
        })
        if (res.data.success) {
            toast.success(res.data.message)
            navigate(- 1)
        }
        else if (res.status === 401) {
            toast.error("Inavalid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else {
            toast.error(res.data.message)
        }
        console.log(res)
    }

    return (
        <>
            <Grid className='ChangePasswordScreen-Container'>
                <Stack className='ChangePasswordScreenBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <h3>Change Password</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>
                            <label for='oldPassword'>Old Password</label>
                            <input onChange={handleChange} type='password' name='oldPassword' placeholder='Old Password'></input>

                            <label for='password'>New Password</label>
                            <Grid className='passwordInput'>
                                <input onChange={handleChange} className='password-input-Class' id='passwordInput' type='password' name='password' placeholder='Enter New Password'></input>
                                <Box className="eyeIconDiv">
                                    {(eyeIcon) ? <RemoveRedEyeIcon onClick={toggleButton} className='eyeIcon' fontSize='small' /> : <VisibilityOffIcon onClick={toggleButton} className='eyeIcon' fontSize='small' />}
                                </Box>
                            </Grid>
                            <label for='confirmPassword'>Confirm Password</label>
                            <Grid className='passwordInput'>
                                <input onChange={handleChange} className='password-input-Class' id='ConfirmPasswordInput' type='password' name='confirmPassword' placeholder='Enter Password'></input>
                                <Box className="eyeIconDiv">
                                    {(eyeIcon2) ? <RemoveRedEyeIcon onClick={toggleButton2} className='eyeIcon' fontSize='small' /> : <VisibilityOffIcon onClick={toggleButton2} className='eyeIcon' fontSize='small' />}
                                </Box>
                            </Grid>
                            <Grid className='submitForm'>
                                <button type='submit'>Change Password</button>
                            </Grid>
                        </Stack>
                    </form>
                </Stack >
            </Grid >
        </>
    );
}
