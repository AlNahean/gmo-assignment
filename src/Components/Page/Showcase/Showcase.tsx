import { Stack } from "@mui/material";

import Table from "./Table";
import Depertments from "./Depertments";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useSnackbar } from "notistack";

const Showcase = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { isInfoCollected } = useGlobalContext();

  useEffect(() => {
    if (isInfoCollected === false) {
      navigate("/home");
      enqueueSnackbar(
        "You must enter their details before accessing this page.",
        { variant: "error" }
      );
    }
    return () => {};
  }, [isInfoCollected]);

  return (
    <div>
      <Stack
        direction="column"
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "background.paper",
          color: "text.primary",
        }}
      >
        <Table />

        <Depertments />
      </Stack>
    </div>
  );
};

export default Showcase;
