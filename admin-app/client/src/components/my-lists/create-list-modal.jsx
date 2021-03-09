import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  nameValidations,
  titleValidations,
  descriptionValidations,
} from "./validations";

const CreateListModal = (props) => {
  const uid = useSelector((store) => store.SessionReducer.user.uid);
  const displayName = useSelector(
    (store) => store.SessionReducer.user.displayName
  );

  const { register, handleSubmit, errors } = useForm();
  const [golistName, setGoListName] = useState("");
  const [golistTitle, setGoListTitle] = useState("");
  const [golistDescription, setGoListDescription] = useState("");
  const onSubmit = (data) => {
    var postBody = JSON.stringify({
      owner_uid: uid,
      owner_display_name: displayName,
      title: golistTitle,
      description: golistDescription,
    });
    console.info(`Trying to create golist with ${postBody}`);
    fetch(`https://api.goli.st/golists/${golistName}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: postBody,
    })
      .then((res) => res.json())
      .then(({ err, ok }) => {
        if (ok) {
          toast.success("New GoList successfully created.");
          props.toggleCreateListForm();
        } else {
          console.error(err);
          toast.error("Failed to create the list");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("We are unable to create the list right now.");
      });
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
        <Form
          className="needs-validation"
          noValidate=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-row">
            {/* TODO(tugan): add CSRF tokens */}
            <Col md="12">
              <FormGroup>
                <Label for="golistName">GoList URL</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>goli.st/</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="form-control"
                    type="text"
                    name="golistName"
                    onChange={(e) => setGoListName(e.target.value)}
                    innerRef={register(nameValidations)}
                  />
                  <span>
                    {errors.golistName ? errors.golistName.message : null}
                  </span>
                </InputGroup>
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label className="col-form-label" for="title">
                  Title
                </Label>
                <Input
                  className="form-control"
                  type="text"
                  name="title"
                  onChange={(e) => setGoListTitle(e.target.value)}
                  innerRef={register(titleValidations)}
                />
                <span>{errors.title ? errors.title.message : null}</span>
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label className="col-form-label" for="description">
                  Description
                </Label>
                <Input
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={(e) => setGoListDescription(e.target.value)}
                  innerRef={register(descriptionValidations)}
                />
                <span>
                  {errors.description ? errors.description.message : null}
                </span>
              </FormGroup>
            </Col>
          </div>
          <ModalFooter>
            <Button color="secondary" onClick={props.toggleCreateListForm}>
              Close
            </Button>
            <Button color="primary">Create</Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default CreateListModal;
