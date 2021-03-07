import React from "react";
import { Card, CardBody, Media } from "reactstrap";

const ListCard = (props) => {
  // TODO(tugan): fix formatting issues with different title length, or description lengths
  return (
    <Card className="hover:shadow-xl">
      <CardBody>
        <Media>
          <img
            className="img-40 img-fluid m-r-20"
            src={props.icon_url}
            alt=""
          />
          <Media body>
            <h6 className="f-w-600">
              <a href="#javascript">{props.title}</a>
            </h6>
            <p>
              <a href={`https://goli.st/${props.listName}`}>
                goli.st/{props.listName}
              </a>
              {props.badge ? (
                <span className={`badge badge-${props.badge} pull-right`}>
                  {props.badgetxt}
                </span>
              ) : null}
            </p>
          </Media>
        </Media>
        <p>{props.body}</p>
      </CardBody>
    </Card>
  );
};

export default ListCard;
