import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './eventOccurence.scss'
import { useNavigate } from 'react-router-dom';
import BasicTable from '../../../components/table/table';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { toast } from 'react-toastify';
import { GET } from '../../../../services/api';

export const EventOccurance = () => {

    const navigate = useNavigate();
    let [eventOccurencedata, setEventOccurenceData] = useState([]);
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


    // Get data
    const getEventOccurenceList = async () => {
        const res = await GET("officer/conduction",
            {
                searchKey: searchInput.eventFilter,
                searchValue: searchInput.searchInput,
                page: pagination.pageNum,
                size: pageSize,
            }
        )
        if (res.data.success) {
            setEventOccurenceData(res?.data?.result?.data)
            setCountofData({
                countOfPages: Math.ceil(res?.data?.result?.count / pageSize),
                countOfData: res?.data?.result?.count,
            })
            console.log(res?.data?.result?.data)
        }
        else if (res.status === 401) {
            toast.error("Inavalid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else if (res.status === 400) {
            toast.error("Failed to Fetch Data")
        }
        else {
            toast.error(res.data.message)
        }
    }
    useEffect(() => {
        getEventOccurenceList()
    }, [eventOccurencedata]);

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
        console.log(pagination.pageNum)
        setPageSize(event.target.value)
        setPagination({
            pageNum: Math.ceil((pageSize / 10) * pagination.pageNum)
        })
        console.log(pagination.pageNum)
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
                        <input className='search-input' placeholder='Search' onChange={handleChangeSearch} name="searchInput" />
                        <FormControl fullWidth className="action">
                            <InputLabel id="filterlabel">Event Filter</InputLabel>
                            <Select
                                labelId="filterlabel"
                                id="select"
                                // value=""
                                name="eventFilter"
                                label="All"
                                onChange={handleChangeSearch}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="event_name">Event Name</MenuItem>
                                <MenuItem value="scheme">Asociate Scheme</MenuItem>
                                <MenuItem value="district">District</MenuItem>
                                <MenuItem value="block">Block</MenuItem>
                                <MenuItem value="awc_name">AWC Name</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <BasicTable data={eventOccurencedata} tableHead={tableHead} tableName="Event-Occurence" />
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
