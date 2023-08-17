import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './queryManagement.scss'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { useNavigate } from 'react-router-dom';
import BasicTable from '../../../components/table/table';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GET } from '../../../../services/api';

export const QueryManagement = () => {

    const USER = useSelector(state => state?.getLogindata?.loginData.user_type)
    const isAdmin = (USER === "HOD")

    let [count, setCount] = useState(0);

    const navigate = useNavigate();

    let [queryData, setQueryData] = useState([]);
    let [countOfData, setCountofData] = useState({});

    const [searchInput, setSearchInput] = useState({
        eventFilter: "all"
    });

    const [pagination, setPagination] = useState({
        pageNum: 1,
    })

    const [pageSize, setPageSize] = useState(10)

    console.log(pagination.pageNum)

    // Get data
    const getQueryList = async () => {
        const res = await GET("/user/query",
            {
                searchKey: searchInput.eventFilter,
                searchValue: searchInput.searchInput,
                page: pagination.pageNum,
                size: pageSize,
            }
        )
        if (res.data.success) {
            setQueryData(res?.data?.result?.data)
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
        getQueryList()
    }, [queryData]);

    function handleChangeSearch(event) {
        const { name, value } = event.target;
        setSearchInput(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const handleChangePageSize = (event) => {
        setPageSize(event.target.value);
    }

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

    let tableHead = [
        "Name",
        "Subject",
        "Message",
        "District",
        "Project",
        "Date",
        "Status",
        "Action",
    ]

    return (
        <Grid className='queryManagement-main'>
            <Stack className='queryManagement-inner' spacing={2}>
                <Grid className='queryManagement-inner-1'>
                    <h2>Query Management</h2>
                    {!isAdmin ? <button onClick={() => navigate('addQuery')}>Add Query</button>
                    : ""}
                </Grid>
                <Grid className='queryManagement-inner-2'>
                    <Box className='search'>
                        <input className='search-input' placeholder='Search' onChange={handleChangeSearch} name="searchInput"/>
                        <FormControl fullWidth className="action">
                            <InputLabel id="filterlabel">Filter</InputLabel>
                            <Select
                                labelId="filterlabel"
                                id="select"
                                name="eventFilter"
                                // value=""
                                label="All"
                                onChange={handleChangeSearch}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="subject">Subject</MenuItem>
                                <MenuItem value="message">Message</MenuItem>
                                <MenuItem value="district">District</MenuItem>
                                <MenuItem value="project">Project</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <BasicTable data={queryData} tableHead={tableHead} tableName="QueryManagement" />
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
                        <button><NavigateNextIcon id="nextPage" onClick={handlePaginationClick} /></button>
                        <button><SkipNextIcon id="skipLast" onClick={handlePaginationClick} /></button>
                    </Grid>
                </Grid>
            </Stack>

        </Grid>
    )
}
