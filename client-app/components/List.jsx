import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import GoListCard from "./GoListCard";
import { useGoListItems } from "../actions/golists";

const List = (props) => {
  const { data, isLoading, error } = useGoListItems(props.listName || "demo");
  let header = `GoList - ${props.listName}`;
  if (error) {
    return (
      <Container fluid={true}>
        <Head>
          <title>{header}</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <p>Error...{error.message}</p>
      </Container>
    );
  } else if (isLoading) {
    return (
      <Container fluid={true}>
        <Head>
          <title>{header}</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <p>Loading...</p>
      </Container>
    );
  } else if (data?.entities.length === 0) {
    return (
      <Container fluid={true}>
        <Head>
          <title>{header}</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <h1>No items in this GoList, or the list doesn't exist.</h1>
      </Container>
    );
  }

  return (
    <Container fluid={true}>
      <Head>
        <title>{header}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <section className="card-list">
        {data.entities.map((item, idx) => (
          <GoListCard key={`GoListCard-${idx}`}
            date={item.last_modified_date}
            title={item.title}
            author={item.created_by}
            description={item.description}
            image_url={item.image_url}
            link={item.link}
            tags={[...item.tags, `goli.st/${props.listName}`].slice(0, 1)}
          />
        ))}
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
