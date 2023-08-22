import React, { useEffect, useState } from 'react'
import './table.scss'
import { Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DELETE } from '../../../services/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';

function BasicTable({ data, tableHead, tableName, handleOpen }) {

    const USER = useSelector(state => state?.getLogindata?.loginData.user_type)
    const isAdmin = (USER === "HOD")

    function DeleteItemFunc(item, tableName) {
        const res = DELETE(`/officer/${tableName}?${tableName}Id=${item}`)
        console.log(res);
        toast.success(`${tableName} deleted`)
    }

    const navigate = useNavigate();

    const nthData = data[0] ?? ''
    // console.log("obj is ", Object?.keys(nthData));
    const tableHeader = Object?.keys(nthData);
    // console.log(tableHeader)


    return (
        <>
            <Grid className="table-container">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    tableHead?.map((item, index) => (
                                        <th>{item}</th>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                // data?.map((item, index) => (
                                //     <TableRow key={index}>
                                //         {Object.values(item).map((item, index) => {
                                //             return <TableCell>{item}</TableCell>
                                //         })}
                                //     </TableRow>
                                // ))
                                (tableName === "scheme" ?
                                    data?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.date_of_commencement.slice(0, 10)}</TableCell>
                                            <TableCell>{item.scheme_name}</TableCell>
                                            <TableCell>{item.aa_cost}</TableCell>
                                            <TableCell>{item.additional_funds_required}</TableCell>
                                            <TableCell style={{ cursor: 'pointer' }}>
                                                <EditIcon onClick={() => navigate("editScheme", { state: { item } })} />
                                                <DeleteIcon onClick={() => DeleteItemFunc(item._id, tableName)} />
                                            </TableCell>
                                        </TableRow>
                                    )) : (tableName === "event" ?
                                        data?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.event_name}</TableCell>
                                                <TableCell>{item.event_code}</TableCell>
                                                <TableCell>{item.scheme}</TableCell>
                                                <TableCell><button onClick={() => navigate("/event-occurence")}>Show Occurences</button></TableCell>
                                                <TableCell style={{ cursor: 'pointer' }}>
                                                    <EditIcon onClick={() => navigate("editEvent", { state: { item } })} />
                                                    <DeleteIcon onClick={() => DeleteItemFunc(item._id, tableName)} />
                                                </TableCell>
                                            </TableRow>
                                        )) : (tableName === "anganwadi" ?
                                            data?.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.mobile}</TableCell>
                                                    <TableCell>{item.district}</TableCell>
                                                    <TableCell>{item.block}</TableCell>
                                                    <TableCell>{item.awc_name}</TableCell>
                                                    <TableCell>{item.awc_code}</TableCell>
                                                    <TableCell>{item.awc_address}</TableCell>
                                                    <TableCell style={{ cursor: 'pointer' }}>
                                                        <EditIcon onClick={() => navigate("editAnganwadi", { state: { item } })} />
                                                        <DeleteIcon onClick={() => DeleteItemFunc(item._id, tableName = "user")} />
                                                    </TableCell>
                                                </TableRow>
                                            )) : (
                                                tableName === "hod" ?
                                                    (data?.length >= 1 ?
                                                        data?.map((item) => (
                                                            <TableRow>
                                                                <TableCell>{item.name}</TableCell>
                                                                <TableCell>{item.mobile}</TableCell>
                                                                <TableCell style={{ cursor: 'pointer' }}>
                                                                    <EditIcon onClick={() => navigate("editHod", { state: { item } })} />
                                                                    {isAdmin ?
                                                                        <DeleteIcon onClick={() => DeleteItemFunc(item._id, tableName = "user")} />
                                                                        : ""
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        )) : "")
                                                    : (tableName === "CDPO" ?
                                                        data?.map((item, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{item.name}</TableCell>
                                                                <TableCell>{item.mobile}</TableCell>
                                                                <TableCell>{item.district}</TableCell>
                                                                <TableCell>{item.block}</TableCell>
                                                                <TableCell style={{ cursor: 'pointer' }}>
                                                                    <EditIcon onClick={() => navigate("editCdpo", { state: { item } })} />
                                                                    <DeleteIcon onClick={() => DeleteItemFunc(item._id, tableName = "user")} />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                        : (tableName === "DPO") ?
                                                            data?.map((item, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell>{item.name}</TableCell>
                                                                    <TableCell>{item.mobile}</TableCell>
                                                                    <TableCell>{item.district}</TableCell>
                                                                    <TableCell style={{ cursor: 'pointer' }}>
                                                                        <EditIcon onClick={() => navigate("editDpo", { state: { item } })} />
                                                                        <DeleteIcon onClick={() => DeleteItemFunc(item._id, tableName = "user")} />
                                                                    </TableCell>
                                                                </TableRow>
                                                            )) : (tableName === "GeoTagAnganwadi") ?
                                                                data?.map((item, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell>{item.name}</TableCell>
                                                                        <TableCell>{item.mobile}</TableCell>
                                                                        <TableCell>{item.district}</TableCell>
                                                                        <TableCell>{item.block}</TableCell>
                                                                        <TableCell>{item.awc_name}</TableCell>
                                                                        <TableCell>{item.awc_code}</TableCell>
                                                                        <TableCell>{item.awc_address}</TableCell>
                                                                        <TableCell>{item.longitude}</TableCell>
                                                                        <TableCell>{item.latitude}</TableCell>
                                                                        <TableCell>{item.updated_by}</TableCell>
                                                                        <TableCell>{item.status}</TableCell>
                                                                        <TableCell style={{ cursor: 'pointer' }}>
                                                                            <span onClick={() => navigate("/users/geoTagAnganwadi", { state: { item } })}>
                                                                                <button onClick={handleOpen}>Show on Map</button>
                                                                            </span>
                                                                            <EditIcon onClick={() => navigate("editGeoTagAnganwadi", { state: { item, click: true } })} />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )) : (tableName === "Event-Occurence") ?
                                                                    data?.map((item, index) => (
                                                                        <TableRow key={index}>
                                                                            <TableCell>{item.createdAt.slice(0,10)}</TableCell>
                                                                            <TableCell>{item.event_name}</TableCell>
                                                                            <TableCell>{item.scheme}</TableCell>
                                                                            <TableCell>{item.district}</TableCell>
                                                                            <TableCell>{item.block}</TableCell>
                                                                            <TableCell>{item.awc_name}</TableCell>
                                                                            <TableCell>{item.participants}</TableCell>
                                                                            <TableCell style={{ cursor: 'pointer' }}>
                                                                                <button onClick={() => navigate("/show-event-occurence", { state: { item, lat: 28.6081, long: 77.3723 } })}>Show</button>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )) :
                                                                    (tableName = "QueryManagement") ?
                                                                        data?.map((item, index) => (
                                                                            <TableRow key={index}>
                                                                                <TableCell>{item.createdBy}</TableCell>
                                                                                <TableCell>{item.subject}</TableCell>
                                                                                <TableCell>{item.message}</TableCell>
                                                                                <TableCell>{item.district}</TableCell>
                                                                                <TableCell>{item.block}</TableCell>
                                                                                <TableCell>{item.createdAt.slice(0, 10)}</TableCell>
                                                                                <TableCell>{item.status}</TableCell>
                                                                                {
                                                                                    isAdmin ?
                                                                                        <TableCell onClick={() => navigate("/query/replyQuery", { state: { item } })}><ReplyIcon sx={{ cursor: 'pointer' }} /></TableCell>
                                                                                        : <TableCell onClick={() => navigate("/query/replyQuery", { state: { item } })}><VisibilityIcon sx={{ cursor: 'pointer' }} /></TableCell>
                                                                                }
                                                                            </TableRow>
                                                                        )) : ""
                                                    )
                                            ))
                                    )
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid >
        </>
    )
}

export default BasicTable



