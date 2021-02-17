import React from "react";
import Head from "next/head";
import { useGoList } from "../actions/golists";

const GoList = (props) => {
  const { data, isLoading, error } = useGoList(props.name || "demo");
  let content = "";
  let header = "GoList";
  if (error) {
    content = `Error...${error.message}`;
  } else if (isLoading) {
    content = "Loading...";
  } else {
    if (data.name) {
      header = `${header} | ${data.name}`;
    }
    content = `data: ${JSON.stringify(data)}`;
  }

  return (
    <div>
      <Head>
        <title>{header}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div>{content}</div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      name: params.name,
    },
  };
}

export default GoList;
