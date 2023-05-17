import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface ResponseDataType {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "userId",
    headerName: "User ID",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    editable: true,
  },
  {
    field: "body",
    headerName: "Body",
    width: 250,
    editable: true,
  },
];
//----> to calculate the total width of the column <-------
// let width = columns.reduce((accumulator, b) => {
//   let cWidth = 0;

//   if (b.width) {
//     cWidth = b.width;
//   }
//   return accumulator + cWidth;
// }, 0);

const Table = () => {
  const [tableData, setTableData] = useState<ResponseDataType[] | []>([]);

  const getData = async () => {
    let response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    let ResponseData: ResponseDataType[] = response.data;

    setTableData(ResponseData);
  };

  // alert(width);

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return (
    <Box>
      <Box
        sx={{
          marginTop: "200px",
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <DataGrid
          rows={tableData}
          // rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          // sx={{ width: `${width + 100}px` }}
        />
      </Box>
    </Box>
  );
};

export default Table;
