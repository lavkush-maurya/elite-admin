import Typography from "../../common/Typography/Typography";

export const categoryColumns = [
   {
      field: "id", headerName: "Category Id", minWidth: 300, renderCell: (params) => {
         return (
            <Typography variant={"body"} color={"paragraph"}>
               ID: {params?.row?._id}
            </Typography>
         )
      }
   },
   {
      field: "name", headerName: "Category Name", minWidth: 300, headerAlign: "center", align: "center", renderCell: (params) => {
         return (
            <div className="with__bg blue_bg">
               <Typography variant={"dataGridTitle"} color={"paragraph"}>
                  {params?.row?.name}
               </Typography>
            </div>
         )
      }
   },
   {
      field: "image", headerName: "Category Image", minWidth: 300, headerAlign: "center", align: "center", renderCell: (params) => {
         return (
            <div className="category_img">
               <img src={params?.row?.image} alt="product.png" />
            </div>
         )
      }
   }
]

