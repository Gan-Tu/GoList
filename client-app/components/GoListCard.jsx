import React from "react";

const GoListCard = (props) => {
  let date = props.date ? new Date(props.date) : new Date();
  let dateString = date.toDateString();

  return (
    <article className="card">
      <header className="card-header">
        <p>{dateString}</p>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </header>

      <div className="card-author">
        <a className="author-avatar" href="#">
          <img
            src={
              props.image_url ||
              "https://react.pixelstrap.com/cuba/static/media/7.525690a1.jpg"
            }
          />
        </a>
        <svg className="half-circle" viewBox="0 0 106 57">
          <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
        </svg>
        <div className="author-name">
          <div className="author-name-prefix">Created by</div>
          {props.author || "Anonymous"}
        </div>
      </div>
      <div className="tags">
        {props.tags?.map((tag) => (
          <a href="#">{tag}</a>
        ))}
      </div>
    </article>
  );
};
export default GoListCard;
