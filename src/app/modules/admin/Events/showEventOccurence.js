import { Grid, Stack, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './showEventOccurence.scss'
import axios from 'axios';
import BasicCarousel from '../../../components/Carousel/carousel';
import Modal from '@mui/material/Modal';
import { BasicMarkedMap } from '../../../components/Maps/MarkedMap';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { toast } from 'react-toastify';
import { GET } from '../../../../services/api';

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

  const [conductionData, setConductionData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location?.state?.item

  // const [img, setImg] = useState();

  const [mediaData, setmediaData] = useState();

  const [open, setOpen] = useState(false);

  const handleOpen = (item) => {
    setOpen(true);
    setmediaData(item)
  };
  const handleClose = () => setOpen(false);

  console.log(location?.state?.item?._id)

  // Get data
  const getConductionList = async () => {
    const res = await GET("officer/conduction/media",
      {
        conductionId: eventData._id
      }
    )
    if (res?.data?.success) {
      setConductionData(res?.data?.result?.media)
      console.log(res?.data?.result?.media)
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
      toast.error(res?.data.message)
    }
  }
  useEffect(() => {
    getConductionList()
  }, []);

  return (
    <>
      <Grid className='Events-main'>
        <Stack className='Events-inner' spacing={2}>
          <Grid className='Events-inner-1'>
            <h2>
              <KeyboardBackspaceIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer', paddingRight: '0.8rem' }} />
              Detail Event Occurence
            </h2>
          </Grid>
          <Grid className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
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
                  <td>{eventData.createdAt.slice(0, 10)}</td>
                  <td>{eventData.event_name}</td>
                  <td>{eventData.scheme}</td>
                  <td>{eventData.district}</td>
                  <td>{eventData.block}</td>
                  <td>{eventData.awc_name}</td>
                  <td>{eventData.participants}</td>
                  <td>{eventData.expenditure}</td>
                </tr>
              </tbody>
            </table>
          </Grid >
          <Grid className='carousel-container'>
            <BasicCarousel data={conductionData}/>
          </Grid>
          <Grid className="table-container table-2">
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
                {
                  conductionData?.map(item => (
                    <tr key={item._id}>
                      <td>{item.filename}</td>
                      <td>{item.longitude}</td>
                      <td>{item.latitude}</td>
                      <td>{item.timestamp}</td>
                      <td>{JSON.stringify(item.mocked)}</td>
                      <td><button onClick={() => handleOpen(item)}>Show on Map</button></td>
                    </tr>
                  ))
                }
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
          <BasicMarkedMap lat={mediaData?.latitude} long={mediaData?.longitude} />
        </Box>
      </Modal>
    </>
  )
}

