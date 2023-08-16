import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './geoTagAnganwadiMain.scss'
import axios from 'axios';
import { CSVLink } from 'react-csv';
import BasicTable from '../../../../components/table/table';
import Modal from '@mui/material/Modal';
import { BasicMarkedMap } from '../../../../components/Maps/MarkedMap';

export const GeoTagAnganwadi = () => {

    const style = {
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        height: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '60%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 50,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const [searchInput, setSearchInput] = useState("");
    let [data, setData] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        "District",
        "Project",
        "Anganwadi Centre Name",
        "Anganwadi Centre Code",
        "Anganwadi Centre Address",
        "Longitude",
        "Latitude",
        "Updated By",
        "Status",
        "Action"
    ]

    return (
        <>
            <Grid className='GeoTagAnganwadi-main'>
                <Stack className='GeoTagAnganwadi-inner' spacing={2}>
                    <Grid className='GeoTagAnganwadi-inner-1'>
                        <h2>Geo Tag Anganwadi</h2>
                        <button><CSVLink className="link" data={data} >Download</CSVLink></button>
                    </Grid>
                    <Grid className='GeoTagAnganwadi-inner-2'>
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
                    <BasicTable data={data} tableHead={tableHead} tableName="GeoTagAnganwadi" handleOpen={handleOpen} />
                </Stack>
            </Grid>
            <Modal
                className='Modal'
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    data ?
                        <Box sx={style}>
                            <BasicMarkedMap lat={28.6081} long={77.3723} />
                            <Grid className='submitForm'>
                                <button>Approve</button>
                                <button>Reject</button>
                            </Grid>
                        </Box> :
                        <Box sx={style2}>
                            <h5>No Data Found</h5>
                        </Box>
                }
            </Modal>
        </>
    )
}
