import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './events.scss'
import axios from 'axios';
import BasicTable from '../../components/table.jsx/table';
import { useNavigate } from 'react-router-dom';

export const Events = () => {

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
        "Event Name",
        "Event Code",
        "Associate Scheme",
        "Show Event Conduction",
        "Action",
    ]

    return (
        <Grid className='Events-main'>
            <Stack className='Events-inner' spacing={2}>
                <Grid className='Events-inner-1'>
                    <h2>Events</h2>
                    <button onClick={() => navigate('addEvent')}>Add Event</button>
                </Grid>
                <Grid className='Events-inner-2'>
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
                <BasicTable data={data} tableHead={tableHead} tableName="Events" />
            </Stack>

        </Grid>
    )
}
