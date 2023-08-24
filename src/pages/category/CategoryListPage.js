import React, { useContext } from 'react';
import PageLayout from "../../layouts/PageLayout";
import MuiDateGrid from "../../components/dataGrid/MuiDataGrid";
import { categoryColumns } from "../../components/dataGrid/dataGridColumns/categoryColumns";
import styles from "./styles/CategoryListPage.module.scss";
import { Context } from "../../store/Context";
import PageTitle from '../../components/common/PageTitle/PageTitle';
const CategoryListPage = () => {
   const { state } = useContext(Context);
   const { category, isLoading, error } = state;
   return (
      <PageLayout>
         <div className={styles.category_page_wrapper}>
            <PageTitle
               title={"Category List"}
               linkTo={"/category/create-new"}
               btnTitle={"Create New Category"} />
            <div className={styles.data_grid_wrapper}>
               <MuiDateGrid
                  columns={categoryColumns}
                  rows={category}
                  rowHeight={100}
                  loading={isLoading}
                  error={error}
                  editUrl={"/category/edit"}
                  deleteUrl={"/category/remove"}
               />
            </div>
         </div>
      </PageLayout>
   )
}

export default CategoryListPage;