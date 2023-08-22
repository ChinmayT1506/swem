import React, { useEffect, useState } from 'react';
import './profile.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GET } from '../../../../services/api';
import { useSelector } from 'react-redux';

export default function Profile() {

    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});

    const USER = useSelector(state => state?.getLogindata?.loginData.user_type)
    const isAdmin = (USER === "HOD")

    const getProfile = async () => {
        const res = await GET("/user/profile")
        if (res.data.success) {
            setProfileData(res?.data?.result);
        }
        else if (res.status === 401) {
            toast.error("Inavlid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
    }
    useEffect(() => {
        getProfile()
    }, []);

    return (
        <>
            <Grid className='Profile-Container'>
                <Stack className='ProfileBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <h3>Profile</h3>
                    </Box>
                    {isAdmin ?
                        <Stack className='form-main' spacing={2}>
                            <label for='ProfileName'>Name</label>
                            <input disabled="disabled" value={profileData.name} type='text' name='ProfileName'></input>
                            <label for='mobileNum'>Mobile Number</label>
                            <input disabled="disabled" value={profileData.mobile} id='tel' type='tel' name='mobileNum'></input>
                        </Stack> :

                        <Stack className='form-main' spacing={2}>
                            <label for='ProfileName'>Name</label>
                            <input disabled="disabled" value={profileData.name} type='text' name='ProfileName'></input>
                            <label for='mobileNum'>Mobile Number</label>
                            <input disabled="disabled" value={profileData.mobile} id='tel' type='tel' name='mobileNum'></input>
                            <label for='district'>District</label>
                            <input disabled="disabled" value={profileData.district} type='text' name='district'></input>
                            <label for='block'>Block</label>
                            <input disabled="disabled" value={profileData.block} type='text' name='block'></input>
                        </Stack>
                    }
                </Stack >
            </Grid >
        </>
    );
}
