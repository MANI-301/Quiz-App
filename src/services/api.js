import axios from "axios";

const API_URL = "http://localhost:3001";

export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
};

export const addUser = async (user) => {
  const newUser = { ...user, role: "student" };
  const res = await axios.post(`${API_URL}/users`, newUser);
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
  return res.data.length > 0 ? res.data[0] : null;
};

export const getExams = async () => {
  const res = await axios.get(`${API_URL}/exams`);
  return res.data;
};

export const addExam = async (exam) => {
  const res = await axios.post(`${API_URL}/exams`, exam);
  return res.data;
};

export const updateExam = async (id, data) => {
  const res = await axios.patch(`${API_URL}/exams/${id}`, data);
  return res.data;
};

export const deleteExam = async (id) => {
  await axios.delete(`${API_URL}/exams/${id}`);
  
  const questions = await getQuestionsByExam(id);
  for (const q of questions) {
    await deleteQuestion(q.id);
  }
};


export const getQuestions = async () => {
  const res = await axios.get(`${API_URL}/questions`);
  return res.data;
};

export const getQuestionsByExam = async (examId) => {
  const res = await axios.get(`${API_URL}/questions?examId=${examId}`);
  return res.data;
};

export const getRandomQuestions = async (examId, count) => {
  const all = await getQuestionsByExam(examId);
  const shuffled = all.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const addQuestion = async (question) => {
  const res = await axios.post(`${API_URL}/questions`, question);
  return res.data;
};

export const updateQuestion = async (id, data) => {
  const res = await axios.patch(`${API_URL}/questions/${id}`, data);
  return res.data;
};

export const deleteQuestion = async (id) => {
  await axios.delete(`${API_URL}/questions/${id}`);
};


export const getVouchers = async () => {
  const res = await axios.get(`${API_URL}/vouchers`);
  return res.data;
};

export const validateVoucher = async (code) => {
  const res = await axios.get(`${API_URL}/vouchers?code=${code}&active=true`);
  return res.data.length > 0 ? res.data[0] : null;
};

export const addVoucher = async (voucher) => {
  const res = await axios.post(`${API_URL}/vouchers`, voucher);
  return res.data;
};

export const updateVoucher = async (id, data) => {
  const res = await axios.patch(`${API_URL}/vouchers/${id}`, data);
  return res.data;
};

export const deleteVoucher = async (id) => {
  await axios.delete(`${API_URL}/vouchers/${id}`);
};

// Results
export const getResults = async () => {
  const res = await axios.get(`${API_URL}/results`);
  return res.data;
};

export const addResult = async (result) => {
  const res = await axios.post(`${API_URL}/results`, result);
  return res.data;
};

export const deleteResult = async (id) => {
  await axios.delete(`${API_URL}/results/${id}`);
};