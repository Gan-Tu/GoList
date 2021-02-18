import "../public/styles.css";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      name: params.name,
    },
  };
}

export default App;
