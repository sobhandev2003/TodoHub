import { Button, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import { forgotPassword } from '../service/user';
import { useNavigate, useParams } from 'react-router-dom';
export const ResetPassword = () => {
    const params = useParams();
    const navigate = useNavigate()
    const { email } = params;
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [password, setPassword] = useState("");
    const handelForgotPassword = () => {

        if (passwordValidator()) {
            forgotPassword(email, password, navigate)
        }
    }
    const passwordValidator = () => {
        if (/\s/.test(password)) {
            setError("Password should not contain spaces")
        }
        else if (password.length < 4) {

            setError("Password must be 4 character long")
        }
        else {
            setError(null)
            return true;
        }
    }
    useEffect(() => {
        passwordValidator()
        // eslint-disable-next-line
    }, [password])
    return (
        <div className='flex flex-col'>
            <FormControl variant="outlined" required >
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    onChange={(e) => setPassword(e.target.value)}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            {error && <p className=' text-red-600'>{error}</p>}
            <Button sx={{ marginTop: "10px" }} variant="contained" onClick={handelForgotPassword}>Update password</Button>
            <div className=' flex  mt-16 justify-center'>
                <Button onClick={() => navigate("/")}>Back To Home</Button>
            </div>

        </div>
    )
}
