/** @format */

import { useState, useEffect } from "react";
import {
  getAllQuiz,
  getAllUser,
  postAssignQuiz,
} from "../../../../services/apiService";
import Select from "react-select";
import { toast } from "react-toastify";

const AssignQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [listQuiz, setListQuiz] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchDataQuiz();
    fetchDataUser();
  }, []);

  const fetchDataQuiz = async () => {
    const res = await getAllQuiz();

    if (res && res.EC === 0) {
      const newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const fetchDataUser = async () => {
    const res = await getAllUser();

    if (res && res.EC === 0) {
      const newUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(newUser);
    }
  };

  const handleAssignQuiz = async () => {
    const res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 my-3 ">
        <label className="mb-1">Select Quiz:</label>
        <Select
          className="z-3"
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 my-3 ">
        <label className="mb-1"> Select User</label>
        <Select
          className="z-3"
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div>
        <button onClick={handleAssignQuiz} className="btn btn-warning mt-2">
          Assign Quiz
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
