import React from 'react';
import './addQuery.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import queryImage from '../../../../assets/images/loginBg.jpeg'

export default function ReplyQueryForm() {


    const isAdmin = true;

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
            <Grid className='AddQuery-Container'>
                <Stack className='AddQueryBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />

                        <h3>View Query</h3>
                    </Box>
                    <Stack className='form-main' spacing={2}>

                        <label for='subject'>Subject</label>
                        <input disabled="disabled" value="Not able to edit the Record of  any Anganwadi Centre" id='subject' type='text' name='subject' autoComplete='off'></input>

                        <label for='message'>Message</label>
                        <input disabled="disabled" id='message' type='textarea' name='message' value="When i open the record of Anganwadi Centre in edit mode by clicking on edit button, and after making changes in the reocrd like changing Phone Number or any other attribute or even without any change in record when i click on submit butto"></input>

                        <label for='referenceImage'>Reference Image</label>
                        <input id='confirmPassword' type='text' name='referenceImage' value='Upload Image: url of Image' disabled='disabled'></input>
                        <img className='queryImage' src={queryImage} alt="image hu mai"></img>
                        {isAdmin ?
                            <>
                                <label for='referenceImage'>Reply</label>
                                <textarea className="largeText" id='confirmPassword' rows="4" name='referenceImage'></textarea>
                                <Grid className='submitForm'>
                                    <button onClick={() => navigate(-1)}>Cancel</button>
                                    <button onClick={handlesubmit}>Submit</button>
                                </Grid>
                            </>
                            : ""}

                    </Stack>
                </Stack >
            </Grid >
        </>
    );
}