import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import LineChart from './Charts/LineChart';
import { DashboardCard } from './Dashboard-Card/dashboardCard';
import { PieChart } from './Charts/PieChart';
import { GET } from '../../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './dashboard.scss'
import { Master_District } from '../../../../utils/master-district';
import { useDispatch } from 'react-redux';
import { getDistrictsData } from '../../../redux/actions/districtsActions';

export const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [DashboardData, setDashboardData] = useState({});

    // calling district master data
    useEffect(() => {
        Master_District().then(res => {
            dispatch(getDistrictsData(res))
        })
    },[])

    const getDashboardData = async () => {
        const res = await GET("/officer/dashboard")
        if (res?.data?.success) {
            setDashboardData(res?.data?.result);
        }
        else if (res.status === 401) {
            toast.error("Inavlid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
    }
    useEffect(() => {
        getDashboardData()
    }, []);
    console.log(DashboardData)
    return (
        <>
            <Grid className="Dashboard-main">
                <Stack className='Dashboard-inner' spacing={3}>
                    <Grid className='Dashboard-inner-1'>
                        <h2>Dashboard</h2>
                    </Grid>
                    <Grid className='Dashboard-inner-2'>
                        <DashboardCard event="Total Schemes" data={DashboardData.totalScheme}/>                    
                        <DashboardCard event="Total Events" data={DashboardData.totalEvents}/>                    
                        <DashboardCard event="Total Occurances" data={DashboardData.totalOccurences}/>                    
                        <DashboardCard event="Today's Occurances" data={DashboardData.todayOccurences}/>                    
                    </Grid>
                    <Grid className='Dashboard-inner-3'>
                        <Grid className="Chart">
                            <h3>YEAR WISE EVENT OCCURANCE</h3>
                            <LineChart Linedata={DashboardData?.monthWiseCount ?? []}/>
                        </Grid>
                        <Grid className="Chart">
                            <PieChart PieData={DashboardData?.eventWiseCount ?? []}/>
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
        </>
    )
}
