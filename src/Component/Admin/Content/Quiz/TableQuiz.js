/** @format */

import { useEffect, useState } from "react";
import { getAllQuiz } from "../../../../services/apiService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = () => {
  const [dataQuiz, setDataQuiz] = useState([]);
  const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false);
  const [isShowModalUpdateQuiz, setIsShowModalUpdateQuiz] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});

  useEffect(() => {
    fetchDataQuiz();
  }, []);

  const fetchDataQuiz = async () => {
    const res = await getAllQuiz();

    if (res && res.EC === 0) {
      setDataQuiz(res.DT);
    }
  };

  const handleDeleteQuiz = (quiz) => {
    setIsShowModalDeleteQuiz(true);
    setDataDelete(quiz);
  };

  const handleUpdateQuiz = (quiz) => {
    setIsShowModalUpdateQuiz(true);
    setDataUpdate(quiz);
    console.log(quiz);
  };

  return (
    <>
      <div className="mt-3">Quiz table :</div>
      <table className="table table-hover table-bordered mt-1">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataQuiz &&
            dataQuiz.length > 0 &&
            dataQuiz.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: "flex", gap: "15px" }}>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdateQuiz(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteQuiz(item)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalDeleteQuiz
        show={isShowModalDeleteQuiz}
        setShow={setIsShowModalDeleteQuiz}
        dataDelete={dataDelete}
        fetchDataQuiz={fetchDataQuiz}
        handleDeleteQuiz={handleDeleteQuiz}
      />
      <ModalUpdateQuiz
        show={isShowModalUpdateQuiz}
        setShow={setIsShowModalUpdateQuiz}
        dataUpdate={dataUpdate}
        fetchDataQuiz={fetchDataQuiz}
        handleUpdateQuiz={handleUpdateQuiz}
      />
    </>
  );
};

export default TableQuiz;
