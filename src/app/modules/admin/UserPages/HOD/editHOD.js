import React, { useState } from 'react';
import './addHod.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { PUT } from '../../../../../services/api';
import { toast } from 'react-toastify';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function EditHODForm() {

    const navigate = useNavigate();
    const location = useLocation()
    const [eyeIcon, setEyeIcon] = useState(false);
    const [eyeIcon2, setEyeIcon2] = useState(false);
    const [entry, setEntry] = useState(location?.state?.item);

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
    }

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
        event.preventDefault();
        const res = await PUT(`officer/user?userId=${entry._id}`, {
            user_type: "HOD",
            name: entry.name,
            mobile: entry.mobile,
            password: entry.password === entry.confirmPassword ? entry.password : "",
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
            <Grid className='AddHOD-Container'>
                <Stack className='AddHODBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
                        <h3>Edit HOD</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>

                            <label for='HODName'>Name</label>
                            <input onChange={handleChange} type='text' name='name' autoComplete='off' value={entry.name}></input>

                            <label for='mobile'>Mobile Number</label>
                            <input onChange={handleChange} id='tel' type='tel' name='mobile' autoComplete='off' value={entry.mobile} maxLength={10}></input>

                            <label for='password'>Password</label>
                            <Grid className='passwordInput'>
                                <input onChange={handleChange} className='password-input-Class' id='passwordInput' type='password' name='password' placeholder='Enter Password' autoComplete='off'></input>
                                <Box className="eyeIconDiv">
                                    {(eyeIcon) ? <RemoveRedEyeIcon onClick={toggleButton} className='eyeIcon' fontSize='small' /> : <VisibilityOffIcon onClick={toggleButton} className='eyeIcon' fontSize='small' />}
                                </Box>
                            </Grid>

                            <label for='confirmPassword'>Confirm Password</label>
                            <Grid className='passwordInput'>
                                <input onChange={handleChange} autoComplete='off' className='password-input-Class' id='ConfirmPasswordInput' type='password' name='confirmPassword' placeholder='Enter Password'></input>
                                <Box className="eyeIconDiv">
                                    {(eyeIcon2) ? <RemoveRedEyeIcon onClick={toggleButton2} className='eyeIcon' fontSize='small' /> : <VisibilityOffIcon onClick={toggleButton2} className='eyeIcon' fontSize='small' />}
                                </Box>
                            </Grid>

                            <Grid className='submitForm'>
                                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                                <button type='submit'>Submit</button>
                            </Grid>
                        </Stack>
                    </form>
                </Stack >
            </Grid >
        </>
    );
}