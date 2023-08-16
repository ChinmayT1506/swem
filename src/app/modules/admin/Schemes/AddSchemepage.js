import React, { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { POST } from '../../../../services/api';
import { toast } from 'react-toastify';
import './AddSchemePage.scss'

export default function AddSchemeForm() {

    const [entry, setEntry] = useState({});

    const navigate = useNavigate();

    // post data
    async function handlesubmit(event) {
        event.preventDefault();
        const res = await POST("/officer/scheme", {
            "name": entry.schemeName,
            "cost": entry.approvalCost,
            "fund": entry.addFunds,
            "date": entry.dateOfComm,
        })
        console.log(res)
        if(res.data.success){
            toast.success(res?.data?.message)
            navigate(-1)
        }
        else if(!res.data.success){
            toast.error(res?.data?.message)
        }
        else{
            navigate(-1)
        }
    }

    function HandleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
    }

    return (
        <>
            <Grid className='AddScheme-Container'>
                <Stack className='AddSchemeBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
                        <h3>Add Scheme</h3>
                    </Box>
                    <form onSubmit={handlesubmit}>
                        <Stack className='form-main' spacing={2}>
                            <label for='schemeName'>Scheme Name</label>
                            <input onChange={HandleChange} className='input-Class' type='text' name='schemeName' autoComplete='off'></input>
                            <label for='approvalCost'>Administrative Approval Cost</label>
                            <input onChange={HandleChange} className='' id='passwordInput' type='number' name='approvalCost'></input>
                            <label for='addFunds'>Additional Funds Required</label>
                            <input onChange={HandleChange} className='' id='passwordInput' type='number' name='addFunds'></input>
                            <label for='dateOfComm'>Date of Commencement of Scheme</label>
                            <input onChange={HandleChange} className='' type='date' name='dateOfComm'></input>
                            <Grid className='submitForm'>
                                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                                <button type='submit'>Submit</button>
                            </Grid>
                        </Stack>
                    </form>
                </Stack >
            </Grid >
        </>
    );
}
