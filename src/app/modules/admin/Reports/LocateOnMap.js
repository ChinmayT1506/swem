import { Grid } from '@mui/material'
import React from 'react'
import './LocateOnMap.scss'
import { Stack } from 'react-bootstrap'
import { MapLocator } from '../../../components/Maps/LocateMap'

export const LocateOnMap = () => {

    const districtOptions = ["Srinagar", "Anantang", "Budgam"]

    return (
        <Grid className='locateOnMap-Container'>
            <Grid className='innerBox-1'>
                <label>District</label>
                <select name="district" id="district">
                    {
                    districtOptions.map(item => {
                        return <option>{item}</option>
                    })
                }
                </select>
            </Grid>
            <Grid className='innerBox-2'>
                <MapLocator />
            </Grid>
        </Grid>
    )
}
