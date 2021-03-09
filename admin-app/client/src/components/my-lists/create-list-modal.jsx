import React, { useState } from "react";
import {useSelector} from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { toast } from "react-toastify";

const CreateListModal = (props) => {
  const uid = useSelector((store) => store.SessionReducer.user.uid);
  const displayName = useSelector((store) => store.SessionReducer.user.displayName);
  const [golistName, setGoListName] = useState("");
  const [golistTitle, setGoListTitle] = useState("");
  const [golistDescription, setGoListDescription] = useState("");
  const handleSubmit = (data) => {
    console.log({
      listName: golistName,
      owner_uid: uid,
      owner_display_name: displayName,
      title: golistTitle,
      description: golistDescription,
      update_date: new Date(),
    });
    toast.success(`A new GoList is created: goli.st/${golistName}`);
    props.toggleCreateListForm();
  };

  return (
    <Modal
      isOpen={props.showCreateListForm}
      toggle={props.toggleCreateListForm}
      centered
    >
      <ModalHeader toggle={props.toggleCreateListForm}>
        Create a new GoList
      </ModalHeader>
      <ModalBody>
        {/* TODO(tugan): add CSRF tokens */}
        <Form>
          <FormGroup className="m-form__group" aria-required>
            <Label for="golist-name">GoList URL</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>goli.st/</InputGroupText>
              </InputGroupAddon>
              <Input
                className="form-control"
                type="text"
                placeholder=""
                onChange={(e) => setGoListName(e.target.value)}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label" for="title">
              Title
            </Label>
            <Input
              className="form-control"
              type="text"
              defaultValue=""
              onChange={(e) => setGoListTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label" for="description">
              Description
            </Label>
            <Input
              type="textarea"
              className="form-control"
              id="message-text"
              onChange={(e) => setGoListDescription(e.target.value)}
            ></Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.toggleCreateListForm}>
          Close
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateListModal;
