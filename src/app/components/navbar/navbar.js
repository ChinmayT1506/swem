import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import GridViewIcon from '@mui/icons-material/GridView';
import './navbar.scss'
import { NavLink, useNavigate } from 'react-router-dom';
import { Stack } from 'react-bootstrap';
import { Collapse } from '@mui/material';
import ExpandMore from "@mui/icons-material/ExpandMore"
import ExpandLess from "@mui/icons-material/ExpandLess"
import CancelIcon from '@mui/icons-material/Cancel';


export const Navbar = () => {

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("accessToken")
    navigate("/login")
  }

  const [hamIconBool, setHamIconBool] = useState(true);

  const [isCollapse, setCollapse] = useState(false)
  const [isCollapse2, setCollapse2] = useState(false)
  const [isCollapse3, setCollapse3] = useState(false)
  const [isCollapse4, setCollapse4] = useState(false)

  function respondFunc() {
    document.getElementById("NavLinks").classList.toggle("hidden")
    setHamIconBool(!hamIconBool);
  }

  return (
    <>
      <Grid className="Navbar">
        <Grid className='Hamburger'>
          {hamIconBool ?
            <GridViewIcon sx={{ transiton: '2' }} fontSize='large' onClick={respondFunc} /> :
            <CancelIcon fontSize='large' onClick={respondFunc} />
          }
        </Grid>
        <Box className="Header">
          <h4>MISSION DIRECTORATE POSHAN J&K</h4>
        </Box>
        <Grid className='logoutBar'>
          <AccountCircleSharpIcon className="userIcon" onClick={() => setCollapse4(!isCollapse4)} />
          <Collapse in={isCollapse4} timeout="auto" unmountOnExit>
            <Grid className='logoutDiv'>
              <button onClick={logout}>Log Out</button>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
      <Grid className='NavLinks hidden' id="NavLinks">
        <NavLink to="/dashboard"><h5>Dashboard</h5></NavLink>
        <NavLink to="/schemes"><h5>Schemes</h5></NavLink>
        <NavLink to="/events"><h5>Events</h5></NavLink>
        <Stack className='navStack'>
          <h5 onClick={() => setCollapse(!isCollapse)}>
            Users {isCollapse ? <ExpandLess /> : <ExpandMore />}
          </h5>
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            <NavLink to="/anganwadi"><h5>Anganwadi</h5></NavLink>
            <NavLink to="/hod"><h5>HOD</h5></NavLink>
            <NavLink to="/cdpo"><h5>CDPO</h5></NavLink>
            <NavLink to="/dpo"><h5>DPO</h5></NavLink>
            <NavLink to="/geotagAnganwadi"><h5>Geotag Anganwadi</h5></NavLink>
          </Collapse>
        </Stack>
        <Stack className='navStack'>
          <h5 onClick={() => setCollapse2(!isCollapse2)}>
            Reports {isCollapse2 ? <ExpandLess /> : <ExpandMore />}
          </h5>
          <Collapse in={isCollapse2} timeout="auto" unmountOnExit>
            <NavLink to="/hod"><h5>Geospatial Calculator</h5></NavLink>
            <NavLink to="/hod"><h5>Locate on map</h5></NavLink>
          </Collapse>
        </Stack>
        <Stack className='navStack'>
          <h5 onClick={() => setCollapse3(!isCollapse3)}>
            Manage Account {isCollapse3 ? <ExpandLess /> : <ExpandMore />}
          </h5>
          <Collapse in={isCollapse3} timeout="auto" unmountOnExit>
            <NavLink to="/profile"><h5>Profile</h5></NavLink>
            <NavLink to="/Change Password"><h5>Change Password</h5></NavLink>
          </Collapse>
        </Stack>
        <NavLink to="/event-occurence"><h5>Event Occurance</h5></NavLink>
        <NavLink to="/queryManagement"><h5>Query Management</h5></NavLink>
        <NavLink to="/logout"><h5>Log out</h5></NavLink>
      </Grid>

    </>
  )
}
