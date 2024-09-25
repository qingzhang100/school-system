import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddProfile from "./features/AddProfile.js";
import StudentList from "./features/Student/StudentList";
import StudentConfirmed from "./features/Student/StudentConfirm";
import Profile from "./features/Profile/Profile.js";
import Overview from "./features/Dashboard/Overview";
import AccountSetting from "./features/Dashboard/AccountSetting";
import CourseList from "./features/Course/CourseList";
import AddCourse from "./features/Course/AddCourse";
import CourseEdit from "./features/Course/CourseEdit";
import CourseConfirm from "./features/Course/CourseConfirm";
import AppLayout from "./ui/Layout/AppLayout.js";
import MyCourses from "./features/MyCourses/MyCourses";
import TeacherList from "./features/Teacher/TeacherList.js";
import AddEnrollment from "./features/Enrollment/AddEnrollment.js";
import Error from "./ui/Error.js";
import NOTFOUND from "./ui/NOTFOUND.js";
import { getStudents } from "./services/apiStudent.js";
import { getTeachers } from "./services/apiTeacher.js";
import { getTeacher } from "./services/apiTeacher.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "dashboard",
        element: <Outlet />,
        children: [
          { index: true, element: <Overview /> },
          { path: "overview", element: <Overview /> },
          { path: "account-setting", element: <AccountSetting /> },
        ],
      },
      {
        path: "student",
        element: <Outlet />,
        children: [
          { index: true, element: <StudentList />, loader: getStudents },
          {
            path: "student-list",
            element: <StudentList />,
            loader: getStudents,
          },
          { path: ":No", element: <Profile /> },
          { path: "add-student", element: <AddProfile type="student" /> },
        ],
      },
      {
        path: "my-courses",
        element: <MyCourses />,
        children: [{ path: "overview", element: <MyCourses /> }],
      },
      {
        path: "Course",
        element: <Outlet />,
        children: [
          { index: true, element: <CourseList /> },

          { path: "course-list", element: <CourseList /> },
          { path: "add-course", element: <AddCourse /> },
        ],
      },
      {
        path: "teacher",
        element: <Outlet />,
        children: [
          { index: true, element: <TeacherList />, loader: getTeachers },
          {
            path: "teacher-list",
            element: <TeacherList />,
            loader: getTeachers,
          },
          {
            path: ":ID",
            element: <Profile type="Teacher" />,
            loader: getTeacher,
          },
          { path: "add-teacher", element: <AddProfile type="teacher" /> },
        ],
      },
      {
        path: "Enrollment",
        element: <AddEnrollment />,
      },
      {
        path: "*",
        element: <NOTFOUND />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
