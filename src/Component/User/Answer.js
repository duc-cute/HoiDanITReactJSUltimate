/** @format */
import _ from "lodash";
const Answer = ({ data, currQues, handleCheckAnswer }) => {
  if (_.isEmpty(data)) return <></>;
  const answers = data.answers;
  const handleCheckBox = (e, quizId, answerId) => {
    handleCheckAnswer(quizId, answerId);
  };
  return (
    <>
      <div className="ques-image">
        {data.image && (
          <img src={`data:image/jpeg;base64,${data.image}`} alt="" />
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
                  value=""
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

export default Answer;
