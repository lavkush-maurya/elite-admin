import React, { useContext, useEffect, useState } from 'react';
import styles from "./styles/Home.module.scss";
import Widgets from '../../components/Widgets/Widgets';
import AreaCharts from '../../components/Charts/AreaCharts';
import PageLayout from '../../layouts/PageLayout';
import MuiDataGrid from "../../components/dataGrid/MuiDataGrid";
import { stockOutColumns } from "../../components/dataGrid/dataGridColumns/StockOutProducts";
import BacsicCard from "../../components/common/Card/BasicCard";
import { Context } from "../../store/Context";
import { useHttpHook } from '../../hooks/useHttpHook';

const HomePage = () => {
   const [analyticsData, setAnalyticsData] = useState([])
   const { state } = useContext(Context);
   const { products, isLoading, error } = state;

   //Get stock out products
   const stockoutProducts = products.filter((item) => item?.stock <= 0)

   //Get response data from server
   const getResponseData = (data) => {
      setAnalyticsData(data)
   }

   //useHttpHook
   const { sendRequest, loading } = useHttpHook()

   //Fetch analytics data
   useEffect(() => {
      sendRequest(
         {
            url: "/admin/analytics"
         },
         getResponseData
      )
   }, [sendRequest]);

   return (
      <PageLayout>
         <Widgets
            loading={loading}
            analyticsData={analyticsData}
         />
         <AreaCharts
            loading={loading}
            revenue={analyticsData?.monthlyRevenueArray}
         />
         <div className={styles.stockout_section}>
            <BacsicCard title={"Stock Out Products"}>
               <MuiDataGrid
                  shadow={"disable"}
                  columns={stockOutColumns}
                  rows={stockoutProducts}
                  loading={isLoading}
                  error={error}
                  viewUrl={"/product/single"}
                  editUrl={"/product/edit"}
                  deleteUrl={"/product/delete"}
                  rowHeight={90}
               />
            </BacsicCard>
         </div>
      </PageLayout>
   )
}

export default HomePage;