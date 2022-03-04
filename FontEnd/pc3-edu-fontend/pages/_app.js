import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../comps/Layout'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {

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
