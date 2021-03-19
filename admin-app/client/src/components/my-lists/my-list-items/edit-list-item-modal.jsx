import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const EditListItemModal = (props) => {
  return (
    <Modal
      isOpen={props.showForm}
      toggle={props.toggleForm}
      centered
      style={{ maxWidth: "600px" }}
    >
      <ModalHeader toggle={props.toggleForm}>Edit GoList Item</ModalHeader>
      <ModalBody>
        <p>This is not implemented, but it's where you edit an list item.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={props.toggleForm}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditListItemModal;
