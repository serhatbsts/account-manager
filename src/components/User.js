import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper, Button, preReleaseNumber} from "@mui/material";
import {useState} from "react";

export default function User() {
    const paperStyle={padding:'50px 20px',width:600,margin:"20px auto"}
    const [name,setname]=useState('')
    const [surName,setSurName]=useState('')
    const [password,setPassword]=useState(preReleaseNumber)
    const handleClick=(e)=>{
        e.preventDefault()
        const user={name,surName,password}
        console.log(user)
        fetch("/users/createUser",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(()=>{
            console.log("New User added")
        })
    }
    return (

        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:"blue"}}><u>Create User</u></h1>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >

            <TextField id="outlined-basic" label="User Name" variant="outlined"
            value={name}
            onChange={(e)=>setname(e.target.value)}/>
            <TextField id="outlined-basic" label="User Surname" variant="outlined"
            value={surName}
            onChange={(e)=>setSurName(e.target.value)}/>
            <TextField id="outlined-basic" label="Password" variant="outlined"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
        </Box>
                <Button variant="contained" color="success" onClick={handleClick}>
                    Create User
                </Button>
            </Paper>
        </Container>
    );
}
