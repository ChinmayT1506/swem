import React, { useState } from 'react';
import './addAnganwadi.scss'
import { Box, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { toast } from 'react-toastify';
import { POST } from '../../../../../services/api';
import { useSelector } from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function AddAnganwadiForm() {

    const navigate = useNavigate();
    const [entry, setEntry] = useState({});
    const [currDistrictId, setCurrDistrictId] = useState("");
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
    
    // post anganwadi data
    async function handleSubmit(event) {
        event.preventDefault();
        const res = await POST("/officer/user", {
            user_type: "ANGANWADI_WORKER",
            name: entry.AnganwadiName,
            mobile: entry.mobile,
            password: entry.confirmPassword === entry.Password ? entry.Password : "",
            district: entry.district,
            block: "abc",
            sector: entry.sector,
            awc_name: entry.anganwadiCentre,
            awc_code: entry.anganwadiCentreCode,
            awc_address: entry.anganwadiAddress,
        })
        console.log(res)
        if (res.data.success) {
            toast.success(res.data.message)
            navigate(-1)
        }
        else {
            toast.error(res.data.message)
        }
    }

    return (
        <>
            <Grid className='AddAnganwadi-Container'>
                <Stack className='AddAnganwadiBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
                        <h3>Add Anganwadi</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>

                            <label for='AnganwadiName'>Name</label>
                            <input onChange={handleChange} type='text' name='AnganwadiName' autoComplete='off'></input>

                            <label for='mobile'>Mobile Number</label>
                            <input onChange={handleChange} className='' type='tel' name='mobile' maxLength={10}></input>

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
                            <input onChange={handleChange} className='' id='project' type='text' name='project'></input>

                            <label for='sector'>Sector</label>
                            <input onChange={handleChange} className='' id='sector' type='number' name='sector'></input>

                            <label for='anganwadiCentre'>Anganwadi Centre Name</label>
                            <input onChange={handleChange} className='' type='text' name='anganwadiCentre'></input>

                            <label for='anganwadiCentreCode'>Anganwadi Centre Code</label>
                            <input onChange={handleChange} className='' id='anganwadiCentreCode' type='text' name='anganwadiCentreCode'></input>

                            <label for='anganwadiAddress'>Anganwadi Centre Address</label>
                            <textarea onChange={handleChange} className='' id='anganwadiCentreAddress' rows="3" name='anganwadiAddress'></textarea>

                            <label for='newPassword'>Password</label>
                            <Grid className='passwordInput'>
                                <input onChange={handleChange} className='password-input-Class' id='passwordInput' type='password' name='Password' placeholder='Enter New Password'></input>
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