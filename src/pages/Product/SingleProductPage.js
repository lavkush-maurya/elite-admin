import React, { useState, useEffect, useContext } from 'react'
import styles from "./styles/SingleProductPage.module.scss";
import { useHttpHook } from "../../hooks/useHttpHook";
import { useParams } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import Typography from '../../components/common/Typography/Typography';
import dayjs from 'dayjs';
import Icons from '../../components/common/Icons/Icons';
import { Link } from 'react-router-dom';
import { Context } from "../../store/Context";
import TextSkeleton from "../../components/common/Skeleton/TextSkeleton";
import CardSkeleton from "../../components/common/Skeleton/CardSkeleton";

const SingleProductPage = () => {
   const [product, setProduct] = useState([]);
   const { state } = useContext(Context);
   const { darkMood } = state;
   const { id } = useParams()
   const getSingleProductData = (data) => {
      setProduct(data?.products)
   }
   const { sendRequest } = useHttpHook()

   useEffect(() => {
      sendRequest({ url: `/product/single/${id}` }, getSingleProductData)
   }, [id, sendRequest])
   return (
      <PageLayout>
         <div className={darkMood ? `${styles.single_page_wrapper} ${"dark_mood_secondary"}` : `${styles.single_page_wrapper} ${"light_mood_secondary"}`}>
            <div className={darkMood ? `${styles.edit_link_btn} ${"dark_mood_secondary"}` : `${styles.edit_link_btn} ${"light_mood_secondary"}`}>
               <Link to={`/product/edit/${id}`}>
                  <Icons name={"edit"} color={"#3f7fb8"} />
               </Link>
            </div>
            <div className={styles.product_img}>
               {product.image ?
                  <img src={product?.image} alt="product" />
                  :
                  <CardSkeleton
                     height={window.innerWidth > 700 ? "37rem" : "22rem"}
                     col={1}
                     width={"100%"}
                  />
               }
            </div>
            <div className={styles.product_details}>
               {product._id ?
                  <div className={styles.date_with_id}>
                     <Typography
                        variant={"small"}
                        color={"paragraph"}>
                        Launch  Date:  {dayjs(product?.createdAt).format("MMM D, YYYY h:mm A")}
                     </Typography>
                     <Typography
                        variant={"small"}
                        color={"paragraph"}>
                        Id:  {product?._id}
                     </Typography>
                  </div>
                  :
                  <TextSkeleton row={1} height={30} />
               }
               {product.title ?
                  <Typography
                     variant={"h4"}
                     color={darkMood ? "paragraph" : "primary"}>
                     {product?.title}
                  </Typography>
                  : <TextSkeleton
                     height={15}
                     row={2} />
               }
               {product.description ?
                  <Typography
                     variant={"body"}
                     color={darkMood ? "paragraph" : "primary"}>
                     {product?.description}
                  </Typography> :
                  <TextSkeleton
                     height={15}
                     row={2}
                  />
               }

               {product.price ?
                  <div className={styles.product_pricing_details}>
                     <Typography
                        variant={"body"}
                        color={darkMood ? "paragraph" : "primary"}>
                        Regular Price: <span>&#2547; {product?.price}.00</span>
                     </Typography>
                     <Typography
                        variant={"body"}
                        color={darkMood ? "paragraph" : "primary"}>
                        Sell Price:
                        <span>
                           &#2547; {product?.sellPrice}.00
                        </span>
                     </Typography>
                     <Typography
                        variant={"body"}
                        color={darkMood ? "paragraph" : "primary"}>
                        Product Cost:
                        <span>
                           &#2547; {product?.productCost}.00
                        </span>
                     </Typography>
                     <Typography
                        variant={"body"}
                        color={darkMood ? "paragraph" : "primary"}>
                        Stock : <span className={product?.stock < 1 ? styles.color_red : ""}>
                           {product?.stock}
                        </span>
                     </Typography>
                     <Typography
                        variant={"body"}
                        color={darkMood ? "paragraph" : "primary"}>
                        Sold: <span>
                           {product?.sold}
                        </span>
                     </Typography>
                  </div>
                  :
                  <TextSkeleton row={2} height={30} />
               }
            </div>
         </div>
      </PageLayout>
   )
}

export default SingleProductPage;