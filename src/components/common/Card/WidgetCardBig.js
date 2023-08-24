import React, { useEffect, useState, useContext } from 'react';
import styles from "./styles/WidgetsCardBig.module.scss";
import Typography from '../Typography/Typography';
import dayjs from 'dayjs';
import { Context } from "../../../store/Context";
import TextSkeleton from "../Skeleton/TextSkeleton";

const WidgetCardBig = ({ imgUrl, todaySales, loading }) => {
   const [timeOfDay, setTimeOfDay] = useState("")
   const currentTime = dayjs().format("HH:mm:ss");
   const { state } = useContext(Context);
   const { darkMood } = state;
   useEffect(() => {
      if (currentTime >= '00:00:00' && currentTime < '12:00:00') {
         setTimeOfDay('Good morning');
      } else if (currentTime >= '12:00:00' && currentTime < '18:00:00') {
         setTimeOfDay('Good afternoon');
      } else {
         setTimeOfDay('Good evening');
      }
   }, [currentTime])

   return (
      <div className={darkMood ? `${styles.widget_card_wrapper} ${"dark_mood_secondary"}` : `${styles.widget_card_wrapper} ${"light_mood_secondary"}`}>
         <div className={styles.widget_contents}>
            {loading ?
               <TextSkeleton row={1} height={15} />
               :
               <div>
                  <Typography color={"blue"} variant={"h4"}>
                     {timeOfDay}, Kabir!
                  </Typography>
                  <Typography color={"paragraph"} variant={"small"}>
                     Here’s what happening with your store today!
                  </Typography>
               </div>
            }

            {loading ?
               <TextSkeleton row={1} height={15} />
               :
               <div>
                  <Typography
                     variant={"widgetAmount"}
                     color={darkMood ? "light-gray" : "primary"}>
                     15000
                  </Typography>
                  <Typography color={"paragraph"} variant={"small"}>
                     Today’s Visit
                  </Typography>
               </div>
            }
            {
               loading ?
                  <TextSkeleton row={1} height={15} />
                  :
                  <div>
                     <Typography
                        variant={"widgetAmount"}
                        color={darkMood ? "light-gray" : "primary"}>
                        &#2547; {todaySales}
                     </Typography>
                     <Typography color={"paragraph"} variant={"small"}>
                        Today’s total sales
                     </Typography>
                  </div>
            }
         </div>
         <div className={styles.widget_img}>
            <img src={imgUrl} alt="widget.png" />
         </div>
      </div>
   )
}

export default WidgetCardBig;