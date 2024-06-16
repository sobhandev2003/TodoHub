import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useStateContext } from '../contexts/ContextProvider';
import { loginAccount } from '../service/user';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    // .min(4, 'Password should be of minimum 8 characters length')
    // .required('Password is required'),
});

const Login = () => {
    //FIXME - 
    const {setIsAuth}=useStateContext()
    const handelLogin=(loginDetails)=>{
      loginAccount(loginDetails,setIsAuth)
    }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handelLogin(values)
    },
  });

  return (
    <div >
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
    </div>
  );
};

export default Login

