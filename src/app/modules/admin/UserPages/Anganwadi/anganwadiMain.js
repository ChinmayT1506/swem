import { Box, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv'
import BasicTable from '../../../../components/table/table';
import { useDispatch } from 'react-redux';
import { GET } from '../../../../../services/api';
import { toast } from 'react-toastify';
import './anganwadiMain.scss'

export const Anganwadi = () => {

    let [count, setCount] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let [anganwadiData, setanganwadiData] = useState([]);
    let [countOfData, setCountofData] = useState({});

    const [searchInput, setSearchInput] = useState({
        eventFilter: "all"
    });

    const [pagination, setPagination] = useState({
        pageNum: 1,
    })

    const [pageSize, setPageSize] = useState(10)

    const handlePaginationClick = (event) => {
        if (event.target.id === "prevPage") {
            if (pagination.pageNum > 1) {
                setPagination({
                    pageNum: pagination.pageNum - 1
                })
                setCount(count-=1)
            }
        }
        else if (event.target.id === "nextPage") {
            if (pagination.pageNum < countOfData.countOfPages) {
                setPagination({
                    pageNum: pagination.pageNum + 1
                })
                setCount(count+=1)
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
            setCount(countOfData.countOfData)
        }
    }
    console.log(pagination.pageNum)

    // Get data
    const getAnganwadiList = async () => {
        const res = await GET("officer/user",
            {
                searchKey: searchInput.eventFilter,
                searchValue: searchInput.searchInput,
                user_type: "ANGANWADI_WORKER",
                page: pagination.pageNum,
                size: pageSize,
            }
        )
        if (res.data.success) {
            setanganwadiData(res?.data?.result?.data)
            setCountofData({
                countOfPages: Math.ceil(res?.data?.result?.count / 10),
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
        getAnganwadiList()
    }, [anganwadiData]);

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
            setPageSize(event.target.value)
    }

    const tableHead = [
        "Name",
        "Mobile Number",
        "District",
        "Project",
        "Anganwadi Centre Name",
        "Anganwadi Centre Code",
        "Anganwadi Centre Address",
        "Action"
    ]

    return (
        <Grid className='Anganwadi-main'>
            <Stack className='Anganwadi-inner' spacing={2}>
                <Grid className='Anganwadi-inner-1'>
                    <h2>Anganwadi</h2>
                    <Grid className='Anganwadi-ButtonBox'>
                        <button><CSVLink className="link" data={anganwadiData} >Download</CSVLink></button>
                        <button onClick={() => navigate('addAnganwadi')}>Add Aanganwadi User</button>
                    </Grid>
                </Grid>
                <Grid className='Anganwadi-inner-2'>
                    <Box className='search'>
                        <input className='search-input' placeholder='Search' onChange={handleChangeSearch} name="searchInput" />
                        <FormControl fullWidth className="action">
                            <InputLabel id="filterlabel"> Filter</InputLabel>
                            <Select
                                labelId="filterlabel"
                                id="select"
                                name="eventFilter"
                                // value=""
                                label="All"
                                onChange={handleChangeSearch}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="district">District</MenuItem>
                                <MenuItem value="project">Project</MenuItem>
                                <MenuItem value="awc-name">AWC-name</MenuItem>
                                <MenuItem value="awc-code">AWC-code</MenuItem>
                                <MenuItem value="awc-address">AWC-address</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <BasicTable data={anganwadiData} tableHead={tableHead} tableName="anganwadi" />
                <Grid className="table-footer">
                    <p>Rows per page</p>
                    <select name="row-select" onChange={handleChangePageSize}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <p>
                        {pagination.pageNum + ((count * pageSize) - count)}-{pageSize * pagination.pageNum} of {countOfData.countOfData}
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
