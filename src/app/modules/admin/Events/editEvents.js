import React from 'react';
import './addEvent.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function EditEventForm() {
    const navigate = useNavigate();
    return (
        <>
            <Grid className='AddEvent-Container'>
                <Stack className='AddEventBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <h3>Edit Event</h3>
                    </Box>
                    <Stack className='form-main' spacing={2}>
                        <label for='EventName'>Event Name</label>
                        <input className='input-Class' type='text' name='EventName' autoComplete='off'></input>
                        <label for='approvalCost'>Administrative Approval Cost</label>
                        <input className='' id='passwordInput' type='number' name='approvalCost'></input>
                        <label for='addFunds'>Additional Funds Required</label>
                        <input className='' id='passwordInput' type='number' name='addFunds'></input>
                        <label for='dateOfComm'>Date of Commencement of Event</label>
                        <input className='' type='date' name='dateOfComm'></input>
                        <Grid className='submitForm'>
                            <button onClick={() => navigate(-1)}>Cancel</button>
                            <button>Submit</button>
                        </Grid>
                    </Stack>
                </Stack >
            </Grid >
        </>
    );
}
