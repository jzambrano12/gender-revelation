// _app.js
import "../styles.css";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export const getServerSideProps = async ({ query }) => {
  resetServerContext();
  return { props: { data: [] } };
};
