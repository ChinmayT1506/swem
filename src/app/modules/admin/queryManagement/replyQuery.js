import React, { useState } from 'react';
import './addQuery.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import queryImage from '../../../../assets/images/loginBg.jpeg'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { PATCH } from '../../../../services/api';

export default function ReplyQueryForm() {

    const USER = useSelector(state => state?.getLogindata?.loginData.user_type)
    const isAdmin = (USER === "HOD")

    const location = useLocation()
    const user = (location.state.item)
    console.log(location.state.item)

    const navigate = useNavigate();

    const [entry, setEntry] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
    }

    // patch data
    async function handleSubmit(event) {
        event.preventDefault();
        const res = await PATCH(`/hod/query?queryId=${user._id}`, {
            reply: entry.reply
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

                        <h3>View Query</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>

                            <label for='subject'>Subject</label>
                            <input disabled="disabled" value={user.subject} id='subject' type='text' name='subject' autoComplete='off'></input>

                            <label for='message'>Message</label>
                            <input disabled="disabled" id='message' type='textarea' name='message' value={user.message}></input>

                            <label for='referenceImage'>Reference Image</label>
                            <input id='confirmPassword' type='text' name='referenceImage' value={user.image} disabled='disabled'></input>
                            <img className='queryImage' src={user.image} alt={user.image}></img>
                            {isAdmin ?
                                <>
                                    <label for='reply'>Reply</label>
                                    {user.status === "COMPLETED" ?
                                        <textarea onChange={handleChange} className="largeText" id='confirmPassword' rows="4" name='reply' value={user.reply}></textarea>
                                        :
                                        <textarea onChange={handleChange} className="largeText" id='confirmPassword' rows="4" name='reply'></textarea>
                                    }
                                    <Grid className='submitForm'>
                                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                                        <button type="submit">Submit</button>
                                    </Grid>
                                </>
                                :
                                <>
                                    <label for='reply'>Reply</label>
                                    <textarea disabled="disabled" className="largeText" id='confirmPassword' rows="4" name='reply' value={user.reply}></textarea>
                                </>
                            }
                        </Stack>
                    </form>
                </Stack >
            </Grid >
        </>
    );
}