import * as yup from 'yup';

let signupSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Enter a valid email address').required('Email address is required'),
    password: yup.string().required('Password is required'),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords must be the same')
    .required('Confirm password is required')
});

export default signupSchema;