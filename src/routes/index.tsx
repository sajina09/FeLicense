import AboutUs from "components/About Us";
import QuestionComponent from "components/Questions";
import ScrollToTop from "components/ScrollToTop";
import AllModelQuestions from "pages/AllModelQuestions";
import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";

const Home = React.lazy(() => import("pages/HomePage"));
const AllCourses = React.lazy(() => import("pages/AllCourses"));
const CourseSpecific = React.lazy(() => import("pages/CourseSpecific"));

export const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      { index: true, element: <Home /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "/all-fields", element: <AllCourses /> },
      { path: "/all-model-questions", element: <AllModelQuestions /> },
      { path: "/:name", element: <CourseSpecific /> },
      { path: "/:name/:id", element: <QuestionComponent /> },
    ],
  },
];

export default function AppRoutes() {
  const router = useRoutes(routes);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ScrollToTop />
      {router}
    </React.Suspense>
  );
}
