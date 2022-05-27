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
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Script from "next/script";
import Authenticate from "../comps/Authenticate";

const layouts = {
  userLayout: userlayout,
  noLayout: NoLayout,
  adminLayout: AdminLayout,
};

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <Authenticate>
          <Layout>
            {/* this component is render content */}
            <Component {...pageProps}></Component>

            {/* Helmet to link script file */}
            {/* <Script
            src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
            strategy="beforeInteractive"
          /> */}
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
              {/* <script
              async
              type="text/javascript"
              src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
            ></script> */}
            </Helmet>
          </Layout>
        </Authenticate>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
