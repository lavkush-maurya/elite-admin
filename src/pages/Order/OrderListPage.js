import React, { useState, useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import MuiDataGrid from "../../components/dataGrid/MuiDataGrid";
import { orderColumns } from "../../components/dataGrid/dataGridColumns/orderColumns";
import styles from "./styles/OrderListPage.module.scss";
import { useHttpHook } from "../../hooks/useHttpHook";
import PageTitle from "../../components/common/PageTitle/PageTitle";

const OrderListPage = () => {
   const [orderData, setOrderData] = useState([]);
   const getOrderData = (data) => {
      setOrderData(data?.order)
   }
   const { sendRequest, hasError, loading } = useHttpHook()

   useEffect(() => {
      sendRequest({ url: "/orders/all" }, getOrderData)
   }, [sendRequest])
   return (
      <PageLayout>
         <div className={styles.order_page_wrapper}>
            <PageTitle title={" Order List"} showBtn={false} />
            <div className={styles.data_grid_wrapper}>
               <MuiDataGrid
                  columns={orderColumns}
                  rows={orderData}
                  rowHeight={100}
                  isOrder={true}
                  page={5}
                  error={hasError}
                  loading={loading}
                  viewUrl={"/order-details"}
               />
            </div>
         </div>
      </PageLayout>
   )
}

export default OrderListPage;