/** @format */

import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { AiFillPlusSquare, AiOutlineMinusCircle } from "react-icons/ai";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import Select from "react-select";
import "./QuizQA.scss";
import { v4 as uuidv4 } from "uuid";

import Lightbox from "react-awesome-lightbox";
import _ from "lodash";
import {
  getAllQuiz,
  getQuizWithQA,
  postUpsertQuizQA,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const QuizQA = () => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [isPreviewImage, setIspreviewImage] = useState(false);
  const [dataImage, setDataImage] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchDataQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuiz]);

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

  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      const newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let qa = res.DT.qa[i];
        if (qa.imageFile) {
          qa.imageName = `Question - ${qa.id}.png`;
          qa.imageFile = await urltoFile(
            `data:image/png;base64,${qa.imageFile}`,
            `Question - ${qa.id}.png`,
            `image/png`
          );
        }
        newQA.push(qa);
      }
      setQuestions(newQA);
    }
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      console.log("check ", type, id);
      let questionClone = _.cloneDeep(questions);

      questionClone = questionClone.filter((item) => item.id !== id);
      setQuestions(questionClone);
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);

    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      const index = questionClone.findIndex(
        (question) => question.id === questionId
      );
      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    }
    if (type === "REMOVE") {
      const index = questionClone.findIndex(
        (question) => question.id === questionId
      );
      questionClone[index].answers = questionClone[index].answers.filter(
        (answer) => answer.id !== answerId
      );
      setQuestions(questionClone);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    if (type === "QUESTION") {
      const index = questionClone.findIndex(
        (question) => question.id === questionId
      );
      if (index > -1) {
        questionClone[index].description = value;
        setQuestions(questionClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, e) => {
    let questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex(
      (question) => question.id === questionId
    );
    console.log("index q", index);
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionClone[index].imageFile = e.target.files[0];
      questionClone[index].imageName = e.target.files[0].name;
      setQuestions(questionClone);
    }
  };

  const handleOnChangeAnswer = (type, questionId, answerId, value) => {
    let questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex(
      (question) => question.id === questionId
    );
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
    }
    setQuestions(questionClone);
  };

  const handlePreviewImage = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex(
      (question) => question.id === questionId
    );
    if (index > -1) {
      setDataImage({
        title: questionClone[index].imageName,
        url: URL.createObjectURL(questionClone[index].imageFile),
      });
    }
    setIspreviewImage(true);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleSubmitQuestionForQuiz = async () => {
    //todo
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    //validate question
    let isInvalidQuestion = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isInvalidQuestion = false;
        indexQ1 = i;
      }
      if (!isInvalidQuestion) break;
    }
    if (!isInvalidQuestion) {
      toast.error(`Not empty description question ${indexQ1 + 1} `);
      return;
    }

    //validate answer
    let isInvalidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isInvalidAnswer = false;
          indexA = j;
        }
      }
      indexQ = i;
      if (!isInvalidAnswer) break;
    }
    if (!isInvalidAnswer) {
      toast.error(`Not empty question ${indexQ + 1} answer ${indexA + 1}`);
      return;
    }

    let questionClone = _.cloneDeep(questions);
    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
      }
    }
    let res = await postUpsertQuizQA({
      quizId: selectedQuiz.value,
      questions: questionClone,
    });

    if (res && res.EC === 0) {
      toast.success("Update Quiz successfully");
      fetchQuizWithQA();
    }
  };

  return (
    <div className="question-container">
      {/* <div className="title">Manage Question</div>
      <hr /> */}
      <div className="add-new-question">
        <div className="col-6 my-3 ">
          <label className="mb-1">Step 1 - Select Quiz:</label>
          <Select
            className="z-3"
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="col-12">
          <div className="mb-1">Step 2 - Add question:</div>
          {questions &&
            questions.length > 0 &&
            questions.map((item, index) => {
              return (
                <div key={item.id} className="question-content">
                  <div className="question-title">
                    <div className="form-floating description">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="description"
                        value={item.description}
                        onChange={(e) =>
                          handleOnChange("QUESTION", item.id, e.target.value)
                        }
                      />
                      <label>Question {index + 1}'s description</label>
                    </div>
                    <div className="group-upload">
                      <label className=" label-upload" htmlFor={item.id}>
                        <FcPlus /> Upload File Image
                      </label>
                      <input
                        type="file"
                        id={item.id}
                        hidden
                        onChange={(e) => handleOnChangeFileQuestion(item.id, e)}
                      />
                      <span>
                        {item.imageName ? (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handlePreviewImage(item.id)}
                          >
                            {item.imageName}
                          </span>
                        ) : (
                          "0 file is uploaded"
                        )}
                      </span>
                    </div>
                    <div className="btn-group">
                      <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                        <BsFillPatchPlusFill className="btn-add" />
                      </span>
                      {questions.length > 1 && (
                        <span
                          onClick={() =>
                            handleAddRemoveQuestion("REMOVE", item.id)
                          }
                        >
                          <BsFillPatchMinusFill className="btn-remove" />
                        </span>
                      )}
                    </div>
                  </div>
                  {item.answers &&
                    item.answers.length > 0 &&
                    item.answers.map((answer, index) => {
                      return (
                        <div key={answer.id} className="answer-content ">
                          <input
                            className="form-check-input isCorrect"
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={(e) =>
                              handleOnChangeAnswer(
                                "CHECKBOX",
                                item.id,
                                answer.id,
                                e.target.checked
                              )
                            }
                          />
                          <div className="form-floating answer-name">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Answer 1"
                              value={answer.description}
                              onChange={(e) =>
                                handleOnChangeAnswer(
                                  "INPUT",
                                  item.id,
                                  answer.id,
                                  e.target.value
                                )
                              }
                            />
                            <label>Answer {index + 1}</label>
                          </div>
                          <div className="btn-group">
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer("ADD", item.id, "")
                              }
                            >
                              <AiFillPlusSquare className="btn-add" />
                            </span>
                            {item.answers.length > 1 && (
                              <span
                                onClick={() =>
                                  handleAddRemoveAnswer(
                                    "REMOVE",
                                    item.id,
                                    answer.id
                                  )
                                }
                              >
                                <AiOutlineMinusCircle className="btn-remove" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}

          {questions && questions.length > 0 && (
            <div onClick={() => handleSubmitQuestionForQuiz()}>
              <button className="btn btn-warning">Save Questions</button>
            </div>
          )}
          {isPreviewImage && (
            <Lightbox
              onClose={() => setIspreviewImage(false)}
              image={dataImage.url}
              title={dataImage.title}
            ></Lightbox>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQA;
