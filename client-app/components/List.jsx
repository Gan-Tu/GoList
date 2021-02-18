import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import GoListCard from "./GoListCard";
import { useGoList } from "../actions/golists";

const List = (props) => {
  const { data, isLoading, error } = useGoList(props.listName || "demo");
  let content = "";
  let card = null;
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
    card = (
      <GoListCard
        date={data.last_modified_date}
        title={data.title}
        author={data.created_by}
        description={data.description}
        tags={[`hits: ${data.hits || 0}`]}
      />
    );
  }

  return (
    <Container fluid={true}>
      <Head>
        <title>{header}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <p>{content}</p>
      <section className="card-list">
        {card}
      </section>
    </Container>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      name: params.name,
    },
  };
}

export default List;
