import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

const EditListModal = (props) => {
  // TODO(tugan): change this for actual edit modal
  const onEdit = () => {
    toast.error("Edit is not supported yet. Stay tuned.");
    props.toggleEditListForm();
  };
  return (
    <Modal
      isOpen={props.showEditListForm}
      toggle={props.toggleEditListForm}
      centered
    >
      <ModalHeader toggle={props.toggleEditListForm}>
        Edit confirmation
      </ModalHeader>
      <ModalBody>
        <p>
          Are you sure you want to edit this GoList:{" "}
          <b>goli.st/{props.listName}</b>
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={props.toggleEditListForm}>
          Cancel
        </Button>
        <Button color="info" onClick={onEdit}>
          Edit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditListModal;
