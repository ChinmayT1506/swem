import { Grid, Stack, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './showEventOccurence.scss'
import axios from 'axios';
import BasicCarousel from '../../../components/Carousel/carousel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BasicMarkedMap } from '../../../components/Maps/MarkedMap';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  height: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ShowEventOccurence = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <>
      <Grid className='Events-main'>
        <Stack className='Events-inner' spacing={2}>
          <Grid className='Events-inner-1'>
            <h2>Detail Event Occurence</h2>
          </Grid>
          <Grid className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Name</th>
                  <th>Associate Scheme</th>
                  <th>District</th>
                  <th>Block</th>
                  <th>AWC Name</th>
                  <th>Participants</th>
                  <th>Expenditure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>08/08/2023</td>
                  <td>COMMUNITY BASED EVENTS</td>
                  <td>Poshan Abhiyan</td>
                  <td>Srinagar</td>
                  <td>Srinagar</td>
                  <td>Srinagar</td>
                  <td>1000000</td>
                  <td>99</td>
                  <td>1000</td>
                </tr>
              </tbody>
            </table>
          </Grid >
          <Grid>
            <BasicCarousel />
          </Grid>
          <Grid className="table-container">
            <table>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Longitude</th>
                  <th>Latitude</th>
                  <th>Time Stamp</th>
                  <th>Lock Map</th>
                  <th>Show on Map</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>url.jpeg</td>
                  <td>88.983733</td>
                  <td>45.727828</td>
                  <td>08/08/2023</td>
                  <td>false</td>
                  <td><button onClick={handleOpen}>Show on Map</button></td>
                </tr>
                <tr>
                  <td>url.jpeg</td>
                  <td>88.983733</td>
                  <td>45.727828</td>
                  <td>08/08/2023</td>
                  <td>false</td>
                  <td><button>Show on Map</button></td>
                </tr><tr>
                  <td>url.jpeg</td>
                  <td>88.983733</td>
                  <td>45.727828</td>
                  <td>08/08/2023</td>
                  <td>false</td>
                  <td><button>Show on Map</button></td>
                </tr><tr>
                  <td>url.jpeg</td>
                  <td>88.983733</td>
                  <td>45.727828</td>
                  <td>08/08/2023</td>
                  <td>false</td>
                  <td><button>Show on Map</button></td>
                </tr>
              </tbody>
            </table>
          </Grid >
        </Stack>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BasicMarkedMap />
        </Box>
      </Modal>
    </>
  )
}

