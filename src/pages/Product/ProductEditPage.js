import React, { useContext } from 'react';
import { useParams } from "react-router-dom";
import CrateProductPage from './CrateProductPage';
import { Context } from "../../store/Context";

const ProductEditPage = () => {
   const { state } = useContext(Context);
   const { products } = state;
   const { id } = useParams()

   const editImage = products.filter(product => product?._id === id)
   const image = editImage[0]?.image;
   const [updateProduct] = editImage.map((product) => {
      return {
         title: product?.title,
         category: product?.category?._id,
         subCategory: product?.subCategory?._id,
         description: product?.description,
         stock: product?.stock,
         productCost: product?.productCost,
         price: product?.price,
         sellPrice: product?.sellPrice,
         imageId: product?.imageId
      }
   });
   return (
      <CrateProductPage
         id={id}
         updateImage={image}
         updateProduct={updateProduct} />
   )
}

export default ProductEditPage;