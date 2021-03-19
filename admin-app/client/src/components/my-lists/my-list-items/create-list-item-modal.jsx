import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const CreateListItemModal = (props) => {
  return (
    <Modal
      isOpen={props.showForm}
      toggle={props.toggleForm}
      centered
      style={{ maxWidth: "1200px" }}
    >
      <ModalHeader toggle={props.toggleForm}>Create GoList Item</ModalHeader>
      <ModalBody>
        <p>This is not implemented, but it's where you create an list item.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={props.toggleForm}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateListItemModal;
