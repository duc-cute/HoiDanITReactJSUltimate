/** @format */
import { useState, useEffect } from "react";
import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import { getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { useTranslation } from "react-i18next";
const ManagerUser = () => {
  const LIMIT_USER = 6;
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listUser, setListUser] = useState([]);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const { t } = useTranslation();

  const handleClickUpdateUser = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };
  const handleClickDeleteUser = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  useEffect(() => {
    fetchListUsersWithPaginate(1);
  }, []);

  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      console.log("res.data :", res.DT);
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  return (
    <div className="manager-user-container">
      <div className="title">{t("managerUser.title")}</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button onClick={() => setShowModalCreateUser(!showModalCreateUser)}>
            <FcPlus />
            {t("managerUser.addUser")}
          </button>
        </div>
        <div>
          <TableUserPaginate
            listUser={listUser}
            handleClickUpdateUser={handleClickUpdateUser}
            handleClickDeleteUser={handleClickDeleteUser}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalUpdateUser
        show={showModalUpdateUser}
        setShow={setShowModalUpdateUser}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        dataUpdate={dataUpdate}
        resetDataModal={() => setDataUpdate({})}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalDeleteUser
        show={showModalDeleteUser}
        setShow={setShowModalDeleteUser}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        dataDelete={dataDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ManagerUser;
