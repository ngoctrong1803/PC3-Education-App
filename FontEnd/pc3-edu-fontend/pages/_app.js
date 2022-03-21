import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import userlayout from '../comps/Layout'
import NoLayout from '../comps/NoLayout'
import '../styles/globals.scss'

const layouts = {
  userLayout : userlayout,
  noLayout : NoLayout
}

function MyApp({ Component, pageProps }) {


  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <Layout>
        {/* this component is render content */}
        <Component {...pageProps} ></Component>

        {/* Helmet to link script file */}
        <Helmet>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"  async></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"  async></script>
        </Helmet>
    </Layout>
  )
}

export default MyApp
