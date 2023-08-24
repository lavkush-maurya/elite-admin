import Typography from "../../common/Typography/Typography";

export const productColumns = [
   {
      field: "_id", headerName: "Product Overview", minWidth: 300, renderCell: (params) => {
         return (
            <div className="product_details">
               <img src={params?.row?.image} alt="product.png" />
               <div className="price_and_id">
                  <Typography variant={"dataGridTitle"} color={"blue"}>
                     {params?.row?.title}
                  </Typography>
                  <Typography variant={"dataGridSmall"} color={"blue"}>
                     ID: {params?.row?._id}
                  </Typography>
               </div>
            </div>
         )
      }
   },
   {
      field: "subCategory", headerName: "Category / Sub Category", minWidth: 200, align: "center", headerAlign: "center",
      renderCell: (params) => {
         return <Typography variant={"dataGridSubTitle"} color={"blue"}>
            {params?.row?.category?.name} / {params?.row?.subCategory?.name}
         </Typography>
      }
   },
   {
      field: "Stock", headerName: "Availability", align: "center", minWidth: 150, headerAlign: "center", renderCell: (params) => {
         return <div
            className={params?.row?.stock <= 0 ? "with__bg red_bg" : "with__bg gray_bg"}>
            <Typography
               variant={"small"}
               color={params?.row?.stock <= 0 ? "red" : "green"}>
               {params?.row?.stock}
            </Typography>
         </div>
      }
   },
   {
      field: "sold", headerName: "Sales", align: "center", minWidth: 150, headerAlign: "center", renderCell: (params) => {
         return (
            <div className="with__bg blue_bg">
               <Typography variant={"small"} color={"blue"}>
                  {params?.row?.sold}
               </Typography>
            </div>
         )
      }
   },
   {
      field: "price", headerName: "Product Cost", minWidth: 200, headerAlign: "center", align: "center", renderCell: (params) => {
         return (
            <Typography variant={"body"} color={"blue"}>
               &#2547; {params?.row?.price?.toFixed(2)}
            </Typography>
         )
      }
   },

]

