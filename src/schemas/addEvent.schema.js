import * as yup from "yup";

let AddEventSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  date: yup.string().min(10, "Enter a valid date").required("Date is required"),
  street: yup.string(),
  number: yup.string(),
  postalCode: yup.string(),
  neighbourhood: yup.string(),
});

export default AddEventSchema;
