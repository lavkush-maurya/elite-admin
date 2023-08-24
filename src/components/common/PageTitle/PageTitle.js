import React, { useContext } from "react";
import styles from "./styles/PageTitle.module.scss";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { Context } from "../../../store/Context";
const PageTitle = ({ title, btnTitle, linkTo = "#", showBtn = true }) => {
   const { state } = useContext(Context);
   const { darkMood } = state;
   return (
      <div className={styles.page_title_wrapper}>
         <Typography variant={"subtitle"} color={darkMood ? "paragraph" : "primary"}>
            {title}
         </Typography>
         {showBtn &&
            <Link to={linkTo}>
               <Button variant={"blue_btn"}>
                  {btnTitle}
               </Button>
            </Link>
         }
      </div>
   )
}

export default PageTitle;