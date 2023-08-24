import React, { useEffect, useState } from 'react';
import PageLayout from '../../layouts/PageLayout';
import styles from "./styles/Earnings.module.scss";
import EarningsPieChart from "./Components/EarningsPieChart";
import RevenueTable from './Components/RevenueTable';
import PageTitle from "../../components/common/PageTitle/PageTitle";
import { useHttpHook } from '../../hooks/useHttpHook';
const Earnings = () => {
   const [analyticsData, setAnalyticsData] = useState([])
   const { sendRequest, loading } = useHttpHook();

   //Get response data from server
   const getAnalyticsData = (data) => {
      setAnalyticsData(data)
   }

   //Fetch analytics data
   useEffect(() => {
      sendRequest(
         {
            url: "/admin/analytics"
         },
         getAnalyticsData
      )
   }, [sendRequest]);
   return (
      <PageLayout>
         <section className={styles.earnings_page_content_wrapper}>
            <PageTitle title={"Revenue Summary"} showBtn={false} />
            <EarningsPieChart
               loading={loading}
               earningsData={analyticsData?.monthlyRevenueArray}
            />
            <div className={styles.revenue_table_wrapper}>
               <RevenueTable
                  loading={loading}
                  revenue={analyticsData?.monthlyRevenueArray}
               />
            </div>
         </section>
      </PageLayout>
   )
}

export default Earnings;