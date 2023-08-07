import React, { useEffect, useState } from 'react'
import './table.scss'
import { Box, Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function BasicTable({ data, tableHead, tableName }) {

    const navigate = useNavigate();

    return (
        <>
            <Grid className="table-container">
                <table>
                    <thead>
                        <tr>
                            {
                                tableHead.map(item => (
                                    <th>{item}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
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
                                            <td><button>Show Occurences</button></td>
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
                                        )) : ""
                                    ))
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