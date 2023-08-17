import { Grid } from '@mui/material'
import React, { useState } from 'react'
import './LocateOnMap.scss'
import { MapLocator } from '../../../components/Maps/LocateMap'
import { useSelector } from 'react-redux'
import { GET } from '../../../../services/api'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const LocateOnMap = () => {

    const navigate = useNavigate();

    const [selectDistrict, setSelectDistrict] = useState("SRINAGAR")
    const [LocateOnMapData, setLocateOnMapData] = useState([]);

    function handleChange(event){
        setSelectDistrict(event.target.value)
    }

    const getLocationOnMapData = async () => {
        const res = await GET("/officer/user/geo-location")
        // console.log(res.data);
        if (res?.data?.success) {
            console.log("success", res?.data?.result?.data);
            setLocateOnMapData(res?.data?.result?.data);
        }
        else if (res.status === 401) {
            toast.error("Inavalid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else if (res.status === 400) {
            toast.error("Failed to Fetch Data")
        }
        else {
            toast.error(res.data.message)
        }
    }
    useEffect(() => {
        getLocationOnMapData()
    }, [LocateOnMapData])

    const district_List = useSelector(state => state.getDistrictsData.DistrictDataArr)

    return (
        <Grid className='locateOnMap-Container'>
            <Grid className='innerBox-1'>
                <label>District</label>
                <select name="district" id="district" onChange={handleChange}>
                    {
                        district_List.map(item => {
                            return <option value={item.district}>{item.district}</option>
                        })
                    }
                </select>
            </Grid>
            <Grid className='innerBox-2'>
                <MapLocator data={LocateOnMapData ?? []} selectedDistrict={selectDistrict}/>
            </Grid>
        </Grid>
    )
}
