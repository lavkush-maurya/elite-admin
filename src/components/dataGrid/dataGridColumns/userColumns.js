import Typography from "../../common/Typography/Typography";
import Avatar from "@mui/material/Avatar";

export const userColumns = [
   {
      field: "name",
      headerName: "Name",
      headerAlign: "left",
      align: "left",
      width: 200,
      renderCell: (params) => {
         return (
            <div className="data-grid-flex-col">
               <Avatar alt="Remy Sharp" src={params?.row?.image || "/assets/avater.png"}
                  sx={{ width: 56, height: 56 }} />
               <Typography variant={"dataGridTitle"} color={"blue"}>
                  {params?.row?.name}
               </Typography>
            </div>
         );
      },
   },
   {
      field: "email",
      headerName: "Email",
      headerAlign: "left",
      align: "left",
      width: 200,
      renderCell: (params) => {
         return <Typography variant={"dataGridTitle"} color={"blue"}>
            {params?.row?.email}
         </Typography>;
      },
   },
   {
      field: "phone",
      headerName: "Phone Number",
      headerAlign: "left",
      align: "left",
      width: 200,
      renderCell: (params) => {
         return (
            <div className="with__bg gray_bg">
               <Typography variant={"dataGridTitle"} color={"blue"}>
                  {params?.row?.phoneNumber || "None"}
               </Typography>
            </div>
         );
      },
   },
   {
      field: "address",
      headerName: "Address",
      headerAlign: "left",
      align: "left",
      width: 350,
      renderCell: (params) => {
         return (
            <div className="row_address__wrapper">
               <Typography variant={"small"} color={"blue"}>
                  City: {params?.row?.city || "None"}
               </Typography>
               <Typography variant={"small"} color={"blue"}>
                  Shipping Address: {params?.row?.shippingAddress || "None"}
               </Typography>
            </div>
         );
      },
   },
   {
      field: "order",
      headerName: "Number of Order",
      headerAlign: "left",
      align: "left",
      width: 160,
      renderCell: (params) => {
         return (
            <div className="with__bg gray_bg">
               <Typography variant={"dataGridTitle"} color={"blue"}>
                  {params?.row?.purchases.length}
               </Typography>
            </div>
         );
      },
   },
   {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => {
         return (
            <div className={params?.row?.purchases.length ? `${"with__bg green_bg"}` : `${"with__bg yellow_bg"}`}>
               <Typography variant={"dataGridTitle"}>
                  {params?.row?.purchases.length ? "ACTIVE" : "IN-ACTIVE"}
               </Typography>
            </div>
         );
      },
   },
];
