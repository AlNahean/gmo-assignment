import { useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import * as Yup from "yup";

import { Formik, FormikFormProps } from "formik";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Home = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { userInfo, setUserInfo, setIsInfoCollected } = useGlobalContext();
  const formRef = useRef(null);

  return (
    <Box sx={{ backgroundColor: "background.paper" }}>
      <Container
        maxWidth="md"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
            setUserInfo(values);
            localStorage.setItem("userdata", JSON.stringify(values));
            navigate("/showcase");
            setIsInfoCollected(true);
            enqueueSnackbar("Success", { variant: "success" });
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
