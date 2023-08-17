import React, { useState } from 'react';
import './addQuery.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { POST } from '../../../../services/api';
import { toast } from 'react-toastify';
import image1 from '../../../../assets/images/ashokaEmb.png'

export default function AddQueryForm() {

    const [entry, setEntry] = useState({});

    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
    }

    // post data
    async function handleSubmit(event) {
        event.preventDefault();
        const res = await POST("/user/query", {
            subject: entry.subject,
            message: entry.message,
            image: 'https://picsum.photos/id/237/200/300'
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
            <Grid className='AddQuery-Container'>
                <Stack className='AddQueryBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
                        <h3>Add Query</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>

                            <label for='subject'>Subject</label>
                            <input onChange={handleChange} id='subject' type='text' name='subject' autoComplete='off'></input>

                            <label for='message'>Message</label>
                            <input onChange={handleChange} id='message' type='textarea' name='message'></input>

                            <label for='referenceImage'>Reference Image</label>
                            <input id='' type='text' value='Upload Image' disabled='disabled'></input>
                            <input value="" name="refImage" onChange={handleChange} id='' type='file' placeholder='Upload Image'></input>

                            <Grid className='submitForm'>
                                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                                <button type="submit" >Submit</button>
                            </Grid>
                        </Stack>
                    </form >
                </Stack >
            </Grid >
        </>
    );
}