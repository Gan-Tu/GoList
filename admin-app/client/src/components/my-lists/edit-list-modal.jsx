import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import GoListDetails from "./my-list-items";

const EditListModal = (props) => {
  return (
    <Modal
      isOpen={props.showForm}
      toggle={props.toggleForm}
      centered
      style={{ maxWidth: "1200px" }}
    >
      <ModalHeader toggle={props.toggleForm}>Edit GoList</ModalHeader>
      <ModalBody>
        <GoListDetails
          listName={props.listName}
          listTitle={props.listTitle}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={props.toggleForm}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditListModal;
