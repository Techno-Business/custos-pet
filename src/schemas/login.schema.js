import * as yup from 'yup';

let loginSchema = yup.object().shape({
    email: yup.string().email('Enter a valid email address').required('Email address is required'),
    password: yup.string().required('Password is required')
});

export default loginSchema;