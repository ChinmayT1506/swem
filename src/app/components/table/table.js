import React, { useEffect, useState } from 'react'
import './table.scss'
import { Box, Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import VisibilityIcon from '@mui/icons-material/Visibility';

function BasicTable({ data, tableHead, tableName, handleOpen }) {

    const isAdmin = true;

    const navigate = useNavigate();

    const nthData = data[0] ?? ''
    // console.log("obj is ", Object?.keys(nthData));
    const tableHeader = Object?.keys(nthData);

    return (
        <>
            <Grid className="table-container">
                <table>
                    <thead>
                        <tr>
                            {
                                tableHead?.map((item, index) => (
                                    <th>{item}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // data.map((item, index) => (
                            //     <tr key={index}>
                            //         {Object.values(item).map((item, index) => {
                            //             return <td>{item}</td>
                            //         })}
                            //     </tr>
                            // ))
                            (tableName === "Schemes" ?
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.first_name}</td>
                                        <td>scheme</td>
                                        <td>12</td>
                                        <td>10</td>
                                        <td style={{ cursor: 'pointer' }}>
                                            <EditIcon onClick={() => navigate("editScheme")} />
                                            <DeleteIcon />
                                        </td>
                                    </tr>
                                )) : (tableName === "Events" ?
                                    data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.first_name}</td>
                                            <td>CHSND</td>
                                            <td>Poshan Abhiyan</td>
                                            <td><button onClick={() => navigate("/event-occurence")}>Show Occurences</button></td>
                                            <td style={{ cursor: 'pointer' }}>
                                                <EditIcon onClick={() => navigate("editEvent")} />
                                                <DeleteIcon />
                                            </td>
                                        </tr>
                                    )) : (tableName === "Anganwadi" ?
                                        data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.first_name}</td>
                                                <td>CHSND</td>
                                                <td>Poshan Abhiyan</td>
                                                <td>Poshan Abhiyan</td>
                                                <td>Poshan Abhiyan</td>
                                                <td>Poshan Abhiyan</td>
                                                <td>Show</td>
                                                <td style={{ cursor: 'pointer' }}>
                                                    <EditIcon onClick={() => navigate("editAnganwadi")} />
                                                    <DeleteIcon />
                                                </td>
                                            </tr>
                                        )) : (tableName === "HOD" ?
                                            data.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.first_name}</td>
                                                    <td>8393939939</td>
                                                    <td style={{ cursor: 'pointer' }}>
                                                        <EditIcon onClick={() => navigate("editHod")} />
                                                        <DeleteIcon />
                                                    </td>
                                                </tr>
                                            )) : (tableName === "CDPO" ?
                                                data.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.first_name}</td>
                                                        <td>8393939939</td>
                                                        <td>Baramullah</td>
                                                        <td>Pattan</td>
                                                        <td style={{ cursor: 'pointer' }}>
                                                            <EditIcon onClick={() => navigate("editCdpo")} />
                                                            <DeleteIcon />
                                                        </td>
                                                    </tr>
                                                )) : (tableName === "DPO") ?
                                                    data.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.first_name}</td>
                                                            <td>8393939939</td>
                                                            <td>Baram</td>
                                                            <td style={{ cursor: 'pointer' }}>
                                                                <EditIcon onClick={() => navigate("editDpo")} />
                                                                <DeleteIcon />
                                                            </td>
                                                        </tr>
                                                    )) : (tableName === "GeoTagAnganwadi") ?
                                                        data.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.first_name}</td>
                                                                <td>8393939939</td>
                                                                <td>Baram</td>
                                                                <td>Baram</td>
                                                                <td>Baram</td>
                                                                <td>HDGHG</td>
                                                                <td>Baram</td>
                                                                <td>94.4533</td>
                                                                <td>79.8833</td>
                                                                <td>HOD</td>
                                                                <td>Pending</td>
                                                                <td style={{ cursor: 'pointer' }}>
                                                                    <button onClick={handleOpen}>Show on Map</button>
                                                                    <EditIcon onClick={() => navigate("editGeoTagAnganwadi")} />
                                                                </td>
                                                            </tr>
                                                        )) : (tableName === "Event-Occurence") ?
                                                            data.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{item.first_name}</td>
                                                                    <td>8393939939</td>
                                                                    <td>Baram</td>
                                                                    <td>94.4533</td>
                                                                    <td>79.8833</td>
                                                                    <td>HOD</td>
                                                                    <td>Pending</td>
                                                                    <td style={{ cursor: 'pointer' }}>
                                                                        <button onClick={() => navigate("/show-event-occurence", { state: { lat: 28.6081, long: 77.3723 } })}>Show</button>
                                                                    </td>
                                                                </tr>
                                                            )) : (tableName = "QueryManagement") ?
                                                                <tr>
                                                                    <td>8Shyam</td>
                                                                    <td>Not able to edit the Record of any Anganwadi Centre</td>
                                                                    <td>When i open the record of Anganwadi Centre in edit mode by clicking on edit button, and after making changes in the reocrd like changing Phone Number or any other attribute or even without any change in record when i click on submit button the record did not get submit and shows the error "Negative value is not allowed" just below the field of Phone No.</td>
                                                                    <td>Kathua</td>
                                                                    <td>Kathua</td>
                                                                    <td>08-08-2023</td>
                                                                    <td>Completed</td>
                                                                    {
                                                                        isAdmin ?
                                                                        <td onClick={() => navigate("/query/replyQuery")}><ReplyIcon sx={{cursor: 'pointer'}}/></td>
                                                                        : <td onClick={() => navigate("/query/replyQuery")}><VisibilityIcon sx={{cursor: 'pointer'}}/></td>
                                                                    }
                                                                </tr> : ""
                                            )
                                        ))
                                )
                            )
                        }
                    </tbody>
                </table>
            </Grid >
            <Grid className="table-footer">
                <p>Rows per page</p>
                <select name="row-select">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </Grid>
        </>
    )
}

export default BasicTable