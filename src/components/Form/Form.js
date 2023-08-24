import React, { useEffect, useState, useContext } from 'react';
import styles from "./styles/Form.module.scss";
import Typography from '../common/Typography/Typography';
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import SelectOptions from '../common/SelectOptionInput/SelectOptionInput';
import BasicCard from "../common/Card/BasicCard";
import Icons from "../common/Icons/Icons";
import LinearProgress from '@mui/material/LinearProgress';
import { useHttpHook } from '../../hooks/useHttpHook';
import { Context } from "../../store/Context";
import DragAndDrop from '../DragAndDrop/DragAndDrop';

const Form = (
   {
      formTitle,
      isProduct = false,
      btnTitle,
      titleLabel,
      inputValue,
      changeHandler,
      submitHandler,
      hasError,
      onDrop,
      imageUrl,
      removeFileHandler,
      editProductId,
      loading,
      isSubCategory = false
   }
) => {
   const [subCategories, setSubCategories] = useState([])
   const { state } = useContext(Context);
   const { category, darkMood } = state;

   //Fetching sub-category data based on Category id, exmp: if user select Men category all the sub-category related to Men category will be fetched. 
   const getRelatedSubCtg = (data) => {
      setSubCategories(data?.subCategories);
   }
   const { sendRequest } = useHttpHook()
   const fetchSubCtgData = (id) => {
      sendRequest({ url: `/sub-category/${id}` }, getRelatedSubCtg)
   }
   useEffect(() => {
      if (editProductId) {
         fetchSubCtgData(inputValue?.category)
      }
      // eslint-disable-next-line 
   }, [editProductId, sendRequest])

   // console.log(categories, "CATEGORY")
   return (
      <div className={styles.form_container}>
         <div className={styles.form_title_wrapper}>
            <Typography
               variant={"subtitle"}
               color={"paragraph"}>
               {formTitle}
            </Typography>
            {loading &&
               <div className={styles.loading_progress}>
                  <LinearProgress sx={{ borderRadius: "8px 8px 0 0 " }} />
               </div>}
         </div>
         <BasicCard>
            <form onSubmit={submitHandler}
               className={loading ? `${styles.add_opacity}` : ""}>
               {/*Upload section start*/}
               <div className={styles.drag_and_drop_wrapper}>
                  <DragAndDrop onDrop={onDrop} hasError={hasError} />
               </div>
               {/*Upload section end*/}

               {/*Display selected Image */}
               {imageUrl &&
                  <div className={styles.display_selected_image}>
                     <img src={imageUrl} alt="img.png" />
                     <Button
                        variant={"icon-btn-nomal"}
                        onClick={removeFileHandler}>
                        <Icons
                           name={"cancel"}
                           color={"#cc2121"}
                           size={"1.2rem"} />
                     </Button>
                  </div>
               }

               {/**********Input section Start********/}
               <div className={styles.product_title}>
                  <Input
                     error={hasError?.title ? true : false}
                     helperText={hasError?.title}
                     required={true}
                     label={titleLabel}
                     fullWidth={true}
                     type={"text"}
                     value={inputValue?.title}
                     onChange={changeHandler}
                     name={"title"}
                  />
               </div>
               {/* OPtions Start*/}
               < div className={styles.options_wrapper} >
                  {isProduct || isSubCategory ?
                     <div className={styles.category_options}>
                        <SelectOptions
                           value={inputValue?.category}
                           onChange={(e) => {
                              changeHandler(e);
                              fetchSubCtgData(e.target.value)
                           }}
                           name={"category"}
                           label={"Category"}
                           options={category}
                        />
                     </div>
                     :
                     null
                  }
                  {isProduct && !isSubCategory ? <div className={styles.sub_category_options}>
                     <SelectOptions
                        value={inputValue?.subCategory}
                        onChange={changeHandler}
                        name={"subCategory"}
                        label={"Sub Category"}
                        options={subCategories || inputValue?.subCategory}
                     />
                  </div>
                     : null
                  }
               </div>
               {/* Options End*/}
               {isProduct &&
                  <>
                     {/* Description section start*/}
                     <div className={darkMood ? `${styles.description_wrapper} ${styles.dark_mood}` : `${styles.description_wrapper} ${styles.light_mood}`}>
                        <textarea
                           className={hasError?.description || hasError?.all ? `${styles.errorTextarea}` : ""}
                           rows={6}
                           value={inputValue?.description}
                           onChange={changeHandler}
                           name={"description"}
                           placeholder={"Product Description (character 700 max)*"}
                           cols={120}>
                        </textarea>
                        {hasError &&
                           <Typography variant={"small"} color={"red"}>
                              {hasError?.description || hasError.all ? hasError?.description || hasError.all : ""}
                           </Typography>}
                     </div>
                     {/* Description section end*/}

                     {/* Pricing section Start*/}
                     <div className={styles.stock_and_cost_wrapper}>
                        <div className={styles.stock}>
                           <Input
                              error={hasError?.stock ? true : false}
                              helperText={hasError?.stock}
                              required={true}
                              label={"Stock"}
                              full={true}
                              type={"number"}
                              name={"stock"}
                              value={inputValue?.stock}
                              onChange={changeHandler}
                           />
                        </div>
                        <div className={styles.cost}>
                           <Input
                              error={hasError?.productCost ? true : false}
                              helperText={hasError?.productCost}
                              required={true}
                              label={"Product Cost"}
                              full={true}
                              type={"number"}
                              name={"productCost"}
                              value={inputValue?.productCost}
                              onChange={changeHandler}
                           />
                        </div>
                     </div>
                     <div className={styles.price_wrapper}>
                        <div className={styles.regular_price}>
                           <Input
                              error={hasError?.price ? true : false}
                              helperText={hasError?.price}
                              required={true}
                              label={"Regular Price"}
                              full={true}
                              name={"price"}
                              type={"number"}
                              value={inputValue?.price}
                              onChange={changeHandler}
                           />
                        </div>
                        <div className={styles.sell_price}>
                           <Input
                              error={hasError?.sellPrice ? true : false}
                              helperText={hasError?.sellPrice}
                              required={true}
                              label={"Sell Price"}
                              full={true}
                              name={"sellPrice"}
                              type={"number"}
                              value={inputValue?.sellPrice}
                              onChange={changeHandler}
                           />
                        </div>
                     </div>
                     {/* Pricing section End*/}
                  </>
               }
               {/* Input section End*/}
               <div className={styles.submit_btn}>
                  <Button type="submit" variant={"blue_btn"}>
                     {btnTitle}
                  </Button>
               </div>
            </form>
         </BasicCard>
      </div >
   )
}

export default Form