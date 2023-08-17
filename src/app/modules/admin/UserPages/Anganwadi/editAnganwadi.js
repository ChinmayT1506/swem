import React, { useState } from 'react';
import './addAnganwadi.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector } from 'react-redux';
import { PUT } from '../../../../../services/api';
import { toast } from 'react-toastify';

export default function EditAnganwadiForm() {

    const navigate = useNavigate();

    const location = useLocation()
    const [currDistrictId, setCurrDistrictId] = useState("");
    const [eyeIcon, setEyeIcon] = useState(false);
    const [eyeIcon2, setEyeIcon2] = useState(false);
    const district_List = useSelector(state => state.getDistrictsData.DistrictDataArr)
    const [entry, setEntry] = useState(location.state.item);
    console.log(entry)
    
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


    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
    }

    // edit data
    async function handleSubmit(event) {
        event.preventDefault();
        const res = await PUT(`officer/user?userId=${entry._id}`, {
            user_type: "ANGANWADI_WORKER",
            name: entry.name,
            mobile: entry.mobile,
            district: entry.district,
            block: entry.block,
            password: entry.confirmPassword === entry.newPassword ? entry.newPassword : "",
            sector: entry.sector,
            awc_name: entry.awc_name,
            awc_code: entry.awc_code,
            awc_address: entry.awc_address,
        })
        if (res?.data?.success) {
            toast.success(res?.data?.message)
            navigate(-1)
        }
        else if (res?.status === 401) {
            toast.error("Inavalid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else{
            toast.error(res?.data?.message)   
        }
        console.log(res)
    }

    return (
        <>
            <Grid className='AddAnganwadi-Container'>
                <Stack className='AddAnganwadiBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
                        <h3>Edit Anganwadi</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>

                            <label for='AnganwadiName'>Name</label>
                            <input value={entry.name} onChange={handleChange} type='text' name='name' autoComplete='off'></input>

                            <label for='mobile'>Mobile Number</label>
                            <input value={entry.mobile} onChange={handleChange} className='' type='tel' name='mobile' maxLength={10}></input>

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
                            <input onChange={handleChange} className='' id='project' type='text' name='project'></input>

                            <label for='sector'>Sector</label>
                            <input value={entry.sector} onChange={handleChange} className='' id='sector' type='number' name='sector'></input>

                            <label for='anganwadiCentre'>Anganwadi Centre Name</label>
                            <input value={entry.awc_name} onChange={handleChange} className='' type='text' name='awc_name'></input>

                            <label for='anganwadiCentreCode'>Anganwadi Centre Code</label>
                            <input value={entry.awc_code} onChange={handleChange} className='' id='anganwadiCentreCode' type='text' name='awc_code'></input>

                            <label for='anganwadiAddress'>Anganwadi Centre Address</label>
                            <textarea value={entry.awc_address} onChange={handleChange} className='' id='anganwadiCentreAddress' rows="3" name='awc_address'></textarea>

                            <label for='newPassword'>New Password</label>
                            <Grid className='passwordInput'>
                                <input onChange={handleChange} className='password-input-Class' id='passwordInput' type='password' name='newPassword' placeholder='Enter New Password' value={entry.newPassword}></input>
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