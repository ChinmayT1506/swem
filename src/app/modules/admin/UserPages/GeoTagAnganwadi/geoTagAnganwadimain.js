import React, { useEffect, useState } from 'react'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { CSVLink } from 'react-csv';
import BasicTable from '../../../../components/table/table';
import Modal from '@mui/material/Modal';
import { BasicMarkedMap } from '../../../../components/Maps/MarkedMap';
import { GET, PUT } from '../../../../../services/api';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import './geoTagAnganwadiMain.scss'

export const GeoTagAnganwadi = () => {

    const location = useLocation();
    const geoTagEntry = location?.state?.item
    // console.log(geoTagEntry);

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

    let [count, setCount] = useState(0);
    const navigate = useNavigate();

    let [geoTagdata, setGeoTagData] = useState([]);
    let [countOfData, setCountofData] = useState({});

    const [searchInput, setSearchInput] = useState({
        eventFilter: "all"
    });

    const [pagination, setPagination] = useState({
        pageNum: 1,
    })

    const [pageSize, setPageSize] = useState(10)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Get data
    const getAnganwadiList = async () => {
        const res = await GET("officer/user/location",
            {
                searchKey: searchInput.eventFilter,
                searchValue: searchInput.searchInput,
                page: pagination.pageNum,
                size: pageSize,
            }
        )
        if (res.data.success) {
            setGeoTagData(res?.data?.result?.data)
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
        getAnganwadiList()
    }, [geoTagdata]);

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

    const approvalReq = async (event) => {
        const res = await PUT(`/officer/user/location?userId=${geoTagEntry._id}`, {
            status: event.target.id
        })
        console.log(res)
        if (res?.data?.success) {
            toast.success(res?.data?.message)
            setOpen(false)
        }
        else if (res?.status === 401) {
            toast.error("Inavalid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else {
            toast.error(res?.data?.message)
        }
        console.log(res)
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

    return (
        <>
            <Grid className='GeoTagAnganwadi-main'>
                <Stack className='GeoTagAnganwadi-inner' spacing={2}>
                    <Grid className='GeoTagAnganwadi-inner-1'>
                        <h2>Geo Tag Anganwadi</h2>
                        <button><CSVLink className="link" data={geoTagdata} >Download</CSVLink></button>
                    </Grid>
                    <Grid className='GeoTagAnganwadi-inner-2'>
                        <Box className='search'>
                            <input className='search-input' placeholder='Search' onChange={handleChangeSearch} name="searchInput" />
                            <FormControl fullWidth className="action">
                                <InputLabel id="filterlabel">Scheme Filter</InputLabel>
                                <Select
                                    labelId="filterlabel"
                                    id="select"
                                    name="eventFilter"
                                    // value=""
                                    label="All"
                                    onChange={handleChangeSearch}
                                >
                                    <MenuItem value="All">All</MenuItem>
                                    <MenuItem value="Scheme-Name">Scheme-Name</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <BasicTable data={geoTagdata ?? []} tableHead={tableHead} tableName="GeoTagAnganwadi" handleOpen={handleOpen} />
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
            <Modal
                className='Modal'
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    geoTagEntry?.latitude || geoTagEntry?.longitude ?
                        <Box sx={style}>
                            <BasicMarkedMap lat={geoTagEntry?.latitude ?? ""} long={geoTagEntry?.longitude ?? ""} />
                            <Grid className='submitForm'>
                                <button id="APPROVED" onClick={approvalReq}>Approve</button>
                                <button id="REJECTED" onClick={approvalReq}>Reject</button>
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
