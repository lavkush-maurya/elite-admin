import React, { useContext } from 'react';
import PageLayout from "../../layouts/PageLayout";
import MuiDataGrid from '../../components/dataGrid/MuiDataGrid';
import styles from "./styles/ProductListPage.module.scss";
import { productColumns } from "../../components/dataGrid/dataGridColumns/productColumns";
import { Context } from "../../store/Context";
import PageTitle from "../../components/common/PageTitle/PageTitle";

const ProductsListPage = () => {
   const { state } = useContext(Context);
   const { products, isLoading, error } = state;
   // console.log(products)

   return (
      <PageLayout>
         <div className={styles.product_list_page_wrapper}>
            <PageTitle
               title={"Products List"}
               linkTo={"/product/create-new"}
               btnTitle={" Create New Product"} />
            <div className={styles.data_grid_wrapper}>
               <MuiDataGrid
                  loading={isLoading}
                  error={error}
                  rows={products}
                  columns={productColumns}
                  rowHeight={70}
                  page={7}
                  viewUrl={"/product/single"}
                  editUrl={"/product/edit"}
                  deleteUrl={"/product/delete"}
               />
            </div>
         </div>
      </PageLayout>
   )
}

export default ProductsListPage;