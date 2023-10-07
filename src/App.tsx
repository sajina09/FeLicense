import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/NavBar";
import "./App.css";
import { Layout } from "antd";
import Footer from "components/Footer";
import AppRoutes from "routes";
import usePageLoader from "hooks/usePageLoader";

function App() {
  const [loader, LoaderComponent] = usePageLoader();

  if (loader) {
    return LoaderComponent;
  }
  return (
    <Router>
      <Navbar />
      {loader ? (
        <> {LoaderComponent} </>
      ) : (
        <Layout
          style={{
            marginTop: "64px",
            // margin: "0px 10rem", padding: "0px 0px"
          }}
        >
          <AppRoutes />
        </Layout>
      )}
      <Footer />
    </Router>
  );
}

export default App;
