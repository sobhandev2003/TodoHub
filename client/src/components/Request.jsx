import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { resendOtp } from '../service/user';
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});
const Request = () => {
  const params = useParams();
  const navigate = useNavigate()
  const { reason } = params

  const handelRequest = async ({ email }) => {
    const res = await resendOtp(email);
    if (res) {
      navigate(`/verify/${reason.toLocaleLowerCase()}/${email}`)
    }
  }
//NOTE - Formik for handel form input ,error, and submit
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handelRequest(values);
    },
  });

  useEffect(() => {
    if (reason.toLocaleLowerCase() !== "forgot-password" && reason.toLocaleLowerCase() !== "active-account") {
      navigate("/")
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className=' pt-12 '>
      <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit} >
        <TextField
          required
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth

        />
        <Button color="primary" variant="contained" fullWidth type="submit" >
          Send request for {reason.toLocaleLowerCase() === "forgot-password" ? "password reset" : "active account"}
        </Button>
      </form>
    </div>
  )
}

export default Request
