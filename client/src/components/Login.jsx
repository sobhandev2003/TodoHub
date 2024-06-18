import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useStateContext } from '../contexts/ContextProvider';
import { loginAccount } from '../service/user';
import { Link } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
});

const Login = () => {
  const {
    setUserDetails,
    setStoredTask,
    setFilterState } = useStateContext()
  const handelLogin = (loginDetails) => {
    loginAccount(
      loginDetails,
      setUserDetails,
      setStoredTask,
      setFilterState)
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handelLogin(values)
    },
  });

  return (
    <div className=' flex flex-col'>
      <form onSubmit={formik.handleSubmit} >
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
          Login
        </Button>
      </form>
      <div className='w-full flex justify-end mt-2'>
        <Link to="/request/forgot-password">
          <MuiLink>Forget Password</MuiLink>
        </Link>
      </div>
    </div>
  );
};

export default Login

