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
          <link rel="icon" type="image/png"  href="/favicon.png" />
        </Head>
        <p>Error...{error.message}</p>
      </Container>
    );
  } else if (isLoading) {
    return (
      <Container fluid={true}>
        <Head>
          <title>{header}</title>
          <link rel="icon" type="image/png"  href="/favicon.png" />
        </Head>
        <p>Loading...</p>
      </Container>
    );
  } else if (data?.entities.length === 0) {
    return (
      <Container fluid={true}>
        <Head>
          <title>{header}</title>
          <link rel="icon" type="image/png"  href="/favicon.png" />
        </Head>
        <h1>No items in this GoList, or the list doesn't exist.</h1>
      </Container>
    );
  }

  return (
    <Container fluid={true}>
      <Head>
        <title>{header}</title>
        <link rel="icon" type="image/png"  href="/favicon.png" />
      </Head>
      <section className="card-list">
        {data.entities.map((item, idx) => (
          <GoListCard
            key={`GoListCard-${idx}`}
            date={item.last_modified_date}
            title={item.title}
            author={item.owner_display_name}
            description={item.description}
            image_url={item.image_url}
            link={item.link}
            tags={item.tags}
          />
        ))}
      </section>
    </Container>
  );
};

export default List;
