import React, { useEffect, useState } from 'react'
import BasicTable from '../../../components/table/table';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { GET } from '../../../../services/api';
import { getEventData } from '../../../redux/actions/eventAction';
import { useDispatch } from 'react-redux';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { toast } from 'react-toastify';
import './events.scss'

export const Events = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let [Eventdata, setEventData] = useState([]);
    let [count, setCount] = useState(0);
    let [countOfData, setCountofData] = useState({});
    const [pageSize, setPageSize] = useState(10)

    const [searchInput, setSearchInput] = useState({
        eventFilter: "all"
    });
    const [pagination, setPagination] = useState({
        pageNum: 1,
    })


    const handlePaginationClick = (event) => {
        if (event.target.id === "prevPage") {
            if (pagination.pageNum > 1) {
                setPagination({
                    pageNum: pagination.pageNum - 1
                })
                setCount(count -= 1)
            }
        }
        else if (event.target.id === "nextPage") {
            if (pagination.pageNum < countOfData.countOfPages) {
                setPagination({
                    pageNum: pagination.pageNum + 1
                })
                setCount(count += 1)
            }
        } else if (event.target.id === "skipFirst") {
            setPagination({
                pageNum: 1
            })
            setCount(0)
        }
        else if (event.target.id === "skipLast") {
            setPagination({
                pageNum: countOfData.countOfPages
            })
            setCount(countOfData.countOfPages - 1)
        }
    }

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

    const handleChangePageSize = (event) => {
        setPageSize(event.target.value)
    }

    // Get Data
    const getEvents = async () => {
        const res = await GET("/officer/event",
            {
                searchKey: searchInput.eventFilter,
                searchValue: searchInput.searchInput,
                page: 1,
                size: 10,
                page: pagination.pageNum,
                size: pageSize,
            }
        )
        if (res?.data?.success) {
            setEventData(res?.data?.result?.data)
            setCountofData({
                countOfPages: Math.ceil(res?.data?.result?.count / pageSize),
                countOfData: res?.data?.result?.count,
            })
            dispatch(getEventData(res?.data?.result))
        }
        else if (res?.status === 401) {
            toast.error("Inavlid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else if (res?.status === 400) {
            toast.error("Failed to Fetch Data")
        }
        else {
            toast.error(res?.data?.message)
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
                    <select name="row-select" onChange={handleChangePageSize}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <p>
                        {pagination.pageNum + ((count * pageSize) - count)} - {(countOfData.countOfData < pageSize * pagination.pageNum) ? countOfData.countOfData : (pageSize * pagination.pageNum)} of {countOfData.countOfData}
                    </p>
                    <Grid className='pagination'>
                        <button><SkipPreviousIcon id="skipFirst" onClick={handlePaginationClick} /></button>
                        <button><NavigateBeforeIcon id="prevPage" onClick={handlePaginationClick} /></button>
                        <button><NavigateNextIcon id="nextPage" onClick={handlePaginationClick} name="skipToLast" /></button>
                        <button><SkipNextIcon id="skipLast" onClick={handlePaginationClick} /></button>
                    </Grid>
                </Grid>
            </Stack>
        </Grid>
    )
}
