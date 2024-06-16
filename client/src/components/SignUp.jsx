import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { registerAccount } from '../service/user';
import { useStateContext } from '../contexts/ContextProvider';

const validationSchema = yup.object({
    userName: yup
        .string("Enter your name")
        .min(3, 'Name must be at least 3 characters long')
        .required("Name required"),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(4, 'Password should be of minimum 4 characters length')
        .required('Password is required'),
});

const SignUp = () => {
    const {setIsOtpEnter,setISAccountVerify,setVerifyEmail}=useStateContext()
    //NOTE - Handel account creation
    const handelAccountRegister=(userDetails)=>{
        registerAccount(userDetails,setIsOtpEnter,setISAccountVerify,setVerifyEmail)
        // console.log(userDetails);
    }

    const formik = useFormik({
        initialValues: {
            userName:'',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            handelAccountRegister(values)
        },
    });

    return (
        <div >
            <form onSubmit={formik.handleSubmit} >
            <TextField
                    variant="standard"
                    fullWidth
                    id="userName"
                    name="userName"
                    label="UserName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                    helperText={formik.touched.userName && formik.errors.userName}
                    margin='normal'
                />
                <TextField
                    variant="standard"
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin='normal'

                />
                <TextField
                    variant="standard"
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin='normal'
                />
                <Button color="primary" variant="contained" fullWidth type="submit" >
                    Sign up
                </Button>
            </form>
        </div>
    );
};

export default SignUp
