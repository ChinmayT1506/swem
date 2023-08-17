import React, { useEffect, useState } from 'react'
import BasicTable from '../../../components/table/table';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { GET } from '../../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { getSchemeData } from '../../../redux/actions/schemeAction';
import { toast } from 'react-toastify';
import './schemes.scss'

export const Schemes = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [count, setCount] = useState(0);

    const [Schemedata, setSchemeData] = useState([]);
    let [countOfData, setCountofData] = useState({});
    const [searchInput, setSearchInput] = useState({
        schemeFilter: "all"
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

    const handleChangePageSize = (event) => {
        setPageSize(event.target.value)
    }

    // Search Input Filter
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
    const getSchemes = async () => {
        const res = await GET("/officer/scheme", {
            searchKey: searchInput.schemeFilter,
            searchValue: searchInput.searchInput,
            page: pagination.pageNum,
            size: pageSize,
            sort: "name",
            sortOrder: "ASC"
        })
        if (res.data.success) {
            setSchemeData(res?.data?.result?.data);
            setCountofData({
                countOfPages: Math.ceil(res?.data?.result?.count / pageSize),
                countOfData: res?.data?.result?.count,
            })
            dispatch(getSchemeData(res?.data?.result))
        }
        else if (res.status === 401) {
            toast.error("Inavlid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
    }
    useEffect(() => {
        getSchemes()
    }, [Schemedata]);

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
                        <input className='search-input' placeholder='Search' onChange={handleChangeSearch} name="searchInput" />
                        <FormControl fullWidth className="action">
                            <InputLabel id="filterlabel">Scheme Filter</InputLabel>
                            <Select
                                labelId="filterlabel"
                                id="select"
                                name="schemeFilter"
                                onChange={handleChangeSearch}
                            >
                                <MenuItem value="all" >All</MenuItem>
                                <MenuItem value="scheme_name">Scheme-Name</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <BasicTable data={Schemedata ?? []} tableHead={tableHead} tableName="scheme" />
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
