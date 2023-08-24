import React, { useEffect, useState } from 'react';
import PageLayout from '../../../layouts/PageLayout';
import PageTitle from '../../../components/common/PageTitle/PageTitle';
import MuiDataGrid from "../../../components/dataGrid/MuiDataGrid";
import styles from "./styles/ReviewsListPage.module.scss";
import { reviewsColumns } from "../../../components/dataGrid/dataGridColumns/reviewsColumn";
import { useHttpHook } from '../../../hooks/useHttpHook';

const ReviewsListPage = () => {
   const [reviews, setReviews] = useState([])
   const getReviewData = (data) => {
      setReviews(data?.reviews);
   }
   const { sendRequest, hasError, loading } = useHttpHook();
   useEffect(() => {
      sendRequest({ url: "/reviews/all" }, getReviewData);
   }, [sendRequest])
   return (
      <PageLayout>
         <section className={styles.review_list_page}>
            <PageTitle title={"Customer Reviews List"} showBtn={false} />
            <MuiDataGrid
               columns={reviewsColumns}
               data={reviews}
               loading={loading}
               error={hasError}
               rows={reviews}
               isOrder={true}
               rowHeight={80}
               page={7}
               viewUrl={"/review/details"}
            />
         </section>
      </PageLayout>
   )
}

export default ReviewsListPage;