import React, { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Typography from '../common/Typography/Typography';
import styles from "./styles/AreaChart.module.scss";
import { Context } from "../../store/Context";
import CardSkeleton from '../common/Skeleton/CardSkeleton';

const AreaCharts = ({ loading, revenue }) => {
   const { state } = useContext(Context);
   const { darkMood } = state;

   return (
      <div className={darkMood ? `${styles.area_chart_wrapper} ${"dark_mood_secondary"}` : `${styles.area_chart_wrapper} ${"light_mood_secondary"}`}>
         <Typography variant={"widgetTitle"} color={"paragraph "}>
            Last Year Revenue
         </Typography>
         <div className={styles.area_chart}>
            {loading ?
               <CardSkeleton width={"100%"} height={235} />
               :
               <ResponsiveContainer>
                  <AreaChart
                     data={revenue}
                     margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                     }}
                     color={"#FFF"}
                  >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis
                        dataKey="month"
                        tick={{ fill: darkMood ? "#aeb4be" : "#7d879c" }}
                        tickLine={{ stroke: "#7d879c" }} />
                     <YAxis
                        tick={{ fill: darkMood ? "#aeb4be" : "#7d879c" }}
                        tickLine={{ stroke: "#7d879c" }} />
                     <Tooltip />
                     <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#205295"
                        fill="#2c74b3" />
                  </AreaChart>
               </ResponsiveContainer>
            }
         </div>
      </div>
   )
}

export default AreaCharts;