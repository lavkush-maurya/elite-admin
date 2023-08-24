import Typography from "../../common/Typography/Typography";

export const subCategoryColumns = [
   {
      field: "id", headerName: "Sub-Category Id", width: 260, renderCell: (params) => {
         return (
            <Typography variant={"small"} color={"paragraph"}>
               ID: {params?.row?._id}
            </Typography>
         )
      }
   },
   {
      field: "_id", headerName: "Sub-Category Image", headerAlign: "center", align: "center", width: 250, renderCell: (params) => {
         return (
            <div className="category_img">
               <img src={params?.row?.image} alt="product.png" />
            </div>
         )
      }
   },
   {
      field: "name", headerName: "Sub-Category Name", headerAlign: "center", align: "center", width: 250, renderCell: (params) => {
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
      field: "category", headerName: "Parent Category", flex: 1, headerAlign: "center", align: "center", width: 210, renderCell: (params) => {
         return (
            <div className="with__bg gray_bg">
               <Typography variant={"dataGridTitle"}>
                  {params?.row?.category?.name}
               </Typography>
            </div>
         )
      }
   },
]

