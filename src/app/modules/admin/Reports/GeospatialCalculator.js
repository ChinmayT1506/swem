import React from 'react'
import './GeospatialCalculator.scss'
import { Grid } from '@mui/material'

export const GeospatialCalculator = () => {
    return (
        <Grid className='geospatial-calulator-container'>
            <Grid className='geospatial-calculator-inner'>
                <Grid className='geospatial-calculator-map'>

                </Grid>
                <Grid className='geospatial-calculator-form'>
                    <h4>TARGET MARKER CONTROLS</h4>
                </Grid>
            </Grid>
        </Grid>
    )
}
