// eslint-disable-next-line

import {
    Box, // provides a flexible container for laying out and aligning other components.
    Button, // provides a flexible container for laying out and aligning other components.
    TextField,  // provides a text input field with various styles and configurations.
    useMediaQuery, // velikost
    Typography, // that provides typographic styles for displaying text.
    useTheme,
} from "@mui/material";

import {useState} from "react"; //  manage state in a functional component.
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";    // represents an outlined edit icon.
import {Formik} from "formik";  //  A form management library for React that simplifies form handling and validation.
import * as yup from "yup"; // allows you to define and validate the shape of data.
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";    // allows you to dispatch Redux actions from a functional component.
import {setLogin} from "../../state";
import Dropzone from "react-dropzone";  //  provides a file upload dropzone with various configurations.
import FlexBetween from "../../components/FlexBetween";

// validating inputs
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid email!").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email!hehe").required("required"),
    password: yup.string().required("required"),
})


const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    // displaying register or login depending on if he already registered
    const [pageType, setPageType] = useState("login");
    // {palette} palette.secondary
    // palett palette.palette.secondary

    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login;"
    const isRegister = pageType === "register;"

    // these arguments come from Formik
    const handleFormSubmit = async (values, onSubmitProps) => {
        return (

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                validationSchema={isLogin ? loginSchema : registerSchema}
            >

                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                      resetForm,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display={"grid"}
                            gap={"30px"}
                            gridTemplateColumns={"repeat(4, minmax(0,1fr))"}
                            sx={{
                                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                            }}
                        >
                            {isRegister && (
                                <>
                                    <TextField
                                        label={"First Name"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name={"firstName"}
                                        errror={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{gridColumn: "span 2"}}
                                    />
                                    <TextField
                                        label={"Last Name"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name={"lastName"}
                                        errror={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        sx={{gridColumn: "span 2"}}
                                    />
                                    <TextField
                                        label={"Location"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        name={"location"}
                                        errror={Boolean(touched.location) && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                        sx={{gridColumn: "span 4"}}
                                    />
                                    <TextField
                                        label={"Occupation"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        name={"lastName"}
                                        errror={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                        helperText={touched.occupation && errors.occupation}
                                        sx={{gridColumn: "span 4"}}
                                    />
                                    <Box
                                        gridColumn={"span 4"}
                                        border={`1px solid ${palette.neutral.medium}`}
                                        borderRadius={"5px"}
                                        padding={"1rem"}
                                    >

                                    </Box>
                                </>
                            )}
                        </Box>
                    </form>
                )}
            </Formik>
        )
    }
}


export default Form;