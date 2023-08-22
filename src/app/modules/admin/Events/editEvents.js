import React, { useState } from 'react';
import './addEvent.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { PUT } from '../../../../services/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function EditEventForm() {

    const navigate = useNavigate();
    const location = useLocation()

    const scheme_List = useSelector(state => state.getSchemedata.schemeDataArr.data)

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
            "code": entry.event_code,

        })
        console.log(res)
        if (res?.data?.success) {
            toast.success(res.data.message)
            navigate(-1)
        }
        else if (res?.status === 401) {
            toast.error("Inavalid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else {
            toast.error(res?.data?.message)
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
                            <label for='related_scheme'>Related Scheme</label>
                            <select
                                labelId="associateSchemeIdlabel"
                                id="select"
                                name='scheme_id'
                                value={entry.schemeId}
                                label=""
                                onChange={HandleChange}
                            >
                                <option value="none" selected disabled hidden>{entry.schemeId}</option>
                                {scheme_List.map(item => (
                                    <option value={item._id}>{item.scheme_name}</option>
                                ))}
                            </select>

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
