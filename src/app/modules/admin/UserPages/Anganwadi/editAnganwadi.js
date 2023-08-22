import React, { useState } from 'react';
import './addAnganwadi.scss'
import { Box, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useSelector } from 'react-redux';
import { GET, PUT } from '../../../../../services/api';
import { toast } from 'react-toastify';

export default function EditAnganwadiForm() {

    const navigate = useNavigate();

    const location = useLocation()
    const [currDistrictId, setCurrDistrictId] = useState("");
    const district_List = useSelector(state => state.getDistrictsData.DistrictDataArr)
    const [entry, setEntry] = useState(location.state.item);
    const [blockDataArr, setBlockDataArr] = useState();
    console.log(entry)

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry(item => {
            return {
                ...item,
                [name]: value
            };
        });
        // get block data
        if (event.target.name === "district") {
            const Master_Project = async () => {
                let res = await GET("/officer/master/block",
                    {
                        district: event.target.value
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
    }

    // edit data
    async function handleSubmit(event) {
        event.preventDefault();
        const res = await PUT(`officer/user?userId=${entry._id}`, {
            user_type: "ANGANWADI_WORKER",
            name: entry.name,
            mobile: entry.mobile,
            district: entry.district,
            block: entry.block,
            sector: entry.sector,
            awc_name: entry.awc_name,
            awc_code: entry.awc_code,
            awc_address: entry.awc_address,
        })
        if (res?.data?.success) {
            toast.success(res?.data?.message)
            navigate(-1)
        }
        else if (res?.status === 401) {
            toast.error("Inavalid User token")
            localStorage.removeItem("ACCESS_TOKEN")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        }
        else{
            toast.error(res?.data?.message)   
        }
        console.log(res)
    }

    return (
        <>
            <Grid className='AddAnganwadi-Container'>
                <Stack className='AddAnganwadiBox' spacing={5}>
                    <Box className='Heading-Box'>
                        <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
                        <h3>Edit Anganwadi</h3>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Stack className='form-main' spacing={2}>

                            <label for='AnganwadiName'>Name</label>
                            <input value={entry.name} onChange={handleChange} type='text' name='name' autoComplete='off'></input>

                            <label for='mobile'>Mobile Number</label>
                            <input value={entry.mobile} onChange={handleChange} className='' type='tel' name='mobile' maxLength={10}></input>

                            <label>District</label>
                            <select
                                labelId="filterlabel"
                                id="select"
                                name='district'
                                value={entry.district}
                                label="All"
                                onChange={handleChange}
                            >
                                {district_List.map(item => (
                                    <option value={item.district} onClick={() => setCurrDistrictId(item._id)}>{item.district}</option>
                                ))}
                            </select>
                            <select
                                labelId="filterlabel"
                                id="select"
                                name='project'
                                label="All"
                                onChange={handleChange}
                            // autoComplete='off'
                            >
                                <option value={entry._id}>{entry.block}</option>
                                {blockDataArr?.map(item => (
                                    item.block !== entry.block ?
                                        <option value={item._id}>{item.block}</option>
                                        : ""
                                ))}
                            </select>

                            <label for='sector'>Sector</label>
                            <input value={entry.sector} onChange={handleChange} className='' id='sector' type='number' name='sector'></input>

                            <label for='anganwadiCentre'>Anganwadi Centre Name</label>
                            <input value={entry.awc_name} onChange={handleChange} className='' type='text' name='awc_name'></input>

                            <label for='anganwadiCentreCode'>Anganwadi Centre Code</label>
                            <input value={entry.awc_code} onChange={handleChange} className='' id='anganwadiCentreCode' type='text' name='awc_code'></input>

                            <label for='anganwadiAddress'>Anganwadi Centre Address</label>
                            <textarea value={entry.awc_address} onChange={handleChange} className='' id='anganwadiCentreAddress' rows="3" name='awc_address'></textarea>
                            <Grid className='submitForm'>
                                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                                <button type='submit'>Submit</button>
                            </Grid>
                        </Stack>
                    </form>
                </Stack >
            </Grid >
        </>
    );
}