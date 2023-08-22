import React, { useEffect, useState } from 'react'
import './GeospatialCalculator.scss'
import { Button, Collapse, Grid, Stack } from '@mui/material'
import BasicTable from '../../../components/table/table';
import { GET } from '../../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GeoSpatialCalcMap } from '../../../components/Maps/GeoSpatialCalcMap';

export const GeospatialCalculator = () => {

    const navigate = useNavigate();
    const [markerPos, setMarkerPos] = useState([34.0837, 74.7973]);

    const [entry, setEntry] = useState({
        latitude: markerPos[0],
        longitude: markerPos[1],
        innerRad: 1000,
        outerRad: 2000
    });
    const [geoSpatData, setGeoSpatData] = useState();
    const [inMotion, setInMotion] = useState(false);
    const [isCollapse, setCollapse] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        })
        if (event.target.name === "latitude") {
            console.log("there is a change")
        }
    }

    const getgeoSpatList = async () => {
        const res = await GET("officer/user/geo-location/near",
            {
                latitude: markerPos[0],
                longitude: markerPos[1],
                minDistance: entry?.innerRad,
                maxDistance: entry?.outerRad,
            }
        )
        if (res?.data?.success) {
            setGeoSpatData(res?.data?.result?.data)
            console.log(res?.data?.result?.data)
        }
        else if (res?.status === 401) {
            toast.error("Inavalid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else if (res?.status === 400) {
            toast.error("Failed to Fetch Data")
        }
        else {
            toast.error(res.data.message)
        }
    }
    useEffect(() => {
        getgeoSpatList()
    }, []);


    function unlockFunc() {
        document.getElementById("unlockBtn").classList.add("changeBgColor")
        document.getElementById("lockBtn").classList.remove("changeBgColor")
        setInMotion(true);
    }

    function lockFunc() {
        setInMotion(false);
        document.getElementById("lockBtn").classList.add("changeBgColor")
        document.getElementById("unlockBtn").classList.remove("changeBgColor")
    }

    return (
        <Grid className='geospatial-calulator-container'>
            <Grid className='geospatial-calculator-inner'>
                <Grid className='geospatial-calculator-map'>
                    <GeoSpatialCalcMap data={geoSpatData} innerRad={entry.innerRad} outerRad={entry.outerRad} inMotion={inMotion} setMarkerPosition={setMarkerPos} />
                </Grid>
                <Stack spacing={2} className='geospatial-calculator-form'>
                    <h4>TARGET MARKER CONTROLS</h4>
                    <Grid className='buttonBox'>
                        <Button onClick={unlockFunc} id="unlockBtn">Unlock Master</Button>
                        <Button onClick={lockFunc} className="changeBgColor" id="lockBtn">Lock Current Position</Button>
                    </Grid>
                    <form className='Form-main'>
                        <Stack className='Form-inner' spacing={2}>
                            <label>Target Latitude</label>
                            <input value={markerPos[0]} disabled="disabled" type='number' name="latitude"></input>
                            <label>Target Longitude</label>
                            <input value={markerPos[1]} disabled="disabled" type='number' name="longitude"></input>
                            <label>Inner Radius (Excluded)</label>
                            <input value={entry.innerRad} onChange={handleChange} type='number' name="innerRad"></input>
                            <label>Outer Radius (Included)</label>
                            <input value={entry.outerRad} onChange={handleChange} type='number' name="outerRad"></input>
                        </Stack>
                    </form>
                    <Grid className='buttonBox'>
                        <Button type="button" onClick={() => setCollapse(true)}>Plot Data on Map</Button>
                        <Button type="button" onClick={() => setCollapse(false)}>Reset Data</Button>
                    </Grid>
                    <Collapse in={isCollapse} timeout="auto" unmountOnExit>
                        <Grid className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Awc</th>
                                        <th>Address</th>
                                        <th>Distance<br />(kms)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        geoSpatData?.map(item => (
                                            <tr key={item._id}>
                                                <td>{item.block}</td>
                                                <td>{item.awc_name}</td>
                                                <td>{item.awc_address}</td>
                                                <td>{item.distance}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </Grid >
                    </Collapse>
                </Stack>
            </Grid>
        </Grid >
    )
}
