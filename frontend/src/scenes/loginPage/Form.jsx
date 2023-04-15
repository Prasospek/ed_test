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
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";


    const register = async (values, onSubmitProps) => {
        // this allows us to send form info with image
        const formData = new FormData();
        for (let value in values) {
            // sending image through request body ?
            formData.append(value, values[value]);
        }

        // public aseets name of the file and that will be our path
        formData.append("picturePath", values.picture.name);


        const savedUserResponse = await fetch(
            "http://localhost:8001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:8001/auth/login",
            {
                method: "POST",
                headers: {"Content-type": "application/json"},
                // formatted in corect way so i can just pass data
                body: JSON.stringify(values),
            }
        );

        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();

        if (loggedIn) {
            dispatch(
                // v reduxu state toto nastavuju state.user = action.payload.user
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            navigate("/home");
        }
    }

    // these arguments come from Formik
    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) {
            await login(values, onSubmitProps);
        }
        if (isRegister) {
            await register(values, onSubmitProps);
        }
    };
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
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{gridColumn: "span 2"}}
                                />
                                <TextField
                                    label={"Last Name"}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name={"lastName"}
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{gridColumn: "span 2"}}
                                />
                                <TextField
                                    label={"Location"}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name={"location"}
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{gridColumn: "span 4"}}
                                />
                                <TextField
                                    label={"Occupation"}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name={"occupation"}
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{gridColumn: "span 4"}}
                                />
                                <Box
                                    gridColumn={"span 4"}
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius={"5px"}
                                    padding={"1rem"}
                                >
                                    <Dropzone
                                        acceptedFiles={".jpg,.jpeg,.png"}
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({getRootProps, getInputProps}) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                padding={"1rem"}
                                                sx={{"&:hover": {cursor: "pointer"}}}
                                            >
                                                <input {...getInputProps()}/>
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>{values.picture.name}</FlexBetween>
                                                )}


                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                        <TextField
                            label={"Email"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name={"email"}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{gridColumn: "span 4"}}
                        />
                        <TextField
                            label={"Password"}
                            type={"password"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name={"password"}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{gridColumn: "span 4"}}
                        />
                    </Box>

                    {/*BUTTONS ! */}

                    <Box>
                        <Button
                            fullWidth
                            type={"submit"}
                            sx={{
                                margin: "2rem 0",
                                padding: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&hover": {color: palette.primary.main},
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>

                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light
                                },
                            }}
                        >
                            {isLogin ? "Don't have an account ? Sign Up here." : "Already have an account ? Login here."}
                        </Typography>

                    </Box>
                </form>
            )}
        </Formik>
    )
}


export default Form;