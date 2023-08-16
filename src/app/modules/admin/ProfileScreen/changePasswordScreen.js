import React, { useState } from 'react';
import './changePasswordScreen.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function ChangePasswordScreen() {

    // function handleChange(event) {
    //     const { name, value } = event.target;
    //     setLoginEntry(prevVal => {
    //         return {
    //             ...prevVal,
    //             [name]: value
    //         }
    //     })
    // }

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

    const navigate = useNavigate();

    return (
        <>
            <Grid className='ChangePasswordScreen-Container'>
                <Stack className='ChangePasswordScreenBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <h3>Change Password</h3>
                    </Box>
                    <Stack className='form-main' spacing={2}>
                        <label for='oldPassword'>Old Password</label>
                        <input type='password' name='oldPassword' placeholder='Old Password'></input>
                        
                        <label for='newPassword'>New Password</label>
                        <Grid className='passwordInput'>
                            <input className='password-input-Class' id='passwordInput' type='password' name='passwordInput' placeholder='Enter New Password'></input>
                            <Box className="eyeIconDiv">
                                {(eyeIcon) ? <RemoveRedEyeIcon onClick={toggleButton} className='eyeIcon' fontSize='small' /> : <VisibilityOffIcon onClick={toggleButton} className='eyeIcon' fontSize='small' />}
                            </Box>
                        </Grid>
                        <label for='confirmPassword'>Confirm Password</label>
                        <Grid className='passwordInput'>
                            <input className='password-input-Class' id='ConfirmPasswordInput' type='password' name='confirmPassword' placeholder='Enter Password'></input>
                            <Box className="eyeIconDiv">
                                {(eyeIcon2) ? <RemoveRedEyeIcon onClick={toggleButton2} className='eyeIcon' fontSize='small' /> : <VisibilityOffIcon onClick={toggleButton2} className='eyeIcon' fontSize='small' />}
                            </Box>
                        </Grid>
                        <Grid className='submitForm'>
                            <button onClick={() => navigate(-1)}>Change Password</button>
                        </Grid>
                    </Stack>
                </Stack >
            </Grid >
        </>
    );
}
