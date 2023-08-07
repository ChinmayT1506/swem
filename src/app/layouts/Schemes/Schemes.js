import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './schemes.scss'
import BasicTable from '../../components/table.jsx/table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Schemes = () => {
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
        "Date of Commencement",
        "Scheme Name",
        "AA Cost",
        "Additional Requirement",
        "Action"
    ]

    return (
        <Grid className='Schemes-main'>
            <Stack className='Schemes-inner' spacing={2}>
                <Grid className='Schemes-inner-1'>
                    <h2>Schemes</h2>
                    <button onClick={() => navigate('addScheme')}>Add Scheme</button>
                </Grid>
                <Grid className='Schemes-inner-2'>
                    <Box className='search'>
                        <input className='search-input' placeholder='Search' onChange={handleChangeSearch} />
                        <FormControl fullWidth className="action">
                            <InputLabel id="filterlabel">Scheme Filter</InputLabel>
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
                <BasicTable data={data} tableHead={tableHead} tableName="Schemes"/>
            </Stack>
        </Grid>
    )
}
