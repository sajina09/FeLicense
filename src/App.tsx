import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import "./App.css";
import { Layout } from "antd";
import HomePage from "pages/HomePage";
import AllCourses from "pages/AllCourses";
import CourseSpecific from "pages/CourseSpecific";
import Footer from "components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Layout style={{ marginTop: "64px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-fields" element={<AllCourses />} />
          <Route path="/it-engineering" element={<CourseSpecific />} />
        </Routes>
      </Layout>
      <Footer />
    </Router>
  );
}

export default App;
