import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { DELETE_ITEM } from "../../../redux/actionTypes";

const DeleteListItemModal = (props) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch({
      type: DELETE_ITEM,
      itemId: props.itemId,
      listName: props.listName,
    });
    props.toggleForm();
  };
  return (
    <Modal isOpen={props.showForm} toggle={props.toggleForm} centered>
      <ModalHeader toggle={props.toggleForm}>Delete confirmation</ModalHeader>
      <ModalBody>
        <p>
          Are you sure you want to delete this item: <b>{props.title}</b>?
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={props.toggleForm}>
          Cancel
        </Button>
        <Button color="danger" onClick={onDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteListItemModal;
