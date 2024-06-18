import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from 'react-avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useStateContext } from '../contexts/ContextProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutAccount } from '../service/user';
import { LuListTodo } from "react-icons/lu";

function Nav() {
    const {userDetails,setUserDetails,setStoredTask}=useStateContext()
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handelLogout=()=>{
        logoutAccount(setUserDetails,setStoredTask)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl" >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} >
                    <Box
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <LuListTodo />
                    </Box>


                    <Box

                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <LuListTodo />
                    </Box>

                    <Box sx={{ flexGrow: 0, justifySelf: "flex-end" }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                             <Avatar name={userDetails?.userName} size={"50"} round={true} color={Avatar.getRandomColor('sitebase', ["#22a6b3", 'green',"#130f40","#4834d4","#f0932b","#be2edd","#f9ca24" ])} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Button onClick={handelLogout}><span className='font-semibold text-black mr-2'>Log out </span><LogoutIcon/></Button>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Nav;
