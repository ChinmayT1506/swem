import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './eventOccurence.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicTable from '../../../components/table/table';

export const EventOccurance = () => {

    const [searchInput, setSearchInput] = useState("");
    let [data, setData] = useState([]);
    const navigate = useNavigate();


    // Get data
    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get(
                    "https://reqres.in/api/users?page=2"
                );
                setData(response.data.data);
                console.log(response.data.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    // Search Input Filter
    function handleChangeSearch(event) {
        setSearchInput(event.target.value);
    }
    if(searchInput){
        data = data.filter((item) => {
            if (item.first_name.toLowerCase().includes(searchInput.toLowerCase())) {
                return item
            }
        })
    }

    let tableHead = [
        "Date",
        "Event Name",
        "Associate Scheme",
        "District",
        "Block",
        "AWC Name",
        "Participants",
        "Details of Event",
    ]

    return (
        <Grid className='Event-Occurence-main'>
            <Stack className='Event-Occurence-inner' spacing={2}>
                <Grid className='Event-Occurence-inner-1'>
                    <h2>Event-Occurence</h2>
                </Grid>
                <Grid className='Event-Occurence-inner-2'>
                    <Box className='search'>
                        <input className='search-input' placeholder='Search' onChange={handleChangeSearch} />
                        <FormControl fullWidth className="action">
                            <InputLabel id="filterlabel">Event Filter</InputLabel>
                            <Select
                                labelId="filterlabel"
                                id="select"
                                // value=""
                                label="All"
                            // onChange={handleChange}
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Event-Name">Event-Name</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <BasicTable data={data} tableHead={tableHead} tableName="Event-Occurence" />
            </Stack>

        </Grid>
    )
}
