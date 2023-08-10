import React from 'react';
import './addQuery.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function AddQueryForm() {

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
            <Grid className='AddQuery-Container'>
                <Stack className='AddQueryBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />

                        <h3>Add Query</h3>
                    </Box>
                    <Stack className='form-main' spacing={2}>

                        <label for='subject'>Subject</label>
                        <input id='subject' type='text' name='subject' autoComplete='off'></input>

                        <label for='message'>Message</label>
                        <input id='message' type='textarea' name='message'></input>
                        
                        <label for='referenceImage'>Reference Image</label>
                        <input id='confirmPassword' type='text' name='referenceImage' value='Upload Image' disabled='disabled'></input>
                        <input id='confirmPassword' type='file' name='referenceImage' placeholder='Upload Image'></input>

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