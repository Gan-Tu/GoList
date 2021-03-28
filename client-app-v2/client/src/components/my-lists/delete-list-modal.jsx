import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_LIST } from "../../redux/actionTypes";

const DeleteListModal = (props) => {
  const dispatch = useDispatch();
  const uid = useSelector((store) => store.SessionReducer.user.uid);
  const onDelete = () => {
    dispatch({ type: DELETE_LIST, name: props.listName, uid });
    props.toggleDeleteListForm();
  };
  return (
    <Modal
      isOpen={props.showDeleteListForm}
      toggle={props.toggleDeleteListForm}
      centered
    >
      <ModalHeader toggle={props.toggleDeleteListForm}>
        Delete confirmation
      </ModalHeader>
      <ModalBody>
        <p>
          Are you sure you want to delete this GoList, and all links grouped in
          them: <b>goli.st/{props.listName}</b>
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={props.toggleDeleteListForm}>
          Cancel
        </Button>
        <Button color="danger" onClick={onDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteListModal;
