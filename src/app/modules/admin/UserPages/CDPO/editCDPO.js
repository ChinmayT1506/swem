import React, { useState } from 'react';
import './addCdpo.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { PUT } from '../../../../../services/api';
import { useSelector } from 'react-redux';

export default function EditCDPOForm() {

    const navigate = useNavigate();
    const location = useLocation()
    const [currDistrictId, setCurrDistrictId] = useState("");
    const [eyeIcon, setEyeIcon] = useState(false);
    const [eyeIcon2, setEyeIcon2] = useState(false);
    const district_List = useSelector(state => state.getDistrictsData.DistrictDataArr)
    const [entry, setEntry] = useState(location.state.item);

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

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
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


    // post data
    async function handleSubmit(event) {
        // console.log(entry._id)
        event.preventDefault();
        const res = await PUT(`officer/user?userId=${entry._id}`, {
            user_type: "CDPO",
            name: entry.name,
            mobile: entry.mobile,
            district: entry.district,
            project: entry.project,
            block: "abc",
            password: entry.newPassword === entry.confirmPassword ? entry.newPassword : "",
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
            <Grid className='AddCDPO-Container'>
                <Stack className='AddCDPOBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
                        <h3>Edit CDPO</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>

                            <label for='CDPOName'>Name</label>
                            <input
                                type='text'
                                value={entry.name}
                                name='name'
                                autoComplete='off'
                                onChange={handleChange}
                            >
                            </input>

                            <label for='mobNum'>Mobile Number</label>
                            <input
                                id='tel'
                                type='tel'
                                value={entry.mobile}
                                name='mob'
                                onChange={handleChange}
                                maxLength={10}
                            >
                            </input>

                            <label>District</label>
                            <select
                                labelId="filterlabel"
                                id="select"
                                name='district'
                                value={entry.district}
                                label="All"
                                onChange={handleChange}
                            >
                                {district_List.map(item => (
                                    <option value={item.district} onClick={() => setCurrDistrictId(item._id)}>{item.district}</option>
                                ))}
                            </select>

                            <label for='project'>Project</label>
                            <input
                                type='text'
                                name='project'
                                value={entry.project}
                                autoComplete='off'
                                onChange={handleChange}
                            >
                            </input>

                            <label for='newPassword'>New Password</label>
                            <Grid className='passwordInput'>
                                <input onChange={handleChange} className='password-input-Class' id='passwordInput' type='password' name='newPassword' placeholder='Enter New Password'></input>
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