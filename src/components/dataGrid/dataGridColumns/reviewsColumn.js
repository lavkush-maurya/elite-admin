import Typography from "../../common/Typography/Typography";
import { Rating } from "@mui/material";

export const reviewsColumns = [
   {
      field: "id", headerName: "Customer", minWidth: 300, renderCell: (params) => {
         return (
            <div className="user_details">
               <img src={params?.row?.image ? params?.row?.image : "/assets/avater.png"} alt="product.png" />
               <div className="name_and_id">
                  <Typography variant={"dataGridTitle"} color={"blue"}>
                     {params?.row?.user?.name}
                  </Typography>
                  <Typography variant={"dataGridSmall"} color={"blue"}>
                     ID: {params?.row?.user?._id}
                  </Typography>
               </div>
            </div>
         )
      }
   },
   {
      field: "product", headerName: "Product", minWidth: 380, align: "left", headerAlign: "left",
      renderCell: (params) => {
         return (
            <div className="product_details">
               <img src={params?.row?.product?.image} alt="product.png" />
               <Typography variant={"dataGridSubTitle"} color={"blue"}>
                  {params?.row?.product?.title}
               </Typography>
            </div>
         )

      }
   },
   {
      field: "review", headerName: "Review", align: "left", minWidth: 380, headerAlign: "left", renderCell: (params) => {
         return <div className="review_column">
            <Rating readOnly size="small" value={parseInt(params?.row?.rating)} />
            <Typography
               variant={"small"}
               color={"blue"}>
               {params?.row?.comment}
            </Typography>
         </div>
      }
   },
   {
      field: "status", headerName: "Status", minWidth: 130, align: "center", headerAlign: "center",
      renderCell: (_params) => {
         return (
            <div className="green_bg with__bg">
               <Typography variant={"dataGridSubTitle"} color={"blue"}>
                  PUBLISHED
               </Typography>
            </div>
         )

      }
   },


]

