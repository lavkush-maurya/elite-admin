import React, { useContext } from "react";
import styles from "../styles/OrderDetailsView.module.scss";
import Typography from "../../../components/common/Typography/Typography";
import dayjs from "dayjs";
import OrderStatusOptions from "./OrderStatusOptions";
import LinearProgress from "@mui/material/LinearProgress";
import { Context } from "../../../store/Context";

const OrderDetailsView = ({
  loading,
  singleOrder,
  totalAmount,
  setStateUpdated,
}) => {
  const { state } = useContext(Context);
  const { darkMood } = state;
  return (
    <section className={styles.order_details_page_wrapper}>
      <div className={styles.page_title}>
        <Typography variant={"subtitle"} color={"paragraph"}>
          Order Details
        </Typography>
      </div>
      <div
        className={
          darkMood
            ? `${styles.product_details_wrapper} ${"dark_mood_secondary"}`
            : `${styles.product_details_wrapper} ${"light_mood_secondary"}`
        }
      >
        {loading && (
          <div className={styles.loading_state}>
            <LinearProgress sx={{ borderRadius: "8px 8px 0 0" }} />
          </div>
        )}
        <div className={styles.id_date}>
          <Typography variant={"small"} color={"paragraph"}>
            Order Id: {singleOrder?._id}
          </Typography>
          <Typography variant={"small"} color={"paragraph"}>
            Placed on:{" "}
            {dayjs(singleOrder?.updatedAt).format("MMM D, YYYY h:mm A")}
          </Typography>
          <div
            className={`with__bg ${
              singleOrder?.orderStatus === "PENDING"
                ? "yellow_bg"
                : singleOrder?.orderStatus === "SHIPPED"
                ? "blue_bg"
                : singleOrder?.orderStatus === "DELIVERED"
                ? "green_bg"
                : singleOrder?.orderStatus === "CANCELED"
                ? "red_bg"
                : ""
            }`}
          >
            <Typography variant={"body"}>{singleOrder?.orderStatus}</Typography>
          </div>
        </div>
        <OrderStatusOptions setStateUpdated={setStateUpdated} />
        <div className={styles.product_row_wrapper}>
          {singleOrder?.product && singleOrder?.product.length
            ? singleOrder?.product.map((item) => (
                <div className={styles.product_row} key={item?._id?._id}>
                  <img src={item?._id?.image} alt="" />
                  <div className={styles.product_description}>
                    <Typography
                      variant={"widgetTitle"}
                      color={darkMood ? "paragraph" : "primary"}
                    >
                      {item?._id?.title}
                    </Typography>
                    <Typography
                      variant={"dataGridTitle"}
                      color={darkMood ? "paragraph" : "primary"}
                    >
                      Quantity: {item?.quantity}
                    </Typography>
                    <Typography
                      variant={"dataGridTitle"}
                      color={darkMood ? "paragraph" : "primary"}
                    >
                      Price: Rs.{item?._id?.price}.00
                    </Typography>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className={styles.shipping_and_amount_wrapper}>
        <div
          className={
            darkMood
              ? `${styles.shipping_wrapper} ${"dark_mood_secondary"}`
              : `${styles.shipping_wrapper} ${"light_mood_secondary"}`
          }
        >
          <div className={styles.border_bottom}>
            <Typography
              variant={"widgetTitle"}
              color={darkMood ? "paragraph" : "primary"}
            >
              Shipping Address
            </Typography>
          </div>
          <div className={styles.address_details}>
            <Typography
              color={darkMood ? "paragraph" : "primary"}
              variant={"dataGridTitle"}
            >
              <span>City: </span>
              <span>{singleOrder?.city}</span>
            </Typography>
            <Typography
              color={darkMood ? "paragraph" : "primary"}
              variant={"dataGridTitle"}
            >
              <span>Address:</span>
              <span>{singleOrder?.shippingAddress}</span>
            </Typography>
            <Typography
              color={darkMood ? "paragraph" : "primary"}
              variant={"dataGridTitle"}
            >
              <span>Phone Number: </span>
              <span>{singleOrder?.phoneNumber}</span>
            </Typography>
          </div>
        </div>
        <div
          className={
            darkMood
              ? `${styles.amount_wrapper} ${"dark_mood_secondary"}`
              : `${styles.amount_wrapper} ${"light_mood_secondary"}`
          }
        >
          <div className={styles.border_bottom}>
            <Typography
              variant={"widgetTitle"}
              color={darkMood ? "paragraph" : "primary"}
            >
              Total Summery
            </Typography>
          </div>
          <div className={styles.amount_summery_top}>
            <Typography
              color={darkMood ? "paragraph" : "primary"}
              variant={"dataGridTitle"}
            >
              <span>Sub Total:</span>
              <span>Rs {totalAmount}.00</span>
            </Typography>
            <Typography
              color={darkMood ? "paragraph" : "primary"}
              variant={"dataGridTitle"}
            >
              <span>Shipping Fee:</span>
              <span>Rs 00.00</span>
            </Typography>
            <Typography
              color={darkMood ? "paragraph" : "primary"}
              variant={"dataGridTitle"}
            >
              <span>Discount:</span>
              <span> Rs 00.00</span>
            </Typography>
          </div>
          <div className={styles.amount_summery_bottom}>
            <Typography
              color={darkMood ? "paragraph" : "primary"}
              variant={"widgetTitle"}
            >
              <span> Total Amount:</span>
              <span>Rs {totalAmount}.00</span>
            </Typography>
            <Typography
              variant={"small"}
              color={darkMood ? "paragraph" : "primary"}
            >
              <span> Payment Id:</span>
              <span>{singleOrder?.paymentId}</span>
            </Typography>
            <Typography
              variant={"small"}
              color={darkMood ? "paragraph" : "primary"}
            >
              Paid by Credit/Debit Card
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailsView;
