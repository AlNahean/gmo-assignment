import { useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme, Theme } from "@emotion/react";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import * as Yup from "yup";

// import MuiPhoneNumber from "material-ui-phone-number";

import { Formik, Form, FormikProps, FormikFormProps } from "formik";

import { useNavigate } from "react-router-dom";

// import {  Theme } from '@material-ui/core/styles';
type Props = {};
type userInputProps = {
  name: String;
  email: String;
  phoneNumber: Number | String;
};

const Home = (props: Props) => {
  const navigate = useNavigate();
  // const theme: Theme = useTheme();
  const { userInfo, setUserInfo, isInfoCollected, setIsInfoCollected } =
    useGlobalContext();
  const formRef = useRef(null);
  // const [userInfo, setUserInfo] = useState<userInputProps>({
  //   name: "",
  //   email: "",
  //   phoneNumber: "",
  // });

  // const handleSubmit = (values: {
  //   name: String;
  //   email: String;
  //   phoneNumber: Number;
  // }) => {
  //   console.log(values);
  //   setUserInfo(values);
  //   localStorage.setItem("userdata", JSON.stringify(values));
  //   navigate("/Test");
  // };

  // useEffect(() => {
  //   console.log(
  //     formRef,
  //     "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  //     userInfo
  //   );
  //   // !userInfo.name && navigate("/Test");
  //   return () => {};
  // }, []);

  return (
    <Box sx={{ backgroundColor: "background.paper" }}>
      <Container
        maxWidth="md"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // flexDirection: "column",
          // width: "100vw",
        }}
      >
        <Formik
          enableReinitialize
          innerRef={formRef}
          initialValues={userInfo}
          validationSchema={Yup.object({
            name: Yup.string().max(20).required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            phoneNumber: Yup.number()
              .min(90)
              .typeError("That doesn't look like a phone number")
              .positive("A phone number can't start with a minus")
              .integer("A phone number can't include a decimal point")
              .required("A phone number is required"),
          })}
          onSubmit={(values) => {
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 400);
            // alert("value", values);
            // handleFormSubmit(values);
            // alert("submitted");
            // console.log("Values", values);
            // handleSubmit(values);

            setUserInfo(values);
            localStorage.setItem("userdata", JSON.stringify(values));
            navigate("/showcase");
            setIsInfoCollected(true);
          }}
        >
          {(formik: FormikFormProps) => {
            return (
              <>
                <Box
                  component="form"
                  sx={{
                    //   "& > :not(style)": { m: 1, width: "25ch" },
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "5px",
                    //   width: "100%",
                    // border: "1px solid red",
                    gap: "2rem",
                    padding: {
                      lg: "2rem",
                      md: "1rem",
                      xs: "1rem",
                    },
                    backgroundColor: "grey.900",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Name"
                    variant="outlined"
                    placeholder="Enter your name"
                    error={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                    helperText={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : ""
                    }
                    {...formik.getFieldProps("name")}
                  />
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    placeholder="Enter your e-mail"
                    // value={userInfo?.email}
                    error={
                      formik.touched.email && formik.errors.email ? true : false
                    }
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : ""
                    }
                    {...formik.getFieldProps("email")}
                  />
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    placeholder="Enter your phone number"
                    error={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? formik.errors.phoneNumber
                        : ""
                    }
                    {...formik.getFieldProps("phoneNumber")}
                  />

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      // handleSubmit();
                      formik.submitForm();
                    }}
                    size="large"
                  >
                    Submit
                  </Button>
                </Box>
              </>
            );
          }}
        </Formik>
      </Container>
    </Box>
  );
};

export default Home;
