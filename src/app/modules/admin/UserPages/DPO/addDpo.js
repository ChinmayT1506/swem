import React from 'react';
import './addDpo.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddDPOForm() {

    const navigate = useNavigate();

    // post data
    async function handlesubmit() {
        try {
            await axios.post("https://reqres.in/api/users", {
                first_name: "Chinmay"
            }).then(response => console.log(response))
        } catch (error) {
            console.log(error)
        }
        navigate(-1)
    }

    return (
        <>
            <Grid className='AddDPO-Container'>
                <Stack className='AddDPOBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <h3>Add DPO</h3>
                    </Box>
                    <Stack className='form-main' spacing={2}>

                        <label for='DPOName'>Name</label>
                        <input type='text' name='DPOName' autoComplete='off'></input>

                        <label for='mobNum'>Mobile Number</label>
                        <input id='tel' type='tel' name='approvalCost'></input>

                        <label for='district'>District</label>
                        <input type='text' name='district' autoComplete='off'></input>

                        <label for='password'>Password</label>
                        <input id='password' type='password' name='password'></input>

                        <label for='confirmPassword'>Confirm Password</label>
                        <input id='confirmPassword' type='password' name='confirmPassword'></input>

                        <Grid className='submitForm'>
                            <button onClick={() => navigate(-1)}>Cancel</button>
                            <button onClick={handlesubmit}>Submit</button>
                        </Grid>
                    </Stack>
                </Stack >
            </Grid >
        </>
    );
}