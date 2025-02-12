import { axiosInstance } from "../../../interceptors/AxiosInterceptor";

export function doGetexams(type, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .get(`/exam/list?examType=${type}`)
    .then((res) => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch((err) => {
      handleLoading(false);
      handleFailure(err);
    });
};

export function doPostUserSession(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .post("/exam/session", data)
    .then(res => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch(err => {
      handleLoading(false);
      handleFailure(err);
    });
};

export function doPostExamStateSession(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .post(`/exam/session/state`, data)
    .then((res) => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch((err) => {
      handleLoading(false);
      handleFailure(err);
    });
};

export function doGenerateReport(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .post("/exam/report", data)
    .then((res) => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch((err) => {
      handleLoading(false);
      handleFailure(err);
    });
}

export function doExitSession(sessionId, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .delete(`/exam/session/state/${sessionId}`)
    .then((res) => {
      handleLoading(false);
      console.log(res);
    })
    .catch((err) => {
      handleLoading(false);
      handleFailure(err);
    });
}

export function doGetQuestionsByCoursesAndLevel(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance.post("/exam/questions", data)
    .then(res => {
      handleLoading(false);
      handleSuccess(res.data);
      //setQuestions(res.data);
      //setFilteredQuestions(res.data);
    })
    .catch(err => {
      handleLoading(false);
      handleFailure(err);
    })
};

export function doGetCourses(handleSuccess, handleFailure) {
  axiosInstance.get("/exam/courses")
    .then(res => {
      handleSuccess(res.data, "GET_COURSES");
    })
    .catch(err => {
      handleFailure(err);
    });
};

export function doGetExamLevels(handleSuccess, handleFailure) {
  axiosInstance.get("/exam/levels")
    .then(res => {
      handleSuccess(res.data, "GET_LEVELS");
    })
    .catch(err => {
      handleFailure(err);
    });
};

export function doGetExamTypes(handleSuccess, handleFailure) {
  axiosInstance.get("/exam/types")
    .then(res => {
      handleSuccess(res.data, "GET_TYPES");
    })
    .catch(err => {
      handleFailure(err);
    });
};


export function doDeleteExams(examId, handleSuccess, handleFailure) {
  axiosInstance
    .delete(`/exam/delete/${examId}`)
    .then((res) => {
      handleSuccess(examId);
    })
    .catch((err) => {
      handleFailure(err);
    });
};


export function doCreateExam(data, handleSuccess, handleFailure) {
  axiosInstance.post('/exam/create', data)
      .then(res => {
          handleSuccess();
      })
      .catch(err => {
          if (err.response && err.response.data) {
              // application specific error                    
              handleFailure(err.response?.data);
          } else {
              // generic axios error
              handleFailure(err.message);
          }
      });
}