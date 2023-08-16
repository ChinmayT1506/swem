import React, { useState } from 'react';
import './AddSchemePage.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { PUT } from '../../../../services/api';
import { toast } from 'react-toastify';

export default function EditSchemeForm() {
    
    const navigate = useNavigate();
    const location = useLocation()

    const [entry, setEntry] = useState(location.state.item);

    function HandleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await PUT(`officer/scheme?schemeId=${entry._id}`, {
            "name": entry.scheme_name,
            "cost": entry.aa_cost,
            "fund": entry.additional_funds_required,
            "date": entry.date_of_commencement,
        })
        console.log(res)
        if (res.data.success) {
            toast.success(res.data.message)
            navigate(-1)
        }
        else if (res.status === 401) {
            toast.error("Inavalid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else {
            toast.error(res.data.message)
        }
    }

    return (
        <>
            <Grid className='AddScheme-Container'>
                <Stack className='AddSchemeBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
                        <h3>Edit Scheme</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>
                            <label for='schemeName'>Scheme Name</label>
                            <input
                                value={entry.scheme_name}
                                className='input-Class'
                                type='text'
                                name='scheme_name'
                                onChange={HandleChange}
                                autoComplete='off'>
                            </input>
                            <label for='approvalCost'>Administrative Approval Cost</label>
                            <input
                                value={entry.aa_cost}
                                className=''
                                id='approvalCost'
                                type='number'
                                name='aa_cost'
                                onChange={HandleChange}
                            >
                            </input>
                            <label for='addFunds'>Additional Funds Required</label>
                            <input
                                value={entry.additional_funds_required}
                                className=''
                                id='additonal_funds_required'
                                type='number'
                                name='additional_funds_required'
                                onChange={HandleChange}
                            >
                            </input>
                            <label for='dateOfComm'>Date of Commencement of Scheme</label>
                            <input
                                value={entry.date_of_commencement.slice(0, 10)}
                                className=''
                                type='date'
                                name='date_of_commencement'
                                onChange={HandleChange}
                            >
                            </input>
                            <Grid className='submitForm'>
                                <button type='button' onClick={() => navigate(-1)}>Cancel</button>
                                <button type='submit'>Submit</button>
                            </Grid>
                        </Stack>
                    </form>
                </Stack >
            </Grid >
        </>
    );
}
