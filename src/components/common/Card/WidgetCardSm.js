import React, { useContext } from 'react';
import Typography from "../Typography/Typography";
import Icons from "../Icons/Icons";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import styles from "./styles/WidgetCardSm.module.scss";
import { Context } from "../../../store/Context";
import TextSkeleton from "../Skeleton/TextSkeleton";
import CardSkeleton from "../../common/Skeleton/CardSkeleton";

const WidgetCardSm = ({ title, count, percentage, loading }) => {
   const { state } = useContext(Context);
   const { darkMood } = state;
   return (
      <div className={darkMood ? `${styles.widget_card_sm_wrapper} ${"dark_mood_secondary"}` : `${styles.widget_card_sm_wrapper} ${"light_mood_secondary"}`}>
         {loading ?
            <div className={styles.loading_skeleton}>
               <TextSkeleton
                  animation="wave"
                  height={12}
                  row={2}
               />
            </div> :
            <div className={styles.data_wrapper}>
               <Typography variant={"widgetTitle"} color={"paragraph"}>
                  {title}
               </Typography>
               <div className={styles.percentage_number}>
                  <Typography variant={"smBold700"} color={darkMood ? "light-gray" : "primary"}>
                     {count}
                  </Typography>
                  <Typography variant={"widgetCount"} color={percentage > 0 ? "blue" : "red"}>
                     <span>
                        <Icons name={percentage > 0 ? "upArrow" : "downArrow"} />
                     </span>
                     {percentage}%
                  </Typography>
               </div>
            </div>
         }
         <div className={styles.process_bar_wrapper}>
            {loading ?
               <CardSkeleton variant={"circular"} width={80} height={80} />
               :
               <CircularProgressbar
                  styles={buildStyles({
                     textColor: percentage > 0 ? "#2c74b3" : "#cc2121",
                     pathColor: percentage > 0 ? "#2c74b3" : "#cc2121",
                     trailColor: percentage > 0 ? "#e5e5e5" : "#cc2121",
                     transitionDuration: "1",
                  })}
                  value={percentage || 0}
                  text={`${percentage || 0}%`} />
            }
         </div>
      </div>
   )
}

export default WidgetCardSm;