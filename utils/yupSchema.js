import * as yup from 'yup';

export const registrationSchema = yup.object().shape({
    login: yup.string()
      .min(3, "Must be 3 characters or more")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[0-9]/, "Must contain at least one digit"),
  });

 export const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Must contain at least one digit'),
  })