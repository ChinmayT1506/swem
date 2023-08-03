import React, { useState } from 'react'
import './login.scss'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ashokaEmb from "../../../../assets/images/ashokaEmb.png"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {

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
                            <label for='mobNum'>Mobile Number</label>
                            <input className='input-Class' type='tel' name='mobNum' placeholder='Enter Mobile Number' maxLength={10}></input>
                            <label for='mobNum'>Password</label>
                            <Grid className='passwordInput'>
                                <input className='password-input-Class' id='passwordInput' type='password' name='mobNum' placeholder='Enter Password'></input>
                                <Box className="eyeIconDiv">
                                    {(eyeIcon) ? <RemoveRedEyeIcon onClick={toggleButton} className='eyeIcon' fontSize='small'/> : <VisibilityOffIcon onClick={toggleButton} className='eyeIcon' fontSize='small'/>}
                                </Box>
                            </Grid>
                            <button>Login</button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </Grid>
    )
}
