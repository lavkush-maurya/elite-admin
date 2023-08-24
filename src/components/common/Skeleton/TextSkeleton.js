import React, { useContext } from 'react'
import Skeleton from '@mui/material/Skeleton';
import { Context } from '../../../store/Context';
const TextSkeleton = (
   {
      height,
      row = 1,
      animation,
      ...otherProps
   }
) => {
   const { state } = useContext(Context);
   const { darkMood } = state;
   const rowArr = Array(row).fill().map((_, index) => index);

   return (
      <div {...otherProps}>
         {rowArr.map((_row, i) => (
            <div key={i} style={{ marginBottom: "0.8rem" }}>
               <Skeleton
                  variant={"rectangular"}
                  width={"100%"}
                  height={height || 20}
                  animation={animation || "wave"}
                  sx={{
                     mb: "0.8rem",
                     backgroundColor: darkMood ? "#1B3C59" : "#EBECF1"
                  }}

               />
               <Skeleton
                  variant={"rectangular"}
                  width={"90%"}
                  height={height || 18}
                  animation={animation || "wave"}
                  sx={{ backgroundColor: darkMood ? "#1B3C59" : "#EBECF1" }}
               />
            </div>
         ))}
      </div>
   )
}

export default TextSkeleton;