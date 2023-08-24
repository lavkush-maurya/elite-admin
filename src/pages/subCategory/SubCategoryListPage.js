import React, { useEffect, useState } from 'react';
import PageLayout from "../../layouts/PageLayout";
import MuiDataGrid from "../../components/dataGrid/MuiDataGrid";
import { subCategoryColumns } from "../../components/dataGrid/dataGridColumns/subCategoryColumns";
import styles from "./styles/SubCategoryListPage.module.scss";
import { useHttpHook } from "../../hooks/useHttpHook";
import PageTitle from "../../components/common/PageTitle/PageTitle";

const SubCategoryListPage = () => {
   const [subCategory, setSubCategory] = useState([])
   const getSubCategoryData = (data) => {
      setSubCategory(data?.subCategories)
   }
   const { sendRequest, hasError, loading } = useHttpHook()
   useEffect(() => {
      sendRequest({ url: "/sub-category/list/all" }, getSubCategoryData)
   }, [sendRequest])
   return (
      <PageLayout>
         <div className={styles.sub_category_page_wrapper}>
            <PageTitle
               title={"Sub-Category List"}
               linkTo={"/sub-category/create-new"}
               btnTitle={"Add Sub-Category"} />
            <div className={styles.sub_category_data_grid_wrapper}>
               <MuiDataGrid
                  columns={subCategoryColumns}
                  rows={subCategory}
                  loading={loading}
                  error={hasError}
                  rowHeight={100}
                  page={5}
                  deleteUrl={"/sub-category/remove"}
                  editUrl={"/sub-category/edit"}
               />
            </div>
         </div>
      </PageLayout>
   )
}

export default SubCategoryListPage;