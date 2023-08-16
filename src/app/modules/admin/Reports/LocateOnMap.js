import { Grid } from '@mui/material'
import React from 'react'
import './LocateOnMap.scss'
import { MapLocator } from '../../../components/Maps/LocateMap'
import { useSelector } from 'react-redux'

export const LocateOnMap = () => {

    const district_List = useSelector(state => state.getDistrictsData.DistrictDataArr)

    return (
        <Grid className='locateOnMap-Container'>
            <Grid className='innerBox-1'>
                <label>District</label>
                <select name="district" id="district">
                    {
                    district_List.map(item => {
                        return <option value={item.district}>{item.district}</option>
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
