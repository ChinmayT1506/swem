import React from 'react'
import Box from '@mui/material/Box';
import './dashboardCard.scss'

export const DashboardCard = ({ event, data }) => {
    return (
        <>
            <Box className="CardBox">
                <Box className="content">
                    <h2>{event}</h2>
                    <h3>{data}</h3>
                </Box>
            </Box>
        </>
    )
}
