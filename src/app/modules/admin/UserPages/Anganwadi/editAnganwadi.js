import React from 'react';
import './addAnganwadi.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditAnganwadiForm() {

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
            <Grid className='AddAnganwadi-Container'>
                <Stack className='AddAnganwadiBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <h3>Edit Anganwadi</h3>
                    </Box>
                    <Stack className='form-main' spacing={2}>

                        <label for='AnganwadiName'>Name</label>
                        <input type='text' name='AnganwadiName' autoComplete='off'></input>

                        <label for='approvalCost'>Mobile Number</label>
                        <input className='' id='passwordInput' type='number' name='approvalCost'></input>

                        <label for='district'>District</label>
                        <input type='text' name='district' autoComplete='off'></input>

                        <label for='project'>Project</label>
                        <input className='' id='project' type='text' name='project'></input>

                        <label for='sector'>Sector</label>
                        <input className='' id='sector' type='number' name='sector'></input>

                        <label for='anganwadiCentre'>Anganwadi Centre Name</label>
                        <input className='' type='text' name='anganwadiCentre'></input>

                        <label for='anganwadiCentreCode'>Anganwadi Centre Code</label>
                        <input className='' id='anganwadiCentreCode' type='text' name='anganwadiCentreCode'></input>
                        
                        <label for='anganwadiCentreCode'>Anganwadi Centre Editress</label>
                        <input className='' id='anganwadiCentreCode' type='textarea' rows="3" name='anganwadiCentreCode'></input>

                        <label for='password'>Password</label>
                        <input className='' id='password' type='Password' name='password'></input>

                        <label for='confirmPassword'>Confirm Password</label>
                        <input className='confirmPassword' id='confirmPassword' type='password' name='confirmPassword'></input>

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