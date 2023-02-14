import Layout from "../components/Layout";
import "../styles/globals.css";
//we must wrap our app with redux for display our orders so we import redux
import store from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    //we passing props store from our redux setting
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
