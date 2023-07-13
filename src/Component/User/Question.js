/** @format */
import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

const Question = ({ data, currQues, handleCheckAnswer }) => {
  const [isPreviewImage, setIspreviewImage] = useState(false);

  if (_.isEmpty(data)) return <></>;

  const answers = data.answers;

  const handleCheckBox = (e, quizId, answerId) => {
    handleCheckAnswer(quizId, answerId);
  };
  return (
    <>
      <div className="ques-image">
        {data.image && (
          <img
            src={`data:image/jpeg;base64,${data.image}`}
            alt=""
            onClick={() => setIspreviewImage(true)}
          />
        )}

        {isPreviewImage && (
          <Lightbox
            onClose={() => setIspreviewImage(false)}
            image={`data:image/jpeg;base64,${data.image}`}
            title={data.questionDescription}
          ></Lightbox>
        )}
      </div>

      <div className="question">
        Question {currQues} : {data.questionDescription}?
      </div>

      <ul className="answers">
        {answers &&
          answers.length > 0 &&
          answers.map((answer, index) => (
            <li key={index} className="a-child">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={answer.isSelected}
                  id={`answerId-${answer.id}`}
                  onChange={(e) => handleCheckBox(e, data.quizId, answer.id)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`answerId-${answer.id}`}
                >
                  {answer.description}
                </label>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Question;
