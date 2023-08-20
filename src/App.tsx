import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/NavBar";
import "./App.css";
import { Layout } from "antd";
import Footer from "components/Footer";
import AppRoutes from "routes";

function App() {
  return (
    <Router>
      <Navbar />
      <Layout style={{ marginTop: "64px" }}>
        <AppRoutes />
      </Layout>
      <Footer />
    </Router>
  );
}

export default App;
