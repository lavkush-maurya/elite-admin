import React, { useState, useCallback, useContext } from 'react';
import PageLayout from '../../layouts/PageLayout';
import Form from '../../components/Form/Form';
import { validator } from '../../helper/inputValidator';
import toast from 'react-hot-toast';
import { useHttpHook } from "../../hooks/useHttpHook";
import { Context } from '../../store/Context';
import { updateState } from '../../store/Action';

const defaultCategoryValue = {
   title: "",
}
const CreateCategoryPage = ({ id, updateCategory, updateImage }) => {
   const [categoryValue, setCategoryValue] = useState(id ? updateCategory : defaultCategoryValue)
   const [image, setImage] = useState(id ? updateImage : "");
   const [imageUrl, setImageUrl] = useState(id ? updateImage : "");
   const [hasError, setHasError] = useState("");
   const { dispatch } = useContext(Context)

   

   const getResponseData = (data) => {
      if (data?.success) {
         toast.success(id ? "Category Updated" : "New Category added");
         setCategoryValue({
            title: ""
         });
         setImage("")
         setImageUrl("")
         dispatch(updateState(true));
      }
   }
   const { sendRequest, error, loading } = useHttpHook()

   //Input onChange Handler 
   const changeHandler = (e) => {
      const { name, value } = e.target;
      setCategoryValue({ ...categoryValue, [name]: value })
      if (e.target.value !== "") {
         setHasError({})
      }
   }
   //File Upload Handler
   const onDrop = useCallback(acceptedFiles => {
      setImage(acceptedFiles[0])
      setImageUrl(URL.createObjectURL(acceptedFiles[0]))
   }, []);

   //Remove File handler 
   const removeFileHandler = () => {
      setImageUrl("")
      setImage("")
   }
   //Form Submit Handler
   const categorySubmitHandler = (e) => {
      e.preventDefault()
      const validated = validator(categoryValue, image)
      setHasError(validated)
      if (Object.keys(validated).length > 0) {
         return;
      }
      sendRequest(
         {
            url: id ? `/category/edit/${id}` : `/category/create`,
            method: id ? "PUT" : "POST",
            postData: { ...categoryValue, image }
         }, getResponseData)

      //If Error response from server 
      if (error) {
         return toast.error(error?.message)
      }
   }
   return (
      <PageLayout>
         <Form
            formTitle={id ? "Update Category" : "Create New Category"}
            btnTitle={"Save Category"}
            titleLabel={"Category Name"}
            onDrop={onDrop}
            inputValue={categoryValue}
            hasError={hasError}
            loading={loading}
            changeHandler={changeHandler}
            imageUrl={imageUrl}
            submitHandler={categorySubmitHandler}
            removeFileHandler={removeFileHandler}
         />
      </PageLayout>
   )
}

export default CreateCategoryPage;