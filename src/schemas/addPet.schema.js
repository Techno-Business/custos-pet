import * as yup from 'yup';

let AddPetSchema = yup.object().shape({
    name: yup.string().required(),
    photo: yup.object().required('Select a photo'),
    weight: yup.string().required('Weight is required'),
    age: yup.string().required('Age is required'),
    sex: yup.string().required('Sex is required'),
    species: yup.string().required('Species is required'),
    breed: yup.string().required('Breed is required'),
});

export default AddPetSchema;
