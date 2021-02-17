import React from "react";
import { useGoList } from "../actions/golists";

const GoList = (props) => {
  const { data, isLoading, error } = useGoList(props.name || "demo");
  let content = "";
  if (error) {
    content = `Error...${error.message}`;
  } else if (isLoading) {
    content = "Loading...";
  } else {
    content = `data: ${JSON.stringify(data)}`;
  }

  return (
    <div className="page-wrapper horizontal-wrapper" id="pageWrapper">
      {content}
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
