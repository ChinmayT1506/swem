import React, { useState } from 'react';
import './addEvent.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// import { useFormik } from "formik";
// import * as yup from "yup";
import { POST } from '../../../../services/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function AddEventForm() {

    const navigate = useNavigate();
    const [entry, setEntry] = useState({});

    const scheme_List = useSelector(state => state.getSchemedata.schemeDataArr.data)

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
    }

    // post event data
    async function handleSubmit(event) {
        event.preventDefault();
        const res = await POST("/officer/event", {
            name: entry.EventName,
            code: entry.EventCode,
            schemeId: entry.associateScheme
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
                        <h3>Add Event</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>
                            <label htmlFor='EventName'>Event Name</label>
                            <input onChange={handleChange} className='' type='text' name='EventName' autoComplete='off'></input>
                            <label htmlFor='EventCode'>Event Code</label>
                            <input onChange={handleChange} className='' id='EventCode' type='text' name='EventCode'></input>
                            <label htmlFor='associateScheme'>Associate Scheme</label>
                            <select
                                labelId="associateSchemeIdlabel"
                                id="select"
                                name='associateScheme'
                                label=""
                                onChange={handleChange}
                            >
                                <option value="none" selected disabled hidden>Select a Scheme</option>
                                {scheme_List.map(item => (
                                    <option value={item._id}>{item.scheme_name}</option>
                                ))}
                            </select>
                            <Grid className='submitForm'>
                                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                                <button type="submit"
                                >Submit</button>
                            </Grid>
                        </Stack>
                    </form>
                </Stack >
            </Grid >
        </>
    );
}
