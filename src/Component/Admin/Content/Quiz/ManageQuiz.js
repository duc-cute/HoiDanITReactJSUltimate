/** @format */
import Select from "react-select";
import "./ManageQuiz.scss";
import { useState } from "react";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import { Accordion } from "react-bootstrap";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";
import { useTranslation } from "react-i18next";
const ManageQuiz = () => {
  const options = [
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HARD", label: "Hard" },
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);

  const { t } = useTranslation();

  const handleChooseImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!name || !description) {
      toast.error("Name or description is required");
      return;
    }
    const res = await postCreateNewQuiz(name, description, type.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t("manageQuiz.titleQuiz")}</Accordion.Header>
          <Accordion.Body>
            <div className="add-new-quiz">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add New Quiz:
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="your quiz name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Description</label>
                </div>
                <div className="my-3">
                  <Select
                    options={options}
                    placeholder="Quiz type..."
                    value={type}
                    onChange={setType}
                  />
                </div>
                <div className="more-action form-group">
                  <label className="mb-1">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleChooseImage(e)}
                  />
                </div>
                <div className="mt-3 ">
                  <button
                    className="btn btn-primary btn-submit"
                    onClick={handleSubmitQuiz}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="table-quiz mx-3">
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>{t("manageQuiz.titleUpdate")}</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>{t("manageQuiz.titleAsign")}</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
