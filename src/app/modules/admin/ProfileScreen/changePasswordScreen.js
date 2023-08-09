import React from 'react';
import './changePasswordScreen.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ChangePasswordScreen() {

    const navigate = useNavigate("/");
    return (
        <>
            <Grid className='ChangePasswordScreen-Container'>
                <Stack className='ChangePasswordScreenBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <h3>Change Password</h3>
                    </Box>
                    <Stack className='form-main' spacing={2}>
                        <label for='oldPassword'>Old Password</label>
                        <input type='password' name='oldPassword'></input>
                        <label for='newPassword'>New Password</label>
                        <input type='password' name='newPassword'></input>
                        <label for='confirmPassword'>Confirm Password</label>
                        <input type='confirmPassword' name='confirmPassword'></input>
                        <Grid className='submitForm'>
                            <button onClick={() => navigate(-1)}>Change Password</button>
                        </Grid>
                    </Stack>
                </Stack >
            </Grid >
        </>
    );
}
