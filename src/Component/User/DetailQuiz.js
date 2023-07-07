/** @format */

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Answer from "./Answer";
/** @format */
const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    fetchQuestions(quizId);
  }, [quizId]);
  const fetchQuestions = async (id) => {
    const res = await getDataQuiz(id);
    if (res && res.EC === 0) {
      let raw = res.DT;
      const data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
              item.answer.isSelected = false;
            }
            answers.push(item.answers);
          });

          return { quizId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handlePrevQues = () => {
    if (currQues - 1 < 0) return;
    setCurrQues(currQues - 1);
  };

  const handlePrevNext = () => {
    if (dataQuiz && dataQuiz.length > currQues + 1) setCurrQues(currQues + 1);
  };

  const handleCheckAnswer = (quesId, answerId) => {
    const dataQuizClone = _.cloneDeep(dataQuiz);
    console.log("dataClone", dataQuizClone);
  };
  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId} : {location?.state?.quizTitle}
          <hr />
        </div>
        <div className="q-content">
          <Answer
            handleCheckAnswer={handleCheckAnswer}
            currQues={currQues + 1}
            data={dataQuiz && dataQuiz.length > 0 && dataQuiz[currQues]}
          />
        </div>
        <div className="footer">
          <button
            className="btn btn-secondary"
            onClick={handlePrevQues}
            disabled={currQues === 0}
          >
            Prev
          </button>
          <button
            className="btn btn-primary "
            onClick={handlePrevNext}
            disabled={currQues + 1 === dataQuiz.length}
          >
            Next
          </button>
        </div>
      </div>
      <div className="right-content">Count Down</div>
    </div>
  );
};

export default DetailQuiz;
