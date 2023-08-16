import React, { useState } from 'react';
import './addEvent.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { PUT } from '../../../../services/api';
import { toast } from 'react-toastify';

export default function EditEventForm() {

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
        const res = await PUT(`officer/event?eventId=${entry._id}`, {
            "name": entry.event_name,
            "code": entry.event_code
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
            <Grid className='AddEvent-Container'>
                <Stack className='AddEventBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />

                        <h3>Edit Event</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>
                            <label for='EventName'>Event Name</label>
                            <input
                                className='input-Class'
                                type='text'
                                value={entry.event_name}
                                name='event_name'
                                autoComplete='off'
                                onChange={HandleChange}
                            >
                            </input>
                            <label for='event_code'>Event Code</label>
                            <input
                                value={entry.event_code}
                                className=''
                                id='event_code'
                                type='text'
                                name='event_code'
                                onChange={HandleChange}
                            >
                            </input>
                            <label for='related_scheme'>Date of Commencement of Event</label>
                            <input
                                className=''
                                type='date'
                                name='related_scheme'
                                value={entry.createdAt.slice(0, 10)}
                                onChange={HandleChange}
                            >
                            </input>
                            <Grid className='submitForm'>
                                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                                <button type="submit">Submit</button>
                            </Grid>
                        </Stack>
                    </form>
                </Stack >
            </Grid >
        </>
    );
}
