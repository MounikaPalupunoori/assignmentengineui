import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ResetPassword from "./components/edvenswa.ae.auth/reset/ResetPassword";
import Signin from "./components/edvenswa.ae.auth/signin/Signin";
import Signup from "./components/edvenswa.ae.auth/signup/Signup";
import Instructions from "./components/edvenswa.ae.exam/instructions/Instructions";
import Home from "./components/edvenswa.ae.home/Home";
import PrivateRoute from "./guards/PrivateRoute";
import Layout from "./components/edvenswa.ae.layout/Layout";
import Exams from "./components/edvenswa.ae.exam/Exams";
import ExamSessionContainer from "./components/edvenswa.ae.exam/session/ExamSessionContainer";
import ExamReport from "./components/edvenswa.ae.exam/session/ExamReport";
import Tenants from "./components/edvenswa.ae.console/tenant/Tenants";
import TenantCreate from "./components/edvenswa.ae.console/tenant/TenantCreate";
import TenantGroups from "./components/edvenswa.ae.console/group/Groups";
import GroupCreate from "./components/edvenswa.ae.console/group/GroupCreate";
import TenantUsers from "./components/edvenswa.ae.console/user/Users";
import SearchUserContainer from "./components/edvenswa.ae.console/user/SearchUserContainer";
import ExamsList from "./components/edvenswa.ae.console/exam/ConsoleExams";
import QuestionsContainer from "./components/edvenswa.ae.exam/create/QuestionsDialogBox";
import CreateExam from "./components/edvenswa.ae.exam/create/ExamCreate";

function App() {
  return (
    <Suspense fallback={<React.Fragment>Loading...</React.Fragment>}>
      <Routes>
        <Route index element={<Signin />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/reset" element={<ResetPassword />}></Route>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Layout Component={Home}></Layout>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/exam/instructions"
          element={
            <PrivateRoute>
              <Layout Component={Instructions}></Layout>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/exams"
          element={
            <PrivateRoute>
              <Layout Component={Exams}></Layout>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/exam/session/:sessionId"
          element={
            <PrivateRoute>
              <Layout Component={ExamSessionContainer}></Layout>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/exam/report"
          element={
            <PrivateRoute>
              <Layout Component={ExamReport}></Layout>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/console/tenant"
          element={
            <PrivateRoute>
              <Layout Component={Tenants}></Layout>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/console/tenant/create"
          element={
            <PrivateRoute>
              <Layout Component={TenantCreate}></Layout>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/console/tenant/group"
          element={
            <PrivateRoute>
              <Layout Component={TenantGroups}></Layout>
            </PrivateRoute>
          }
        ></Route>
         <Route
          path="/console/tenant/group/create"
          element={
            <PrivateRoute>
              <Layout Component={GroupCreate}></Layout>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/console/tenant/group/user"
          element={
            <PrivateRoute>
              <Layout Component={TenantUsers}></Layout>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/console/users"
          element={
            <PrivateRoute>
              <Layout Component={SearchUserContainer}></Layout>
            </PrivateRoute>
          }
        ></Route>
         <Route
          path="/console/exams"
          element={
            <PrivateRoute>
              <Layout Component={ExamsList}></Layout>
            </PrivateRoute>
          }
        ></Route>
         <Route
          path="/console/exam/create"
          element={
            <PrivateRoute>
              <Layout Component={CreateExam}></Layout>
            </PrivateRoute>
          }
        ></Route>
         <Route
          path="/console/questions"
          element={
            <PrivateRoute>
              <Layout Component={QuestionsContainer}></Layout>
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
