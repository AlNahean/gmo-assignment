import { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

type Props = {};

interface SubDepertmentType {
  title: string;
  id: number;
  parentID: number;
  checked: boolean;
  intermideate: boolean;
}
interface SubDepertmentsType extends Array<SubDepertmentType> {}

type DepertmentDataType = {
  depertment: string;
  parent: boolean;
  id: number;
  checked: boolean;
  intermideate: boolean;
  sub_departments: SubDepertmentsType;
};

type DepertmentsDataType = DepertmentDataType[];

// type Test = {
//   depertment: string;
//   parent: boolean;
//   id: number;
//   checked: boolean;
//   intermideate: boolean;
//   sub_departments: {
//     title: string;
//     id: number;
//     parentID: number;
//     checked: boolean;
//     intermideate: boolean;
//   }[];
// }[];

// given basic data
let depertmentsData = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];
let DepertmentsData: DepertmentsDataType;

//my formatted data so i can use it easily in react
DepertmentsData = depertmentsData.map((item, index) => {
  let subItem = item.sub_departments.map((t, i) => {
    return {
      title: t,
      id: i,
      parentID: index,
      checked: false,
      intermideate: false,
    };
  });

  return {
    depertment: item.department,
    parent: true,
    id: index,
    checked: false,
    intermideate: false,
    sub_departments: subItem,
  };
});

const Depertment = (props: Props) => {
  const [depertments, setDepertments] =
    useState<DepertmentsDataType>(DepertmentsData);

  const handleParentChange = (parentID: number) => {
    let cachedDepertments: DepertmentsDataType = depertments;

    //to check if parent depertments checked or intermideate checked
    let checked = depertments[parentID].checked;
    let intermideate = depertments[parentID].intermideate;
    let none =
      depertments[parentID].checked || depertments[parentID].intermideate;

    //if all checked all will be unchecked
    if (checked) {
      cachedDepertments = depertments.map((item) => {
        if (item.id === parentID) {
          let cItem;

          cItem = item.sub_departments.map((subItem) => {
            subItem.checked = false;
            return subItem;
          });
          item.checked = false;

          item.sub_departments = cItem;

          item.intermideate = false;
        }

        return item;
      });
      // cachedDepertments[parentID].checked = false;
    }
    // if some of them checked then all will be unchecked
    if (intermideate) {
      cachedDepertments = depertments.map((item) => {
        if (item.id === parentID) {
          let cItem;

          cItem = item.sub_departments.map((subItem) => {
            subItem.checked = false;
            return subItem;
          });
          item.checked = false;
          item.intermideate = false;

          item.sub_departments = cItem;
        }

        return item;
      });
    }

    //if none is checked then all will be checked
    if (!none) {
      cachedDepertments = depertments.map((item) => {
        if (item.id === parentID) {
          let cItem;

          cItem = item.sub_departments.map((subItem) => {
            subItem.checked = true;
            return subItem;
          });
          item.checked = true;

          item.sub_departments = cItem;

          item.intermideate = false;
        }

        return item;
      });
    }

    // cachedDepertments[parentID].checked = !cachedDepertments[parentID].checked;

    setDepertments([...cachedDepertments]);
  };
  const handleChildChange = (parentID: number, childId: number) => {
    let cachedDepertments: DepertmentsDataType = depertments;

    cachedDepertments = depertments.map((t) => {
      if (t.id === parentID) {
        //make the clcked one >>true<<
        t.sub_departments[childId].checked =
          !t.sub_departments[childId].checked;

        let some = t.sub_departments.some((sub) => sub.checked === true);
        let every = t.sub_departments.every((sub) => sub.checked === true);

        // console.log({ some, every });

        //if some of them are checked then parent will be set to checked and intermideate --else-- both will be >>false<<
        if (some) {
          // t.checked = true;
          t.intermideate = true;
          // console.log(t);
        } else {
          t.checked = false;
          t.intermideate = false;
        }
        if (every) {
          t.checked = true;
          t.intermideate = false;
          // console.log(t);
        } else {
          t.checked = false;
          // t.intermideate = false;
        }

        return t;
      } else {
        return t;
      }
    });
    setDepertments([...cachedDepertments]);
  };
  return (
    <div>
      {depertments.map((item: DepertmentDataType) => {
        //* State is used to enable accordion */
        const [state, setState] = useState<boolean>(true);

        return (
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={item.checked}
                indeterminate={item.intermideate}
                onChange={() => {
                  handleParentChange(item.id);
                }}
              />
              <Typography
                variant="body1"
                color="red"
                onClick={() => {
                  setState(!state);
                }}
              >
                {item.depertment}
              </Typography>
            </Box>
            {/* State is used to enable accordion */}
            {state &&
              item.sub_departments.map((sub: SubDepertmentType) => {
                return (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "2rem",
                      }}
                    >
                      <Checkbox
                        checked={sub.checked}
                        indeterminate={sub.intermideate}
                        onChange={() => {
                          handleChildChange(item.id, sub.id);
                        }}
                      />
                      <Typography variant="body1" color="red">
                        {sub.title}
                      </Typography>
                    </Box>
                  </>
                );
              })}
          </>
        );
      })}
    </div>
  );
};

export default Depertment;
