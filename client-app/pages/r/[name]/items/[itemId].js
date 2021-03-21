import React from "react";

const GoListItemRedirect = (props) => {
  return (
    <div id="golist-page">
      Link doesn't exist.
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://api.goli.st/lists/${params.name}/items/${params.itemId}`
  );
  const {link}  = await res.json();
  if (link) {
    return {
      redirect: {
        destination: link,
        permanent: false,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export default GoListItemRedirect;
