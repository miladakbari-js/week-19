import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import Layout from "./Layout/Layout.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Layout>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools/>
        <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </Layout>
  </BrowserRouter>
  // </React.StrictMode>,
);
