import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
function TextFields({ label ,setTaskName}) {
    const handelChange = (e) => {
        setTaskName(e.target.value)
    }
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label={label} onChange={handelChange} variant="outlined" required={true} />
        </Box>
    );
}
export default TextFields
