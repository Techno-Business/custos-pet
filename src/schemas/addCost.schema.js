import * as yup from 'yup';

let AddCostSchema = yup.object().shape({
    petId: yup.array().of(yup.string()).required('Pet is required'),
    type: yup.string().required('Type is required'),
    date: yup.string().min(10, 'Enter a valid date').required('Date is required'),
    brand: yup.string(),
    weight: yup.string(),
    goal: yup.string().required('Goal is required'),
    price: yup.string().required('Price is required'),
});

export default AddCostSchema;
