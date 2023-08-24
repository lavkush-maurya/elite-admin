import styles from "./styles/Widgets.module.scss";
import WidgetCardBig from "../common/Card/WidgetCardBig";
import WidgetCardSm from "../common/Card/WidgetCardSm";

const Widgets = ({ loading, analyticsData }) => {
  return (
    <div
      className={
        loading
          ? `${styles.Widgets_grid_wrapper} ${styles.opacity}`
          : `${styles.Widgets_grid_wrapper}`
      }
    >
      <div className={styles.col_1}>
        <WidgetCardBig
          todaySales={analyticsData?.dailySales}
          loading={loading}
          imgUrl={"/assets/svgg.svg"}
        />
      </div>
      <div className={styles.col_2}>
        <WidgetCardSm
          title={"Orders"}
          loading={loading}
          count={analyticsData?.totalOrders}
          percentage={Math.floor(analyticsData?.totalOrdersPercentage)}
        />
      </div>
      <div className={styles.col_3}>
        <WidgetCardSm
          title={"Revenue"}
          loading={loading}
          count={`Rs. ${analyticsData?.totalRevenue}`}
          percentage={analyticsData?.monthlyRevenuePercentage}
        />
      </div>
      <div className={styles.col_4}>
        <WidgetCardSm
          title={"Total Users"}
          loading={loading}
          count={analyticsData?.totalUsers}
          percentage={analyticsData?.totalUsersPercentage}
        />
      </div>
      <div className={styles.col_5}>
        <WidgetCardSm
          title={"Weekly Sales"}
          loading={loading}
          count={`Rs. ${analyticsData?.weeklyEarnings}`}
          percentage={analyticsData?.weeklyEarningsPercentage}
        />
      </div>
    </div>
  );
};

export default Widgets;
