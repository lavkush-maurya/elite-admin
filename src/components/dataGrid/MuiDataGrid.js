import React, { useState, useContext } from 'react';
import { Pagination, LinearProgress } from '@mui/material';
import Button from '../common/Button/Button';
import Icons from '../common/Icons/Icons';
import { useNavigate } from "react-router-dom";
import { useHttpHook } from "../../hooks/useHttpHook";
import Typography from "../common/Typography/Typography";
import toast from 'react-hot-toast';
import { Context } from "../../store/Context";
import { selectedSubCategory, updateState, getSelectedOrder } from "../../store/Action";
import {
   DataGrid,
   gridPageCountSelector,
   gridPageSelector,
   useGridApiContext,
   useGridSelector,
} from '@mui/x-data-grid';
import styles from "./styles/DataGrid.module.scss";

const MuiDataGrid = (
   {
      rowHeight = 49,
      page = 10,
      error,
      loading,
      rows = [],
      columns,
      shadow = "enable",
      editUrl,
      deleteUrl,
      isOrder = false,
      hideAction = false,
      viewUrl
   }
) => {
   const [selectedProduct, setSelectedProduct] = useState(null)
   const navigate = useNavigate()
   const { sendRequest } = useHttpHook();
   const { state, dispatch } = useContext(Context);
   const { darkMood } = state;

   //Sorting 
   const sortedRows = rows.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

   //Pagination
   const CustomPagination = () => {
      const apiRef = useGridApiContext();
      const page = useGridSelector(apiRef, gridPageSelector);
      const pageCount = useGridSelector(apiRef, gridPageCountSelector);

      return (
         <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            sx={
               {
                  marginTop: "1.5rem",
                  "& .Mui-disabled": {
                     color: darkMood ? "#7d879c" : "#b5b5b5"
                  },
                  "& .MuiButtonBase-root": {
                     color: darkMood ? "#e5e5e5" : "#3b3841"
                  },
                  "& .Mui-selected": {
                     color: "#FFF",
                     fontWeight: 700,
                     fontSize: "1rem"
                  }
               }
            }
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
         />
      );
   }
   //View Handler 
   const viewHandler = (rowData) => {
      dispatch(getSelectedOrder(rowData?.row))
      navigate(`${viewUrl}/${rowData?.id}`)
   }

   //Edit Handler
   const editHandler = (row) => {
      navigate(`${editUrl}/${row?.id}`)
      dispatch(selectedSubCategory({
         title: row?.row?.name,
         imageId: row?.row?.imageId,
         image: row?.row?.image,
         category: row?.row?.category?._id
      }))
   }
   //Get delete response data 
   const getResponseData = (data) => {
      if (data?.success) {
         dispatch(updateState(true))
         toast.success(deleteUrl === "/product/delete" ? "Product Deleted" : "Collection Deleted");
         setSelectedProduct(null)
      };
   };
   //Delete Handler

   const handleDelete = () => {
      if (selectedProduct) {
         sendRequest(
            {
               url: `${deleteUrl}/${selectedProduct?.id}`,
               method: "DELETE",
               postData: {
                  imageId: selectedProduct?.imageId
               }
            },
            getResponseData
         );
      };
   };

   const SortedDescendingIcon = () => {
      return <Icons name={"downArrow"} color={darkMood ? "#FFF" : "#7d879c"} />;
   }

   const SortedAscendingIcon = () => {

      return <Icons name={"upArrow"} color={darkMood ? "#FFF" : "#7d879c"} />;
   }

   const actionColumn = [
      {
         field: "action", headerName: "Actions", headerAlign: "center", sortable: false, filterable: false, align: "center", width: isOrder ? 100 : 220, renderCell: (row) => {
            return (
               <div className={"data-grid-flex-col"}>
                  {isOrder ?
                     <Button variant={"icon-btn-normal"}
                        onClick={() => { viewHandler(row) }}>
                        <Icons name={"viewOn"} color={"#7d879c"} />
                     </Button>
                     :
                     <>
                        <Button variant={"icon-btn-normal"}
                           onClick={() => { viewHandler(row) }}>
                           <Icons name={"viewOn"} color={"#7d879c"} />
                        </Button>
                        <Button
                           variant={"icon-btn-normal"}
                           onClick={() => { editHandler(row) }}>
                           <Icons name={"edit"} color={"#2c74b3"} />
                        </Button>
                        <Button
                           variant={"icon-btn-normal"}
                           onClick={() => { setSelectedProduct({ id: row?.id, imageId: row?.row?.imageId }) }}>
                           <Icons name={"delete"} color={"#cc2121"} />
                        </Button>
                     </>
                  }
               </div>
            )
         }
      },
   ]



   return (
      <div className={darkMood ? `${styles.data_grid_wrapper} ${styles[`shadow-${shadow}`]} ${"dark_mood_children"}` : `${styles.data_grid_wrapper} ${styles[`shadow-${shadow}`]} ${"light_mood_secondary"}`}>
         {selectedProduct &&
            <div className={styles.confirm_popup_wrapper}>
               <div className={darkMood ? `${styles.confirm_inner_wrapper} ${styles[`shadow-${shadow}`]} ${"dark_mood_popup"}` : `${styles.confirm_inner_wrapper} ${styles[`shadow-${shadow}`]} ${"light_mood_secondary"}`}>
                  <Typography variant={"small"} color={"red"}>
                     <Icons size={"2rem"} name={"warning"} />
                     Are you sure you want to delete this Product?
                  </Typography>
                  <div className={styles.warning_btns}>
                     <Button
                        variant={"blue_btn"}
                        onClick={handleDelete}>
                        Yes
                     </Button>
                     <Button
                        variant={"red-border"}
                        onClick={() => { setSelectedProduct(null) }}>
                        Cancel
                     </Button>
                  </div>
               </div>
            </div>
         }
         <div className={styles.loading_line}>
            {loading ? <LinearProgress /> : null}
         </div>
         <DataGrid
            rowHeight={rowHeight}
            rows={sortedRows}
            getRowId={(row) => row._id || row.id}
            columns={!hideAction ? columns.concat(actionColumn) : columns}
            error={error}
            // loading={loading}
            sx={{
               '& .MuiDataGrid-columnSeparator': {
                  display: 'none',
               },
               '&.MuiDataGrid-root': {
                  border: 'none',
                  width: "100%",
                  color: "#cc2121"
               },
               "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: darkMood ? "#144272" : "#F3F5F9",
                  color: darkMood ? "#FFF" : "#2b3445",
                  fontSize: 16
               },
               '&.MuiDataGrid-footerContainer': {
                  width: "2rem"
               },
               '& .MuiDataGrid-iconButtonContainer': {
                  visibility: 'visible',
               },
               '& .MuiDataGrid-sortIcon': {
                  opacity: 'inherit !important',
               },
               "& .MuiDataGrid-virtualScroller": {
                  justifyContent: "space-between",
               }
            }}
            defaultSortModel={[
               {
                  field: 'id',
                  sort: 'desc',
               },
            ]}
            pageSize={page}
            rowsPerPageOptions={[page]}
            components={{
               Pagination: CustomPagination,
               ColumnSortedDescendingIcon: SortedDescendingIcon,
               ColumnSortedAscendingIcon: SortedAscendingIcon,
            }}
            // hideFooter={true}
            hideFooterSelectedRowCount
            autoHeight
         />
      </div>
   )
}

export default MuiDataGrid;