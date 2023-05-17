import { Stack } from "@mui/material";

import Table from "./Table";
import Depertments from "./Depertments";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Showcase = () => {
  const navigate = useNavigate();
  const { isInfoCollected } = useGlobalContext();

  useEffect(() => {
    if (isInfoCollected === false) {
      navigate("/home");
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
