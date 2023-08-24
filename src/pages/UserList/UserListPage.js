import React, { useState, useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import MuiDataGrid from '../../components/dataGrid/MuiDataGrid';
import { userColumns } from "../../components/dataGrid/dataGridColumns/userColumns";
import styles from "./styles/UserListPage.module.scss";
import { useHttpHook } from "../../hooks/useHttpHook";
import PageTitle from '../../components/common/PageTitle/PageTitle';

const UserListPage = () => {
   const [users, setUsers] = useState([]);
   const getUserData = (data) => {
      setUsers(data?.user)
   }
   const { hasError, sendRequest, loading } = useHttpHook();
   useEffect(() => {
      sendRequest({ url: "/user/all/profile" }, getUserData)
   }, [sendRequest])
   return (
      <PageLayout>
         <div className={styles.user_page_wrapper}>
            <PageTitle title={"User List"} showBtn={false} />
            <div>
               <MuiDataGrid
                  loading={loading}
                  error={hasError}
                  rows={users}
                  rowHeight={100}
                  hideAction={true}
                  columns={userColumns} />
            </div>
         </div>
      </PageLayout>
   )
}

export default UserListPage;