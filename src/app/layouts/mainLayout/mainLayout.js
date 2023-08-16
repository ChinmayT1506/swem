import '../../../App.css';
import './mainLayout.scss'
import { Navbar } from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import Grid from '@mui/material/Grid';

function MainLayout({ children }) {
    return (
        <Grid className="App">
            <Navbar />
            <Grid className='MainLayout'>
                <Sidebar />
                    {children}
            </Grid>
        </Grid>
    );
}

export default MainLayout;
