import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './hodMain.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {CSVLink} from 'react-csv'
import BasicTable from '../../../../components/table/table';

export const HOD = () => {
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
                // console.log(response.data.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    // Search Input Filter
    function handleChangeSearch(event) {
        setSearchInput(event.target.value);
    }
    if (searchInput) {
        data = data.filter((item) => {
            if (item.first_name.toLowerCase().includes(searchInput.toLowerCase())) {
                return item
            }
        })
    }

    const tableHead = [
        "Name",
        "Mobile Number",
        "Action"
    ]

    return (
        <Grid className='HOD-main'>
            <Stack className='HOD-inner' spacing={2}>
                <Grid className='HOD-inner-1'>
                    <h2>HOD</h2>
                    <Grid className='HOD-ButtonBox'>
                        <button><CSVLink className="link" data={data} >Download</CSVLink></button>
                        <button onClick={() => navigate('addHod')}>Add HOD</button>
                    </Grid>
                </Grid>
                <Grid className='HOD-inner-2'>
                    <Box className='search'>
                        <input className='search-input' placeholder='Search' onChange={handleChangeSearch} />
                        <FormControl fullWidth className="action">
                            <InputLabel id="filterlabel"> Filter</InputLabel>
                            <Select
                                labelId="filterlabel"
                                id="select"
                                // value=""
                                label="All"
                            // onChange={handleChange}
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Scheme-Name">Scheme-Name</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <BasicTable data={data} tableHead={tableHead} tableName="HOD"/>
            </Stack>
        </Grid>
    )
}
