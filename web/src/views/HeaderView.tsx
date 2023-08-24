import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function HeaderView() {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <AppBar position="static" color="primary" style={{flexGrow: 3, maxWidth: '15%'}}>
                <Toolbar style={{justifyContent: 'center'}}>
                    <img src="/vite.svg" alt="LOGO" style={{height: '50px'}}/>
                </Toolbar>
            </AppBar>

            <AppBar position="static" color="primary" style={{flexGrow: 3, maxWidth: '83%'}}>
                <Toolbar style={{justifyContent: 'center'}}>
                    <div style={{display: 'flex', gap: '10px', width: '100%'}}>
                        <Button variant="contained" color="primary" component={Link} to="/"
                                style={{flexGrow: 1, backgroundColor: '#42a5f5', color: 'black'}}>Home</Button>
                        <Button variant="contained" color="primary" component={Link} to="/public"
                                style={{flexGrow: 1, backgroundColor: '#42a5f5', color: 'black'}}>Public
                            Records</Button>
                        <Button variant="contained" color="primary" component={Link} to="/recordingManagement"
                                style={{flexGrow: 1, backgroundColor: '#42a5f5', color: 'black'}}>Recording
                            Management</Button>
                        <Button variant="contained" color="primary" component={Link} to="/user"
                                style={{flexGrow: 1, backgroundColor: '#42a5f5', color: 'black'}}>Sign in/up</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
