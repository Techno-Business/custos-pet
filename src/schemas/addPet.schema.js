import * as yup from 'yup';

let AddPetSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    photo: yup.object().required('Select a photo'),
    age: yup.string().required('Age is required'),
    sex: yup.string().required('Sex is required'),
    category: yup.string().required('Category is required'),
});

export default AddPetSchema;
