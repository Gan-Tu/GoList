import React from "react";
import { Card } from "reactstrap";
import { Link, Share2, Trash2, Tag, Edit2 } from "react-feather";
import defaultImg from "../../../assets/images/other-images/lightgallry-defaut.jpg";
import { toast } from "react-toastify";

const ListItem = (props) => {
  const editItem = () => {
    toast.error("Edit is not implemented yet");
  };

  const shareItem = () => {
    toast.error("Share is not implemented yet");
  };

  const removeItem = () => {
    toast.error("Remove is not implemented yet");
  };

  const tagItem = () => {
    toast.error("Tag is not implemented yet");
  };

  return (
    <Card className="card-with-border bookmark-card o-hidden">
      <div className="details-website">
        <img
          className="img-fluid"
          src={props.image || defaultImg}
          alt={`logo for "${props.title}"`}
          style={{ maxWidth: "200px" }}
        />
        <div className="desciption-data">
          <div className="title-bookmark">
            <h6 className="title_0">{props.title}</h6>
            <p className="weburl_0">
              <a href={props.website_url} target="_blank" rel="noreferrer">
                {/* // TODO(tugan): truncate if url is too long */}
                {props.website_url}
              </a>
            </p>
            <div className="hover-block">
              <ul>
                <li>
                  <a href="#javascript" onClick={editItem}>
                    <Edit2 />
                  </a>
                </li>
                <li>
                  <a href={props.website_url} target="_blank" rel="noreferrer">
                    <Link />
                  </a>
                </li>
                <li>
                  <a href="#javascript" onClick={shareItem}>
                    <Share2 />
                  </a>
                </li>
                <li>
                  <a href="#javascript" onClick={removeItem}>
                    <Trash2 />
                  </a>
                </li>
                <li className="pull-right text-right">
                  <a href="#javascript" onClick={tagItem}>
                    <Tag />
                  </a>
                </li>
              </ul>
            </div>
            <div className="content-general">
              <p className="desc_0">{props.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListItem;
