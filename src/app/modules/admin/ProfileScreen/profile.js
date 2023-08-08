import React from 'react';
import './profile.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

    const isAdmin = true;
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
                            <input disabled="disabled" value="ajit" type='text' name='ProfileName'></input>
                            <label for='mobileNum'>Mobile Number</label>
                            <input disabled="disabled" value="7840054376" id='tel' type='tel' name='mobileNum'></input>
                        </Stack> :

                        <Stack className='form-main' spacing={2}>
                            <label for='ProfileName'>Name</label>
                            <input disabled="disabled" value="CDPO ajit" type='text' name='ProfileName'></input>
                            <label for='mobileNum'>Mobile Number</label>
                            <input disabled="disabled" value="9990134376" id='tel' type='tel' name='mobileNum'></input>
                            <label for='district'>District</label>
                            <input disabled="disabled" value="Udhampur" type='text' name='district'></input>
                            <label for='block'>Block</label>
                            <input disabled="disabled" value="Udhampur" type='text' name='block'></input>
                        </Stack>
                    }
                </Stack >
            </Grid >
        </>
    );
}
