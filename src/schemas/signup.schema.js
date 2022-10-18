import * as yup from 'yup';

let signupSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string()
        .email('Enter a valid email address')
        .required('Email address is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/,
            'Password must contain: number, lower/upper case letter and a special character'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must be the same')
        .required('Password confirmation is required')
});

export default signupSchema;