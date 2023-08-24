import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';
import BasicCard from '../../../components/common/Card/BasicCard';
import CardSkeleton from "../../../components/common/Skeleton/CardSkeleton";
import styles from "../styles/EarningPieChart.module.scss";
const COLORS = [
   '#0088FE',
   '#00C49F',
   '#FFBB28',
   '#FF8042',
   '#8884d8',
   '#3F497F',
   '#0081C9',
   '#ff7300',
   '#31C6D4',
   '#781C68',
   '#cd5c5c',
   '#205E61',
];

const PieChartComponent = ({ earningsData, loading }) => {
   return (
      <div className={styles.pie_chart_wrapper}>
         {loading &&
            <div className={styles.loading_skeleton}>
               <CardSkeleton variant={"circular"} width={320} height={320} />
            </div>}
         <BasicCard showTitle={false}>
            <ResponsiveContainer>
               <PieChart>
                  <Pie
                     dataKey="revenue"
                     nameKey="month"
                     data={earningsData}
                     label
                     fill="#8884d8"
                     colors={COLORS}
                  >
                     {earningsData && earningsData.length ? earningsData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     )) : null}
                  </Pie>
                  <Legend />
               </PieChart>
            </ResponsiveContainer>
         </BasicCard>
      </div>
   )
}

export default PieChartComponent;
