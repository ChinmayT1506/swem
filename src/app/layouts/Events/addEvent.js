import React from 'react';
import './addEvent.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddEventForm() {

    const navigate = useNavigate();

    // post data
    async function handlesubmit(){
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
            <Grid className='AddEvent-Container'>
                <Stack className='AddEventBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <h3>Add Event</h3>
                    </Box>
                    <Stack className='form-main' spacing={2}>
                        <label for='EventName'>Event Name</label>
                        <input className='' type='text' name='EventName' autoComplete='off'></input>
                        <label for='Event-Code'>Event Code</label>
                        <input className='' id='Event-Code' type='text' name='Event-Code'></input>
                        <label for='associateScheme'>Associate Scheme</label>
                        <input className='' id='associateScheme' type='number' name='associateScheme'></input>
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
