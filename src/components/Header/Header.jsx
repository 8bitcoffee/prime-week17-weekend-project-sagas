import React from 'react';
import './Header.css';
import { useHistory } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
import QueueSharpIcon from '@mui/icons-material/QueueSharp';

function Header(){
    const history = useHistory();

    return (
        <div id="header-div">
            <h1>Movie Library</h1>
            <Button
                className='header-btn' 
                variant="contained"
                onClick={()=>{history.push('/')}}
                sx={{
                    backgroundColor: "whitesmoke",
                    color: "#003049",
                    marginLeft: "10px",
                    marginRight: "10px",
                    ":hover":{
                        bgcolor: "#D62828",
                        color: "whitesmoke"
                    }
                }}
            >Home
                <HomeIcon
                    className='header-icon'
                    variant="sharp"
                    fontSize='large'
                    onClick={()=>{history.push('/')}}
                    sx={{
                        color:"#003049",
                        ":hover": {
                            color: "whitesmoke"
                        }
                    }}
                />
            </Button>
            <Button
                className='header-btn' 
                variant="contained"
                sx={{
                    backgroundColor: "white",
                    color: "#003049",
                    marginLeft: "10px",
                    marginRight: "10px",
                    ":hover":{
                        bgcolor: "#D62828",
                        color: "whitesmoke"
                    }
                }}
            >Add+
                <QueueSharpIcon
                    className='header-icon'
                    variant="sharp"
                    fontSize='large'
                    sx={{
                        color:"#003049",
                        ":hover": {
                            color: "whitesmoke"
                        }
                    }}
                />
            </Button>
            <hr/>
        </div>
    )
}

export default Header;