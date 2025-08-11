
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import Layout from "./Layout/Layout.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Layout>
      <App />
      <Toaster position="top-center" reverseOrder={false}/>
    </Layout>
  </BrowserRouter>
  // </React.StrictMode>,
);
