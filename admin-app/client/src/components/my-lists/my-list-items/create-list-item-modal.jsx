// import React from "react";
// import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

// const CreateListItemModal = (props) => {
//   return (
//     <Modal
//       isOpen={props.showForm}
//       toggle={props.toggleForm}
//       centered
//       style={{ maxWidth: "600px" }}
//     >
//       <ModalHeader toggle={props.toggleForm}>Create GoList Item</ModalHeader>
//       <ModalBody>
//         <p>This is not implemented, but it's where you create an list item.</p>
//       </ModalBody>
//       <ModalFooter>
//         <Button color="light" onClick={props.toggleForm}>
//           Close
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// };

// export default CreateListItemModal;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Dropzone from "react-dropzone-uploader";
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
} from "reactstrap";
import { useForm } from "react-hook-form";
import {
  titleValidations,
  descriptionValidations,
  imageUrlValidation,
  urlValidations,
} from "./validations";
import { CREATE_ITEM } from "../../../redux/actionTypes";

const CreateListItemModal = (props) => {
  const dispatch = useDispatch();
  const uid = useSelector((store) => store.SessionReducer.user.uid);
  const userDisplayName = useSelector(
    (store) => store.SessionReducer.user.displayName
  );

  const { register, handleSubmit, errors } = useForm();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // // specify upload params and url for your files
  // const getUploadParams = ({ meta }) => {
  //   return {
  //     url: "https://httpbin.org/post",
  //   };
  // };

  // // called every time a file's `status` changes
  // const handleFileUploadChangeStatus = ({ meta, file }, status) => {};

  // // receives array of files that are done uploading when submit button is clicked
  // const handleUpload = (files, allFiles) => {
  //   // allFiles.forEach(f => f.remove())
  //   //toast.success("Dropzone successfully submitted !");
  // };

  const onSubmit = () => {
    dispatch({
      type: CREATE_ITEM,
      listName: props.listName,
      uid,
      userDisplayName,
      title,
      description,
      imageUrl,
      url,
    });
    props.toggleForm();
  };

  return (
    <Modal isOpen={props.showForm} toggle={props.toggleForm} centered>
      <ModalHeader toggle={props.toggleForm}>Add a new link</ModalHeader>
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
                <Label className="col-form-label" for="itemTitle">
                  Title
                </Label>
                <Input
                  className="form-control"
                  type="text"
                  name="itemTitle"
                  // placeholder="Enter short title here for your link"
                  onChange={(e) => setTitle(e.target.value)}
                  innerRef={register(titleValidations)}
                />
                <span>
                  {errors.itemTitle ? errors.itemTitle.message : null}
                </span>
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label className="col-form-label" for="itemUrl">
                  Link URL
                </Label>
                <Input
                  className="form-control"
                  type="url"
                  name="itemUrl"
                  // placeholder="https://www.example.com"
                  onChange={(e) => setURL(e.target.value)}
                  innerRef={register(urlValidations)}
                />
                <span>{errors.itemUrl ? errors.itemUrl.message : null}</span>
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label className="col-form-label" for="itemImageUrl">
                  Image URL (jpg, png, etc.)
                </Label>
                <Input
                  className="form-control"
                  type="url"
                  name="itemImageUrl"
                  placeholder=""
                  onChange={(e) => setImageUrl(e.target.value)}
                  innerRef={register(imageUrlValidation)}
                />
                <span>
                  {errors.itemImageUrl ? errors.itemImageUrl.message : null}
                </span>
              </FormGroup>
            </Col>

            {/* <Col md="12">
              <FormGroup>
                <Label>Upload Item Image</Label>
                <div className="dz-message needsclick">
                  <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleFileUploadChangeStatus}
                    maxFiles={1}
                    multiple={false}
                    canCancel={false}
                    accept="image/*"
                    inputContent="Drop or Click to Upload An Image"
                    onSubmit={handleUpload}
                    styles={{
                      dropzone: { width: "100%", height: 50 },
                      dropzoneActive: { borderColor: "green" },
                    }}
                  />
                </div>
              </FormGroup>
            </Col> */}

            <Col md="12">
              <FormGroup>
                <Label className="col-form-label" for="itemDesc">
                  Description
                </Label>
                <Input
                  className="form-control"
                  type="textarea"
                  name="itemDesc"
                  // placeholder="Enter short description here for your link"
                  onChange={(e) => setDescription(e.target.value)}
                  innerRef={register(descriptionValidations)}
                />
                <span>{errors.itemDesc ? errors.itemDesc.message : null}</span>
              </FormGroup>
            </Col>
          </div>
          <ModalFooter>
            <Button color="secondary" onClick={props.toggleForm}>
              Close
            </Button>
            <Button color="primary">Create</Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default CreateListItemModal;
