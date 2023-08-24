import React, { useContext } from 'react';
import styles from "./styles/Sidebar.module.scss";
import Icons from '../common/Icons/Icons';
import Typography from '../common/Typography/Typography';
import { NavLink, Link, useLocation } from "react-router-dom";
import { Context } from "../../store/Context";
import { toggleShowProduct, toggleShowCategory, toggleShowSubCategory } from "../../store/Action"
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
   const { state, dispatch } = useContext(Context)
   const { showProduct, showCategory, showSubCategory } = state;
   const location = useLocation()

   const productHandler = () => {
      dispatch(toggleShowProduct(!showProduct))
      dispatch(toggleShowCategory(false))
      dispatch(toggleShowSubCategory(false))
   }
   const categoryHandler = () => {
      dispatch(toggleShowProduct(false))
      dispatch(toggleShowCategory(!showCategory))
      dispatch(toggleShowSubCategory(false))
   }
   const subCategoryHandler = () => {
      dispatch(toggleShowProduct(false))
      dispatch(toggleShowCategory(false))
      dispatch(toggleShowSubCategory(!showSubCategory))
   }
   return (
      <div className={styles.dashboard_sidebar}>
         <div className={styles.dashboard_sidebar_logo}>
            <Link to={"/"}>
               <img src="/assets/logo-white.png" alt="logo.png" />
            </Link>
         </div>
         <div className={styles.dashboard_sidebar_lists}>
            <ul >
               <li>
                  <Typography
                     variant={"small"}
                     color={"light-gray"}>
                     MAIN
                  </Typography>
               </li>
               <NavLink
                  to={"/"}
                  className={({ isActive }) => isActive ? `${styles.active_li}` : ""}>
                  <li>
                     <Icons
                        name={"dashboard"} />
                     Dashboard
                  </li>
               </NavLink>
               <li>
                  <Typography
                     variant={"small"}
                     color={"light-gray"}>
                     INVENTORY
                  </Typography>
               </li>
               <li className={location.pathname === "/product/list" || location.pathname === "/product/create-new" ? `${styles.active_li} ${styles.li_nasted}` : ` ${styles.li_nasted}`}
                  onClick={productHandler}>
                  <div className={styles.li_dropdown}>
                     <span>
                        <Icons name={"store"} />
                        Products
                     </span>
                     <motion.span
                        animate={{
                           rotate: state?.showProduct ? 90 : 0
                        }}
                        className={styles.rotate}>
                        <Icons
                           name={"arrowForward"} />
                     </motion.span>

                  </div>
                  <AnimatePresence>
                     {state.showProduct &&
                        <motion.ul
                           exit={{ y: "-10%", opacity: 0, transition: { duration: 0.1 } }}
                           transition={{ default: { ease: "linear", duration: 0.1 } }}
                           onClick={(e) => { e.stopPropagation() }}>
                           <NavLink to="/product/list"
                              className={({ isActive }) => isActive ? `${styles.active_li}` : ""} >
                              <li>
                                 <Icons size={"1rem"} name={"list"} />
                                 Products List
                              </li>
                           </NavLink>
                           <NavLink to="/product/create-new"
                              className={({ isActive }) => isActive ? `${styles.active_li}` : ""} >
                              <li>
                                 <Icons size={"1rem"} name={"addList"} />
                                 Create New Product
                              </li>
                           </NavLink>
                        </motion.ul>
                     }
                  </AnimatePresence>
               </li>
               <li className={location.pathname === "/category/list" || location.pathname === "/category/create-new" ? `${styles.active_li} ${styles.li_nasted}` : ` ${styles.li_nasted}`}
                  onClick={categoryHandler}>
                  <div className={styles.li_dropdown}>
                     <span>
                        <Icons name={"category"} />
                        Categories
                     </span>
                     <motion.span
                        animate={{
                           rotate: state?.showCategory ? 90 : 0
                        }}>
                        <Icons
                           name={"arrowForward"} />
                     </motion.span>
                  </div>
                  <AnimatePresence>
                     {state.showCategory &&
                        <motion.ul
                           exit={{ y: "-10%", opacity: 0, transition: { duration: 0.1 } }}
                           transition={{ default: { ease: "linear", duration: 0.2 } }}
                           onClick={(e) => { e.stopPropagation() }}>
                           <NavLink to="/category/list"
                              className={({ isActive }) => isActive ? `${styles.active_li}` : ""} >
                              <li>
                                 <Icons size={"1rem"} name={"categoryList"} />
                                 Category List
                              </li>
                           </NavLink>
                           <NavLink to="/category/create-new"
                              className={({ isActive }) => isActive ? `${styles.active_li}` : ""}>
                              <li>
                                 <Icons size={"1rem"} name={"addList"} />
                                 Create New Category
                              </li>
                           </NavLink>
                        </motion.ul>}
                  </AnimatePresence>
               </li>
               <li
                  className={location.pathname === "/sub-category/list" || location.pathname === "/sub-category/create-new" ? `${styles.active_li} ${styles.li_nasted}` : ` ${styles.li_nasted}`}
                  onClick={subCategoryHandler}>
                  <div className={styles.li_dropdown}>
                     <span>
                        <Icons name={"subCategory"} />
                        Sub-Categories
                     </span>
                     <motion.span
                        animate={{
                           rotate: state?.showSubCategory ? 90 : 0
                        }}>
                        <Icons
                           name={"arrowForward"} />
                     </motion.span>
                  </div>
                  <AnimatePresence>
                     {state.showSubCategory &&
                        <motion.ul
                           exit={{ y: "-10%", opacity: 0, transition: { duration: 0.1 } }}
                           transition={{ default: { ease: "linear", duration: 0.1 } }}
                           onClick={(e) => { e.stopPropagation() }}>
                           <NavLink to="/sub-category/list"
                              className={({ isActive }) => isActive ? `${styles.active_li}` : ""} >
                              <li>
                                 <Icons size={"1rem"} name={"categoryList"} />
                                 Sub-Category List
                              </li>
                           </NavLink>
                           <NavLink to="/sub-category/create-new"
                              className={({ isActive }) => isActive ? `${styles.active_li}` : ""}>
                              <li>
                                 <Icons size={"1rem"} name={"addList"} />
                                 Add Sub-Category
                              </li>
                           </NavLink>
                        </motion.ul>
                     }
                  </AnimatePresence>

               </li>
               <NavLink to="/order/list"
                  className={({ isActive }) => isActive ? `${styles.active_li}` : ""}>
                  <li>
                     <Icons name={"order"} />
                     Orders
                  </li>
               </NavLink>
               <NavLink to={"/user/list"} className={({ isActive }) => isActive ? `${styles.active_li}` : ""}>
                  <li>
                     <Icons name={"users"} />
                     Customers
                  </li>
               </NavLink>
               <li>
                  <Typography
                     variant={"small"}
                     color={"light-gray"}>
                     ANALYTICS
                  </Typography>
               </li>
               <NavLink to={"/analytics/earning"} className={({ isActive }) => isActive ? `${styles.active_li}` : ""}>
                  <li>
                     <Icons name={"roundPie"} />
                     Earnings
                  </li>
               </NavLink>
               <NavLink to={"/reviews/list"} className={({ isActive }) => isActive ? `${styles.active_li}` : ""}>
                  <li>
                     <Icons name={"review"} />
                     Reviews
                  </li>
               </NavLink>
               <NavLink to={"/chat"} className={({ isActive }) => isActive ? `${styles.active_li}` : ""}>
                  <li>
                     <Icons name={"chatIcon"} />
                     Chat
                  </li>
               </NavLink>
               <li>
                  <Typography variant={"small"} color={"light-gray"}>
                     ADMINISTRATION
                  </Typography>
               </li>
               <li>
                  <Icons name={"siteSettings"} />
                  Site Settings
               </li>
               <NavLink to={"/admin/profile/update"} className={({ isActive }) => isActive ? `${styles.active_li}` : ""}>
                  <li>
                     <Icons name={"account"} />
                     Account Settings
                  </li>
               </NavLink>
               <li>
                  <Icons name={"systemSettings"} />Nav
                  System Health
               </li>
            </ul>
         </div >
      </div >
   )
}

export default Sidebar;