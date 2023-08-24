import React, { useEffect, useState } from 'react';
import PageLayout from "../../../layouts/PageLayout";
import PageTitle from "../../../components/common/PageTitle/PageTitle";
import { useHttpHook } from "../../../hooks/useHttpHook";
import styles from "./styles/ReviewDetailsPage.module.scss";
import ReviewDetailsView from './Components/ReviewDetailsView';
import { useParams } from 'react-router-dom';
import CardSkeleton from '../../../components/common/Skeleton/CardSkeleton';
import TextSkeleton from '../../../components/common/Skeleton/TextSkeleton';

const ReviewDetailsPage = () => {
   const [reviewDetails, setReviewDetails] = useState(null);
   const { reviewId } = useParams();

   const getReviewsData = (data) => {
      setReviewDetails(data?.review)
   }

   const { sendRequest, loading } = useHttpHook();

   useEffect(() => {
      sendRequest(
         { url: `/review/details/${reviewId}` }
         , getReviewsData
      )
   }, [reviewId, sendRequest])
   return (
      <PageLayout>
         <section className={styles.review_details_wrapper}>
            <PageTitle title={"Review Details"} showBtn={false} />
            <div className={styles.details_view}>
               {loading ?
                  <div className={styles.loading_skeleton}>
                     <CardSkeleton
                        width={150}
                        variant={"circular"}
                        height={150}
                     />
                     <TextSkeleton
                        height={15}
                        row={4}
                     />
                  </div> :
                  <ReviewDetailsView review={reviewDetails} />
               }
            </div>
         </section>
      </PageLayout>

   )
}

export default ReviewDetailsPage;