import React, { useContext } from 'react';
import AddSubCategoryPage from './AddSubCategoryPage';
import { useParams } from "react-router-dom";
import { Context } from "../../store/Context";

const EditSubCategoryPage = () => {
   const { id } = useParams();
   const { state } = useContext(Context);
   const { subCategory } = state;

   const selectedSubCategory = {
      title: subCategory?.title,
      imageId: subCategory?.imageId,
      category: subCategory?.category
   };

   return (
      <AddSubCategoryPage
         id={id}
         updateImage={subCategory?.image}
         updateCategory={selectedSubCategory} />
   )
}

export default EditSubCategoryPage;