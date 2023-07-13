/** @format */

import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = ({ currQues, setCurrQues, dataQuiz, handleFinish }) => {
  const refNumberQues = useRef([]);
  if (dataQuiz && dataQuiz.length > 0) {
    // console.log("dataQ", dataQuiz);
  }

  const getClassQuestion = (index, question) => {
    if (question && question.answers.length > 0) {
      const isUnAnswer = question.answers.every(
        (answer) => answer.isSelected === false
      );

      const isSelected = currQues === index;

      if (!isUnAnswer) {
        return "question selected";
      }
      if (isSelected) {
        return "question clicked";
      }
    }

    return "question";
  };

  // const handleClickNumberQues = (item, index) => {
  //   setCurrQues(index);
  //   console.log(refNumberQues.current[index]);
  //   refNumberQues.current[index].className = "question clicked";
  //   if (currQues === index) {
  //   }
  // };
  return (
    <>
      <div className="main-timer">
        <CountDown handleFinish={handleFinish} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => (
            <div
              key={index}
              className={getClassQuestion(index, item)}
              onClick={() => setCurrQues(index)}
              ref={refNumberQues.current[index]}
            >
              {index + 1}
            </div>
          ))}
      </div>
    </>
  );
};

export default RightContent;
