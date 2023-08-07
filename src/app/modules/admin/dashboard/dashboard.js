import React from 'react'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import './dashboard.scss'
import { DashboardCard } from './Dashboard-Card/dashboardCard';
import LineChart from './Charts/LineChart';
import { PieChart } from './Charts/PieChart';

export const Dashboard = () => {
    return (
        <>
            <Grid className="Dashboard-main">
                <Stack className='Dashboard-inner' spacing={3}>
                    <Grid className='Dashboard-inner-1'>
                        <h2>Dashboard</h2>
                    </Grid>
                    <Grid className='Dashboard-inner-2'>
                        <DashboardCard event="Total Schemes" data={10}/>                    
                        <DashboardCard event="Total Events" data={10}/>                    
                        <DashboardCard event="Total Occurances" data={10}/>                    
                        <DashboardCard event="Today's Occurances" data={10}/>                    
                    </Grid>
                    <Grid className='Dashboard-inner-3'>
                        <Grid className="Chart">
                            <h3>YEAR WISE EVENT OCCURANCE</h3>
                            <LineChart />
                        </Grid>
                        <Grid className="Chart">
                            <PieChart />
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
        </>
    )
}
