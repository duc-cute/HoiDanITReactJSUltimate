/** @format */

import axios from "../ultis/axiosCustomize.js";
const postCreateNewUser = (email, password, userName, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};
const putUpdateUser = (id, userName, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};

const deleteUser = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post("api/v1/login", { email, password });
};
const postRegister = (email, password, username) => {
  return axios.post("api/v1/register", { email, password, username });
};

//QUIZ
const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.post("api/v1/quiz", data);
};

const getAllQuiz = () => {
  return axios.get(`api/v1/quiz/all`);
};

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.put("api/v1/quiz", data);
};

const deleteQuiz = (quizId) => {
  return axios.delete(`api/v1/quiz/${quizId}`, { data: { id: quizId } });
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post("api/v1/question", data);
};

const postCreateNewAnswerForQuestion = (
  question_id,
  description,
  correct_answer
) => {
  return axios.post("api/v1/answer", {
    question_id,
    description,
    correct_answer,
  });
};

const postAssignQuiz = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQuizQA = (data) => {
  return axios.post("api/v1/quiz-upsert-qa", { ...data });
};

const logout = (email, refresh_token) => {
  return axios.post("api/v1/logout", { email, refresh_token });
};

const getOverview = () => {
  return axios.get("api/v1/overview");
};
export {
  postCreateNewUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuiz,
  putUpdateQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQuizQA,
  logout,
  getOverview,
};
