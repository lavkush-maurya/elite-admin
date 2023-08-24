import React, { useEffect, useState } from 'react';
import PageLayout from "../../layouts/PageLayout";
import { useHttpHook } from "../../hooks/useHttpHook";
import { useParams } from "react-router-dom";
import OrderDetailsView from './Components/OrderDetailsView';
const OrderDetailsPage = () => {
   const [singleOrder, setSingleOrder] = useState({});
   const [stateUpdated, setStateUpdated] = useState(false)
   const { id } = useParams()
   const getSingleOrderData = (data) => {
      setSingleOrder(data?.order)
   }
   const { sendRequest, hasError, loading } = useHttpHook();

   //When admin update order status, stateUpdated value will be change to true so that useEffect can run again. this is the reson "stateUpdated" added in the dependency array.
   useEffect(() => {
      sendRequest({ url: `/order/single/${id}` }, getSingleOrderData)

      return () => {
         setStateUpdated(false)
      }
   }, [id, sendRequest, stateUpdated]);

   return (
      <PageLayout>
         <OrderDetailsView
            totalAmount={singleOrder?.totalAmount}
            error={hasError}
            loading={loading}
            setStateUpdated={setStateUpdated}
            singleOrder={singleOrder} />
      </PageLayout>
   )
}

export default OrderDetailsPage;