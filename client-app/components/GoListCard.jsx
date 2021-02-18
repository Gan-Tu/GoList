import React from "react";

const GoListCard = (props) => {
  let date = props.date ? new Date(props.date) : new Date();
  let dateString = date.toDateString();
  let title = props.title;
  if (title && title.length >= 32) {
    title = title.slice(0, 32) + "...";
  }
  let description = props.description;
  if (description && description.length >= 70) {
    description = description.slice(0, 70) + "...";
  }
  let link = props.link || "#";
  let link_target = props.link ? "_blank" : "";

  return (
    <article className="card">
      <header className="card-header">
        <p>{dateString}</p>
        <a href={link} target={link_target}>
          <h2>{title}</h2>
        </a>
        <p>{description}</p>
      </header>
      <a href={link} target={link_target}>
        <div className="card-author">
          <div className="author-avatar">
            <img
              src={
                props.image_url ||
                "https://react.pixelstrap.com/cuba/static/media/7.525690a1.jpg"
              }
            />
          </div>
          {/* <svg className="half-circle" viewBox="0 0 106 57">
          <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
        </svg> */}
          <div className="author-name">
            <div className="author-name-prefix">Created by</div>
            {props.author || "Anonymous"}
          </div>
        </div>
        <div className="tags">
          {props.tags?.map((tag, idx) => (
            <a href="#" key={`GoListItemTag-${idx}`}>
              {tag}
            </a>
          ))}
        </div>
      </a>
    </article>
  );
};
export default GoListCard;
