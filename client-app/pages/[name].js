import React from "react";
import List from "../components/List";

const GoListPage = (props) => {
  return (
    <div id="golist-page">
      <List listName={props.name}/>
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

export default GoListPage;
