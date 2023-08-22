import React, { useState } from 'react';
import './addDpo.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { GET, PUT } from '../../../../../services/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function EditDPOForm() {

    const navigate = useNavigate();
    const location = useLocation()
    const [eyeIcon, setEyeIcon] = useState(false);
    const [eyeIcon2, setEyeIcon2] = useState(false);
    const [entry, setEntry] = useState(location.state.item);
    const [blockDataArr, setBlockDataArr] = useState();

    const district_List = useSelector(state => state.getDistrictsData.DistrictDataArr)

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
        if (event.target.name === "district") {
            const Master_Project = async () => {
                let res = await GET("/officer/master/block",
                    {
                        district: event.target.value
                    }
                )
                if (res?.data?.success) {
                    console.log(res.data.result.data)
                    // dispatch(getBlockData(res?.data?.result?.data))
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
            Master_Project()
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

    // edit data
    async function handleSubmit(event) {
        // console.log(entry._id)
        event.preventDefault();
        const res = await PUT(`officer/user?userId=${entry._id}`, {
            user_type: "DPO",
            name: entry.name,
            mobile: entry.mobile,
            district: entry.district,
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
            <Grid className='AddDPO-Container'>
                <Stack className='AddDPOBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
                        <h3>Edit DPO</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>

                            <label for='name'>Name</label>
                            <input onChange={handleChange} type='text' name='name' autoComplete='off' value={entry.name}></input>

                            <label for='mobile'>Mobile Number</label>
                            <input onChange={handleChange} id='tel' type='tel' name='mobile' maxLength={10} value={entry.mobile}></input>

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
                                    <option value={item.district}>{item.district}</option>
                                ))}
                            </select>

                            <label for='newPassword'>Password</label>
                            <Grid className='passwordInput'>
                                <input autofill="off" onChange={handleChange} className='password-input-Class' id='passwordInput' value={entry.password} type='newPassword' name='password' placeholder='Enter Password'></input>
                                <Box className="eyeIconDiv">
                                    {(eyeIcon) ? <RemoveRedEyeIcon onClick={toggleButton} className='eyeIcon' fontSize='small' /> : <VisibilityOffIcon onClick={toggleButton} className='eyeIcon' fontSize='small' />}
                                </Box>
                            </Grid>

                            <label for='confirmPassword'>Confirm Password</label>
                            <Grid className='passwordInput'>
                                <input autofill='off' autoComplete="off" onChange={handleChange} className='password-input-Class' id='ConfirmPasswordInput' type='password' name='confirmPassword' placeholder='Enter Password'></input>
                                <Box className="eyeIconDiv">
                                    {(eyeIcon2) ? <RemoveRedEyeIcon onClick={toggleButton2} className='eyeIcon' fontSize='small' /> : <VisibilityOffIcon onClick={toggleButton2} className='eyeIcon' fontSize='small' />}
                                </Box>
                            </Grid>
                            <Grid className='submitForm'>
                                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                                <button type="submit">Submit</button>
                            </Grid>
                        </Stack>
                    </form>
                </Stack >
            </Grid >
        </>
    );
}