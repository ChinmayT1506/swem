import React, { useEffect, useState } from 'react'
import './table.scss'
import { Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DELETE } from '../../../services/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function BasicTable({ data, tableHead, tableName, handleOpen }) {

    const USER = useSelector(state => state?.getLogindata?.loginData[0])
    const USER_TYPE = USER?.user_type
    const isAdmin = (USER_TYPE === "HOD")
    // console.log(isAdmin)

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
                            // data?.map((item, index) => (
                            //     <tr key={index}>
                            //         {Object.values(item).map((item, index) => {
                            //             return <td>{item}</td>
                            //         })}
                            //     </tr>
                            // ))
                            (tableName === "scheme" ?
                                data?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.date_of_commencement.slice(0, 10)}</td>
                                        <td>{item.scheme_name}</td>
                                        <td>{item.aa_cost}</td>
                                        <td>{item.additional_funds_required}</td>
                                        <td style={{ cursor: 'pointer' }}>
                                            <EditIcon onClick={() => navigate("editScheme", { state: { item } })} />
                                            <DeleteIcon onClick={() => DeleteItemFunc(item._id, tableName)} />
                                        </td>
                                    </tr>
                                )) : (tableName === "event" ?
                                    data?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.event_name}</td>
                                            <td>{item.event_code}</td>
                                            <td>{item.scheme}</td>
                                            <td><button onClick={() => navigate("/event-occurence")}>Show Occurences</button></td>
                                            <td style={{ cursor: 'pointer' }}>
                                                <EditIcon onClick={() => navigate("editEvent", { state: { item } })} />
                                                <DeleteIcon onClick={() => DeleteItemFunc(item._id, tableName)} />
                                            </td>
                                        </tr>
                                    )) : (tableName === "anganwadi" ?
                                        data?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.mobile}</td>
                                                <td>{item.district}</td>
                                                <td>{item.project}</td>
                                                <td>{item.awc_name}</td>
                                                <td>{item.awc_code}</td>
                                                <td>{item.awc_address}</td>
                                                <td style={{ cursor: 'pointer' }}>
                                                    <EditIcon onClick={() => navigate("editAnganwadi", { state: { item } })} />
                                                    <DeleteIcon onClick={() => DeleteItemFunc(item._id, tableName = "user")} />
                                                </td>
                                            </tr>
                                        )) : (tableName === "HOD" ?
                                            data?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.first_name}</td>
                                                    <td>8393939939</td>
                                                    <td style={{ cursor: 'pointer' }}>
                                                        <EditIcon onClick={() => navigate("editHod")} />
                                                        <DeleteIcon />
                                                    </td>
                                                </tr>
                                            )) : (tableName === "CDPO" ?
                                                data?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>{item.mobile}</td>
                                                        <td>{item.district}</td>
                                                        <td>{item.project}</td>
                                                        <td style={{ cursor: 'pointer' }}>
                                                            <EditIcon onClick={() => navigate("editCdpo", { state: { item } })} />
                                                            <DeleteIcon onClick={() => DeleteItemFunc(item._id, tableName = "user")} />
                                                        </td>
                                                    </tr>
                                                )) : (tableName === "DPO") ?
                                                    data?.map((item, index) => (
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
                                                        data?.map((item, index) => (
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
                                                            data?.map((item, index) => (
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
                                                                            <td onClick={() => navigate("/query/replyQuery")}><ReplyIcon sx={{ cursor: 'pointer' }} /></td>
                                                                            : <td onClick={() => navigate("/query/replyQuery")}><VisibilityIcon sx={{ cursor: 'pointer' }} /></td>
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
            {/* <Grid className="table-footer">
                <p>Rows per page</p>
                <select name="row-select">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </Grid> */}
        </>
    )
}

export default BasicTable