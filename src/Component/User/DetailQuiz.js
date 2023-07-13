/** @format */

import { useEffect, useState } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResultAnswer from "./ModalResultAnswer";
import RightContent from "./Content/RightContent";
import { Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";

/** @format */
const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [currQues, setCurrQues] = useState(0);

  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  const { t } = useTranslation();

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
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          answers = _.orderBy(answers, ["id"], ["asc"]);
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
    let dataQuizClone = _.cloneDeep(dataQuiz);

    let question = dataQuizClone.find((item) => +item.quizId === +quesId);
    if (question) {
      question.answers = question.answers.map((answer) => {
        if (answer.id === answerId) {
          answer.isSelected = !answer.isSelected;
        }
        return answer;
      });
    }
    let index = dataQuizClone.findIndex((item) => +item.quizId === +quesId);
    if (index > -1) {
      dataQuizClone[index] = question;
    }

    console.log("dataQuizClone", dataQuizClone);
    setDataQuiz(dataQuizClone);
  };

  const handleFinish = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.quizId;
        let userAnswerId = [];

        question.answers.forEach((answer) => {
          if (answer.isSelected) {
            userAnswerId.push(answer.id);
          }
        });

        payload.answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
    }
    const res = await postSubmitQuiz(payload);
    if (res && res.EC === 0) {
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData,
      });
      setIsShowModalResult(true);
    }
  };

  return (
    <>
      <Breadcrumb className="detail-quiz-new-header">
        <Breadcrumb.Item>
          <NavLink to="/" className="nav-link">
            {t("header.home")}
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/users" className="nav-link">
            {t("header.user")}
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <NavLink to="/admin" className="nav-link">
            {t("header.quiz")}
          </NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="detail-quiz-container container">
        <div className="left-content">
          <div className="title">
            Quiz {quizId} : {location?.state?.quizTitle}
            <hr />
          </div>
          <div className="q-content">
            <Question
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
            <button className="btn btn-warning " onClick={handleFinish}>
              Finish
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            currQues={currQues}
            setCurrQues={setCurrQues}
            handleFinish={handleFinish}
            dataQuiz={dataQuiz}
          />
        </div>
        <ModalResultAnswer
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={dataModalResult}
        />
      </div>
    </>
  );
};

export default DetailQuiz;
