import React, { useState } from 'react';
import './addCdpo.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { POST } from '../../../../../services/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function AddCDPOForm() {

    const navigate = useNavigate();
    const [entry, setEntry] = useState({});
    const [eyeIcon, setEyeIcon] = useState(false);
    const [eyeIcon2, setEyeIcon2] = useState(false);
    const [currDistrictId, setCurrDistrictId] = useState("");

    const district_List = useSelector(state => state.getDistrictsData.DistrictDataArr)

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
    }

    // post cdpo data
    async function handleSubmit(event) {
        event.preventDefault();
        const res = await POST("/officer/user", {
            user_type: "CDPO",
            name: entry.CDPOName,
            mobile: entry.mobile,
            password: entry.password === entry.confirmPassword ? entry.password : "",
            district: entry.district,
            project: entry.project,
            block: "abc",
        })
        console.log(res)
        if (res.data.success) {
            toast.success(res.data.message)
            navigate(-1)
        }
        else if (res.status === 401) {
            toast.error("Inavlid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else {
            toast.error(res.data.message)
        }
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

    return (
        <>
            <Grid className='AddCDPO-Container'>
                <Stack className='AddCDPOBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
                        <h3>Add CDPO</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>

                            <label for='CDPOName'>Name</label>
                            <input onChange={handleChange} type='text' name='CDPOName' autoComplete='off'></input>

                            <label for='mobNum'>Mobile Number</label>
                            <input onChange={handleChange} id='tel' type='tel' name='mobile' maxLength={10}></input>

                            <label>District</label>
                            <select
                                labelId="filterlabel"
                                id="select"
                                name='district'
                                // value=""
                                label="All"
                                onChange={handleChange}
                            >
                                {district_List.map(item => (
                                    <option value={item.district} onClick={() => setCurrDistrictId(item._id)}>{item.district}</option>
                                ))}
                            </select>

                            <label for='project'>Project</label>
                            <input onChange={handleChange} type='text' name='project' autoComplete='off'></input>

                            <label for='password'>Password</label>
                            <Grid className='passwordInput'>
                                <input onChange={handleChange} className='password-input-Class' id='passwordInput' type='password' name='password' placeholder='Enter Password'></input>
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