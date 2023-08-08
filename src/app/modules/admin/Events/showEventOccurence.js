import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './showEventOccurence.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicTable from '../../../components/table/table';

export const ShowEventOccurence = () => {

  let [data, setData] = useState([]);

  // Get data
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://reqres.in/api/users?page=2"
        );
        setData(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  let tableHead = [
    "Date",
    "Event Name",
    "Associate Scheme",
    "District",
    "Block",
    "AWC Name",
    "Participants",
    "Expenditure",
]

  return (
    <>
      <Grid className='Events-main'>
        <Stack className='Events-inner' spacing={2}>
          <BasicTable tableHead={tableHead} tableName="HOD" data={data} />
        </Stack>

      </Grid>
    </>
  )
}

