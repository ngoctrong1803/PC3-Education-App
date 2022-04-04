import { useEffect } from "react";
import { Helmet } from "react-helmet";
import userlayout from "../comps/Layout";
import NoLayout from "../comps/NoLayout";
import AdminLayout from "../comps/AdminLayout";
import "../styles/globals.scss";
import { AuthProvider } from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../redux/store";

const layouts = {
  userLayout: userlayout,
  noLayout: NoLayout,
  adminLayout: AdminLayout,
};

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <Provider store={store}>
      <ToastContainer />
      <Layout>
        {/* this component is render content */}
        <Component {...pageProps}></Component>

        {/* Helmet to link script file */}
        <Helmet>
          <script
            type="module"
            src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
            async
          ></script>
          <script
            nomodule
            src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
            async
          ></script>
        </Helmet>
      </Layout>
    </Provider>
  );
}

export default MyApp;
