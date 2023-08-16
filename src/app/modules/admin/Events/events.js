import React, { useEffect, useState } from 'react'
import BasicTable from '../../../components/table/table';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { GET } from '../../../../services/api';
import { getEventData } from '../../../redux/actions/eventAction';
import { useDispatch, useSelector } from 'react-redux';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { toast } from 'react-toastify';
import './events.scss'

export const Events = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const storedData = useSelector(state => state.getEventdata.EventDataArr)

    const [searchInput, setSearchInput] = useState({
        eventFilter: "all"
    });
    let [Eventdata, setEventData] = useState([]);

    function handleChangeSearch(event) {
        const { name, value } = event.target;
        setSearchInput(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
        console.log(searchInput)
    }

    // Get Data
    const getEvents = async () => {
        if (!searchInput.searchInput) {
            const res = await GET("/officer/event",
                {
                    searchKey: searchInput.eventFilter,
                    searchValue: searchInput.searchInput,
                    page: 1,
                    size: 10,
                    // sort: "name",
                    // sortOrder: "ASC"
                }
            )
            if (res.data.success) {
                setEventData(res?.data?.result?.data)
                dispatch(getEventData(res?.data?.result))
            }
            else if (res.status === 401) {
                toast.error("Inavlid User token")
                localStorage.removeItem("ACCESS_TOKEN")
                setTimeout(() => {
                    navigate("/")
                }, 1500);
            }
        }
        else {
            const res = await GET(`/officer/event?searchKey=${searchInput.eventFilter}&searchValue=${searchInput.searchInput}&page=1&size=10&sort=name&sortOrder=ASC`)
            if (res.data.success) {
                setEventData(res?.data?.result?.data)
            }
        }
    }
    useEffect(() => {
        getEvents()
    }, [Eventdata]);

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
                        <input className='search-input' placeholder='Search' onChange={handleChangeSearch} name="searchInput" />
                        <FormControl fullWidth className="action">
                            <InputLabel id="filterlabel">Event Filter</InputLabel>
                            <Select
                                labelId="filterlabel"
                                id="select"
                                // value=""
                                label="All"
                                name="eventFilter"
                                onChange={handleChangeSearch}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="event_name">Event Name</MenuItem>
                                <MenuItem value="event_code">Event Code</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <BasicTable data={Eventdata ?? []} tableHead={tableHead} tableName="event" />
                <Grid className="table-footer">
                    <p>Rows per page</p>
                    <select name="row-select">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <p>
                        1-{storedData.count} of {storedData.count}
                    </p>
                    <Grid className='pagination'>
                        <p><SkipPreviousIcon /></p>
                        <p><NavigateBeforeIcon /></p>
                        <p><NavigateNextIcon /></p>
                        <p><SkipNextIcon /></p>
                    </Grid>
                </Grid>
            </Stack>
        </Grid>
    )
}
