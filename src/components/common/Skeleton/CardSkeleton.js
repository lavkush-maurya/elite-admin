import React, { useContext } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Context } from '../../../store/Context';

const CardSkeleton = (
   {
      width,
      height,
      variant,
      col = 1,
      animation,
      text = false,
      ...otherProps
   }
) => {
   const { state } = useContext(Context);
   const { darkMood } = state;
   const colArr = Array(col).fill().map((_, index) => index);

   return (
      <>
         {colArr.map((_col, i) => (
            <div key={i} {...otherProps}>
               <Skeleton
                  variant={variant || "rectangular"}
                  width={width || 210}
                  height={height || 60}
                  animation={animation || "pulse"}
                  sx={{ backgroundColor: darkMood ? "#1B3C59" : "#EBECF1" }}
               />
               {text &&
                  <>
                     <Skeleton
                        variant={"rectangular"}
                        width={"95%"}
                        height={16}
                        animation={"wave"}
                        sx={{
                           mt: "0.8rem",
                           backgroundColor: darkMood ? "#1B3C59" : "#EBECF1"
                        }}

                     />
                     <Skeleton
                        variant={"rectangular"}

                        width={"70%"}
                        height={12}
                        animation={"wave"}
                        sx={{
                           mt: "0.8rem",
                           backgroundColor: darkMood ? "#1B3C59" : "#EBECF1"
                        }}

                     />
                  </>
               }
            </div>
         ))}
      </>
   );
};

export default CardSkeleton;