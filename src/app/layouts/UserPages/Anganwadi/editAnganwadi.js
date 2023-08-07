import React from 'react';
import './addAnganwadi.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditAnganwadiForm() {

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
            <Grid className='AddAnganwadi-Container'>
                <Stack className='AddAnganwadiBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <h3>Edit Anganwadi</h3>
                    </Box>
                    <Stack className='form-main' spacing={2}>
                        <label for='AnganwadiName'>Anganwadi Name</label>
                        <input className='input-Class' type='text' name='AnganwadiName' autoComplete='off'></input>
                        <label for='approvalCost'>Administrative Approval Cost</label>
                        <input className='' id='passwordInput' type='number' name='approvalCost'></input>
                        <label for='addFunds'>Additional Funds Required</label>
                        <input className='' id='passwordInput' type='number' name='addFunds'></input>
                        <label for='dateOfComm'>Date of Commencement of Anganwadi</label>
                        <input className='' type='date' name='dateOfComm'></input>
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
