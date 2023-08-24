import Typography from "../../common/Typography/Typography";
import dayjs from "dayjs";

export const orderColumns = [
  {
    field: "id",
    headerName: "Order Id",
    width: 250,
    renderCell: (params) => {
      return (
        <Typography variant={"small"} color={"blue"}>
          ID: {params?.row?._id}
        </Typography>
      );
    },
  },
  {
    field: "phone",
    headerName: "Customer Phone",
    headerAlign: "left",
    align: "left",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="with__bg gray_bg">
          <Typography variant={"dataGridTitle"} color={"blue"}>
            {params?.row?.phoneNumber}
          </Typography>
        </div>
      );
    },
  },
  {
    field: "address",
    headerName: "Shipping Address",
    headerAlign: "left",
    align: "left",
    width: 350,
    renderCell: (params) => {
      return (
        <div className="row_address__wrapper">
          <Typography variant={"small"} color={"blue"}>
            User: {params?.row?.user?.name}
          </Typography>
          <Typography variant={"small"} color={"blue"}>
            City: {params?.row?.city}
          </Typography>
          <Typography variant={"small"} color={"blue"}>
            Shipping Address: {params?.row?.shippingAddress}
          </Typography>
        </div>
      );
    },
  },
  {
    field: "date",
    headerName: "Order Date",
    headerAlign: "left",
    align: "left",
    width: 200,
    renderCell: (params) => {
      return (
        <Typography variant={"small"} color={"blue"}>
          {dayjs(params?.row?.updatedAt).format("MMM D, YYYY h:mm A")}
        </Typography>
      );
    },
  },
  {
    field: "status",
    headerName: "Order Status",
    headerAlign: "left",
    align: "left",
    width: 150,
    renderCell: (params) => {
      return (
        <div
          className={`with__bg ${
            params?.row?.orderStatus === "PENDING"
              ? "yellow_bg"
              : params?.row?.orderStatus === "SHIPPED"
              ? "blue_bg"
              : params?.row?.orderStatus === "DELIVERED"
              ? "green_bg"
              : params?.row?.orderStatus === "CANCELED"
              ? "red_bg"
              : ""
          }`}
        >
          <Typography variant={"small"} color={"blue"}>
            {params?.row?.orderStatus}
          </Typography>
        </div>
      );
    },
  },
];
