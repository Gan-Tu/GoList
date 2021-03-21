import React, { useState } from "react";
import { Card } from "reactstrap";
import { Link, Share2, Trash2, Edit2 } from "react-feather";
import defaultImg from "../../../assets/images/other-images/lightgallry-defaut.jpg";
import { toast } from "react-toastify";
import EditListItemModal from "./edit-list-item-modal";
import DeleteListItemModal from "./delete-list-item-modal";

const ListItem = (props) => {
  const shareItem = () => {
    toast.error("Share is not implemented yet");
  };

  const [showEditListItemForm, setShowEditListItemForm] = useState(false);
  const toggleEditListItemForm = () =>
    setShowEditListItemForm(!showEditListItemForm);

  const [showDeleteListItemForm, setShowDeleteListItemForm] = useState(false);
  const toggleDeleteListItemForm = () =>
    setShowDeleteListItemForm(!showDeleteListItemForm);

  return (
    <Card className="card-with-border bookmark-card o-hidden">
      <div className="details-website">
        <img
          className="img-fluid"
          src={props.image || defaultImg}
          alt={`logo for "${props.title}"`}
          style={{
            maxWidth: "200px",
            maxHeight: "150px",
            width: "auto",
            height: "auto",
          }}
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
                  <a href="#javascript" onClick={toggleEditListItemForm}>
                    <Edit2 />
                  </a>
                  <EditListItemModal
                    showForm={showEditListItemForm}
                    toggleForm={toggleEditListItemForm}
                  />
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
                  <a href="#javascript" onClick={toggleDeleteListItemForm}>
                    <Trash2 />
                  </a>
                  <DeleteListItemModal
                    itemId={props.itemId}
                    title={props.title}
                    listName={props.listName}
                    showForm={showDeleteListItemForm}
                    toggleForm={toggleDeleteListItemForm}
                  />
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
