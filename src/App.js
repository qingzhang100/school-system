import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./features/Login/Login.js";
import ResetPassword from "./features/Dashboard/ResetPassword.js";
import StudentList from "./features/Student/StudentList";
import StudentDetail from "./features/Student/studentDetail";
import ViewTeacher from "./features/Teacher/ViewTeacher.js";
import Overview from "./features/Dashboard/Overview";
import MyAccount from "./features/Dashboard/MyAccount";
import CourseList from "./features/Course/CourseList";
import NewCourse from "./features/Course/NewCourse";
import CourseDetailForm from "./features/Course/Detail";

import CourseEdit from "./features/Course/CourseEdit";
import CourseConfirm from "./features/Course/CourseConfirm";
import AppLayout from "./ui/Layout/AppLayout.js";
import MyCourses from "./features/MyCourses/MyCourses";
import TeacherList from "./features/Teacher/TeacherList.js";
import NewEnrollment from "./features/Enrollment/NewEnrollment.js";
import Error from "./ui/Error.js";
import NOTFOUND from "./ui/NOTFOUND.js";
import { getStudents } from "./services/apiStudent.js";
import { getTeachers } from "./services/apiTeacher.js";
import { getTeacherByNo } from "./services/apiTeacher.js";
import { generateUserNo } from "./services/apiUser.js";
import NewUser from "./features/Users/NewUser.js";
import { getProgramList } from "./services/apiProgram.js";
import { getUsers } from "./services/apiUser.js";
import ProgramList from "./features/Program/ProgramList.js";
import ViewProgram from "./features/Program/ViewProgram.js";
import EditProgram from "./features/Program/EditProgram.js";
import NewProgram from "./features/Program/NewProgram.js";
import UserList from "./features/Users/UserList.js";
import ViewUser from "./features/Users/ViewUser.js";
import EnrollmentList from "./features/Enrollment/EnrollmentList.js";
import CourseDetail from "./features/Course/CourseDetail.js";
import icons from "./ui/Icons/icons.js";

function App() {
  const routes = [
    {
      path: "/",
      element: <Login />,
      title: "Home",
    },
    {
      element: <AppLayout />,
      errorElement: <Error />,
      loader: () => {
        return routes;
      },
      children: [
        {
          path: "dashboard",
          element: <Outlet />,
          title: "Dashboard",
          icon: icons.DashboardIcon,
          children: [
            { index: true, element: <Overview />, title: "Overview" },
            {
              path: "/dashboard/overview",
              element: <Overview />,
              title: "Overview",
            },
            {
              path: "/dashboard/my-account",
              element: <MyAccount />,
              title: "My Account",
            },
            {
              path: "/dashboard/reset-password",
              element: <ResetPassword />,
              title: "Reset Password",
              hideInSidebar: true,
            },
          ],
        },
        {
          path: "my-courses",
          element: <MyCourses />,
          title: "My Courses",
          icon: icons.MyCoursesIcon,
          children: [
            { index: true, element: <MyCourses />, title: "My Courses" },
            {
              path: "my-courses",
              element: <MyCourses />,
              title: "My Courses",
            },
          ],
        },
        {
          path: "users",
          element: <Outlet />,
          title: "Users",
          icon: icons.DashboardIcon,
          children: [
            { index: true, element: <UserList />, title: "User List" },
            {
              path: "/users/user-list",
              element: <UserList />,
              loader: getUsers,
              title: "User List",
            },
            {
              path: "/users/new-user",
              element: <NewUser />,
              title: "New User",
            },
            {
              path: "/users/:userNo",
              element: <ViewUser />,
              title: "View User",
              hideInSidebar: true,
            },
          ],
        },

        {
          path: "students",
          element: <Outlet />,
          title: "Students",
          icon: icons.StudentIcon,
          children: [
            {
              index: true,
              element: <StudentList />,
              loader: getStudents,
              title: "Student List",
            },
            {
              path: "/students/student-list",
              element: <StudentList />,
              loader: getStudents,
              title: "Student List",
            },
            {
              path: "/students/:studentID",
              element: <StudentDetail />,
              title: "Student Detail",
              hideInSidebar: true,
            },
          ],
        },

        {
          path: "courses",
          element: <Outlet />,
          title: "Courses",
          icon: icons.CourseIcon,
          children: [
            { index: true, element: <CourseList />, title: "Course List" },
            {
              path: "/courses/course-list",
              element: <CourseList />,
              title: "Course List",
            },
            {
              path: "/courses/new-course",
              element: <NewCourse />,
              title: "New Course",
            },
            {
              path: "/courses/:courseNo",
              element: <CourseDetail />,
              title: "Course Details",
            },
            {
              path: "/courses/newEnrollment/:courseNo",
              element: <NewEnrollment />,
              title: "New Enrollment",
            },
          ],
        },
        {
          path: "teachers",
          element: <Outlet />,
          title: "Teachers",
          icon: icons.TeacherIcon,
          children: [
            {
              index: true,
              element: <TeacherList />,
              loader: getTeachers,
              title: "Teacher List",
            },
            {
              path: "/teachers/teacher-list",
              element: <TeacherList />,
              loader: getTeachers,
              title: "Teacher List",
            },
            {
              path: "/teachers/:userNo",
              element: <ViewTeacher />,
              title: "View Teacher",
              hideInSidebar: true,
            },
          ],
        },
        {
          path: "programs",
          element: <Outlet />,
          title: "Programs",
          icon: icons.ProgramIcon,
          children: [
            {
              index: true,
              element: <ProgramList />,
              loader: getProgramList,
              title: "Program List",
            },
            {
              path: "/programs/program-list",
              element: <ProgramList />,
              loader: getProgramList,
              title: "Program List",
            },
            {
              path: "/programs/:programId",
              element: <ViewProgram />,
              title: "View Program",
              hideInSidebar: true,
            },
            {
              path: "/programs/edit/:programId",
              element: <EditProgram />,
              title: "Edit Program",
              hideInSidebar: true,
            },
            {
              path: "/programs/new-program",
              element: <NewProgram />,
              title: "New Program",
              hideInSidebar: true,
            },
          ],
        },
        {
          path: "enrollments",
          element: <Outlet />,
          title: "Enrollments",
          icon: icons.ProgramIcon,
          children: [
            {
              index: true,
              element: <EnrollmentList />,
              //loader: getProgramList,
              title: "Enrollment List",
            },
            {
              path: "/enrollments/enrollment-list",
              element: <EnrollmentList />,
              //loader: getProgramList,
              title: "Enrollment List",
            },
            // {
            //   path: "/enrollments/new-enrollment",
            //   element: <NewEnrollment />,
            //   //loader: getProgramList,
            //   title: "New Enrollment",
            // },
          ],
        },
        {
          path: "*",
          element: <NOTFOUND />,
          title: "Not Found",
          icon: "ErrorIcon",
        },
        // {
        //   path: "/course/:courseID",
        //   element: <CourseDetail />,
        //   title: "Course Detail",
        // },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
