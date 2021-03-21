import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { useForm } from "react-hook-form";
import {
  nameValidations,
  titleValidations,
  descriptionValidations,
} from "./validations";
import { CREATE_LIST } from "../../redux/actionTypes";

const CreateListModal = (props) => {
  const dispatch = useDispatch();
  const uid = useSelector((store) => store.SessionReducer.user.uid);
  const userDisplayName = useSelector(
    (store) => store.SessionReducer.user.displayName
  );

  const { register, handleSubmit, errors } = useForm();
  const [golistName, setGoListName] = useState("");
  const [golistTitle, setGoListTitle] = useState("");
  const [golistDescription, setGoListDescription] = useState("");
  const onSubmit = () => {
    dispatch({
      type: CREATE_LIST,
      name: golistName,
      title: golistTitle,
      description: golistDescription,
      uid,
      userDisplayName,
    });
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
                <Label className="col-form-label" for="listTitle">
                  Title
                </Label>
                <Input
                  className="form-control"
                  type="text"
                  name="listTitle"
                  onChange={(e) => setGoListTitle(e.target.value)}
                  innerRef={register(titleValidations)}
                />
                <span>{errors.listTitle ? errors.listTitle.message : null}</span>
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label className="col-form-label" for="listDesc">
                  Description
                </Label>
                <Input
                  className="form-control"
                  type="textarea"
                  name="listDesc"
                  onChange={(e) => setGoListDescription(e.target.value)}
                  innerRef={register(descriptionValidations)}
                />
                <span>
                  {errors.listDesc ? errors.listDesc.message : null}
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
