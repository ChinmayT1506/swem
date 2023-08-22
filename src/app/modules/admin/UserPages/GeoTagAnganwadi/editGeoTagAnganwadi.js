import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './editGeoTagAnganwadi.scss'
import { useDispatch, useSelector } from 'react-redux';
import { GET, PUT } from '../../../../../services/api';
import { toast } from 'react-toastify';
import { getBlockData } from '../../../../redux/actions/blockAction';

export default function EditGeoTagForm() {

    const navigate = useNavigate();
    const location = useLocation()
    // const district_List = useSelector(state => state.getDistrictsData.DistrictDataArr)
    const [entry, setEntry] = useState(location?.state?.item);
    const dispatch = useDispatch();
    const [blockDataArr, setBlockDataArr] = useState();

    if (location.state.click) {
        const Master_Project = async () => {
            let res = await GET("/officer/master/block",
                {
                    district: entry.district
                }
            )
            if (res?.data?.success) {
                console.log(res.data.result.data)
                setBlockDataArr(res?.data?.result?.data)
                // dispatch(getBlockData(res?.data?.result?.data))
            }
            else if (res.status === 401) {
                toast.error("Inavlid User token")
                localStorage.removeItem("ACCESS_TOKEN")
                setTimeout(() => {
                    navigate("/")
                }, 1500);
            }
            else {
                toast.error(res.data.message)
            }
        }
        Master_Project()
    }

    // const block_list = useSelector(state => state.getBlockData.blockDataArr)

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
    }

    // edit data
    async function handleSubmit(event) {
        event.preventDefault();
        const res = await PUT(`officer/user/location?userId=${entry._id}`, {
            name: entry.name,
            mobile: entry.mobile,
            district: entry.district,
            block: entry.block,
            awc_code: entry.awc_code,
            awc_name: entry.awc_name,
            awc_address: entry.awc_address,
            latitude: entry.latitude,
            longitutde: entry.longitutde,
        })
        if (res.data.success) {
            toast.success(res.data.message)
            navigate(-1)
        }
        else if (res.status === 401) {
            toast.error("Inavalid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else {
            toast.error(res.data.message)
        }
        console.log(res)
    }

    return (
        <>
            <Grid className='EditGeoTag-Container'>
                <Stack className='EditGeoTagBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
                        <h3>Edit Geo Tag Anganwadi</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>

                            <label for='EditGeoTagName'>Name</label>
                            <input onChange={handleChange} disabled="disabled" type='text' name='AnganwadiName' autoComplete='off' value={entry.name}></input>

                            <label for='mobile'>Mobile Number</label>
                            <input onChange={handleChange} disabled="disabled" className='' id='passwordInput' type='number' name='mobile' value={entry.mobile}></input>

                            <label>District</label>
                            <select
                                disabled="disabled"
                                labelId="filterlabel"
                                id="select"
                                name='district'
                                label="All"
                                onChange={handleChange}
                            >
                                <option value={entry._id}>{entry.district}</option>
                            </select>
                            <label for='project'>Project</label>
                            <select
                                disabled="disabled"
                                labelId="filterlabel"
                                id="select"
                                name='project'
                                label="All"
                                onChange={handleChange}
                            >
                                {blockDataArr?.map(item => (
                                    <option value={item._id}>{item.block}</option>
                                ))}
                            </select>

                            <label for='sector'>Sector</label>
                            <input value={entry.sector} onChange={handleChange} disabled="disabled" className='' id='sector' type='number' name='sector'></input>

                            <label for='anganwadiCentre'>Anganwadi Centre Name</label>
                            <input value={entry.awc_name} onChange={handleChange} disabled="disabled" className='' type='text' name='anganwadiCentre'></input>

                            <label for='anganwadiCentreCode'>Anganwadi Centre Code</label>
                            <input value={entry.awc_code} onChange={handleChange} disabled="disabled" className='' id='anganwadiCentreCode' type='text' name='anganwadiCentreCode'></input>

                            <label for='anganwadiCentreCode'>Anganwadi Centre Address</label>
                            <input value={entry.awc_address} disabled="disabled" onChange={handleChange} className='' id='anganwadiCentreCode' type='textarea' rows="3" name='anganwadiCentreCode'></input>

                            <label for='longitude'>Longitude</label>
                            <input onChange={handleChange} className='' id='longitude' type='textarea' rows="3" name='longitude'></input>

                            <label for='latitude'>Latitude</label>
                            <input onChange={handleChange} className='' id='latitude' type='textarea' rows="3" name='latitude'></input>

                            <label for='Awc-images'>AWC-Images</label>
                            <input onChange={handleChange} className='' id='Awc-images' type='textarea' rows="3" name='Awc-images'></input>

                            <Grid className='submitForm'>
                                <button type='button' onClick={() => navigate(-1)}>Cancel</button>
                                <button type='submit'>Submit</button>
                            </Grid>
                        </Stack>
                    </form>
                </Stack >
            </Grid >
        </>
    );
}