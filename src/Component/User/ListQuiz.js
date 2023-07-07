/** @format */

import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);
  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <div className="list-quiz-container container mt-3">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((Quiz) => {
          return (
            <div key={Quiz.id} className="card" style={{ width: "18rem" }}>
              <img
                src={`data:image/jpeg;base64,${Quiz.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {Quiz.id}</h5>
                <p className="card-text">{Quiz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quiz/${Quiz.id}`, {
                      state: { quizTitle: Quiz.description },
                    })
                  }
                >
                  Quiz Now
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListQuiz;
