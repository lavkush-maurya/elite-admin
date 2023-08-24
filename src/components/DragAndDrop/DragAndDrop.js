import React, { useContext } from 'react';
import Typography from '../common/Typography/Typography';
import Button from '../common/Button/Button';
import Icons from '../common/Icons/Icons';
import styles from "./styles/DragAndDrop.module.scss";
import { useDropzone } from 'react-dropzone';
import { Context } from "../../store/Context";

const DragAndDrop = ({ onDrop, hasError, type = "Product" }) => {
   //Drag nad Drop 
   const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone(
      {
         onDrop,
         accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"]
         }
      });
   const { state } = useContext(Context);
   const { darkMood } = state;
   return (
      <div className={darkMood ? `${styles.upload_container} ${"dark_mood_main"}` : `${styles.upload_container} ${"light_mood_main"}`}>
         {/* Upload section Start*/}
         <div className={hasError?.file ? `${styles.upload_wrapper} ${styles.imageError}` : `${styles.upload_wrapper}`}  {...getRootProps()}>
            {hasError?.file
               &&
               <Typography variant={"small"} color={"red"}>
                  {hasError?.file}
               </Typography>
            }
            {isDragActive &&
               <div className={isDragReject ? `${styles.drag_error}` : `${styles.drag_active}`}>
                  <Typography
                     variant={"body"}
                     color={isDragReject ? "red" : "primary"}>
                     {isDragReject ? "Upload only .jpeg .png .jpg Image" : " Drop the files here"}
                  </Typography>
               </div>
            }
            <div className={styles.upload_body}>
               <Icons
                  name={"camera"}
                  size={"2.5rem"}
                  color={"#aeb4be"} />
               <Typography
                  variant={"widgetTitle"}
                  color={"paragraph"}>
                  Drag & drop {type} image here
               </Typography>
               <div className={styles.with_border}>
                  <Typography
                     variant={"small"}
                     color={"light-gray"}>
                     OR
                  </Typography>
               </div>
            </div>
            <Button variant={"blue_btn"}>
               <Icons name={"upload"} />
               Select File
            </Button>
            <Typography
               variant={"small"}
               color={"light-gray"}>
               Image Size (480 * 620) image Type *JPEG, *PNG and *JPG
            </Typography>
            <input type={"file"} {...getInputProps()}
               style={{ display: "none" }} />
         </div>
      </div>
   )
}

export default DragAndDrop;