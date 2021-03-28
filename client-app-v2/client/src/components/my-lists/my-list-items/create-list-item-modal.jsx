import React, { useState, useCallback } from "react";
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
  Media,
} from "reactstrap";
import { useForm } from "react-hook-form";
import {
  titleValidations,
  descriptionValidations,
  imageUrlValidation,
  urlValidations,
} from "./validations";
import { CREATE_ITEM } from "../../../redux/actionTypes";
import { firebase_storage } from "../../../data/config";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const dropZoneBaseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

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

  const [file, setFile] = useState();
  const [objectURL, setObjectURL] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setObjectURL(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const clearImage = () => {
    setFile(null);
    setObjectURL("");
    setImageUrl("");
  };

  const resetForm = () => {
    clearImage();
    setTitle("");
    setURL("");
    setDescription("");
  };

  const onSubmit = () => {
    var create_action = {
      type: CREATE_ITEM,
      listName: props.listName,
      uid,
      userDisplayName,
      title,
      description,
      imageUrl,
      url,
    };

    if (imageUrl) {
      dispatch(create_action);
      resetForm();
    } else if (file) {
      var parts = file.name.split(".");
      var filename = `${uuidv4()}.${parts[parts.length - 1]}`;
      var fileRef = firebase_storage
        .ref()
        .child(`users/${uid}/lists/${props.listName}/items/photos/${filename}`);
      fileRef
        .put(file)
        .then((snapshot) => {
          console.log("Uploaded item image!");
          snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              console.log(`[info] uploaded image as: ${downloadURL}`);
              create_action.imageUrl = downloadURL;
              dispatch(create_action);
              resetForm();
            })
            .catch((err) => {
              console.error(err);
              toast.error("Failed to fetch uploaded image URL.");
              dispatch(create_action);
              resetForm();
            });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Thumbnail image failed to upload.");
        });
    } else {
      return toast.error("Something went wrong.");
    }
    props.toggleForm();
  };

  var imagePreview = (
    <div className="avatar">
      <Media style={{ position: "relative" }}>
        <img
          src={imageUrl || objectURL}
          alt="thumbnail preview"
          className="b-r-10 rounded-circle"
          style={{
            maxWidth: "200px",
            maxHeight: "150px",
            width: "auto",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Button
          className="btn-pill"
          color="dark"
          size="sm"
          onClick={clearImage}
          style={{ position: "absolute", right: 0, bottom: 0 }}
        >
          <i className="icofont icofont-ui-delete" /> Clear
        </Button>
      </Media>
    </div>
  );

  var imageUrlBox = (
    <div style={{ paddingTop: 10 }}>
      <Input
        className="form-control"
        type="url"
        name="itemImageUrl"
        value={imageUrl}
        placeholder="Alternatively, enter an image URL here"
        onChange={(e) => setImageUrl(e.target.value)}
        innerRef={register(imageUrlValidation)}
        style={{ fontSize: 14 }}
      />
      <span>{errors.itemImageUrl ? errors.itemImageUrl.message : null}</span>
    </div>
  );

  var imageDragAndDrop = (
    <div
      {...getRootProps({
        className: "dropzone",
        style: dropZoneBaseStyle,
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={{ marginBottom: 0 }}>Drop the files here ...</p>
      ) : (
        <p style={{ marginBottom: 0 }}>
          Drag &amp; drop images here, or click to select files
        </p>
      )}
    </div>
  );

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
                <Label className="col-form-label" for="itemImageUrl">
                  {imageUrl || objectURL ? "Thumbnail Preview" : "Thumbnail"}
                </Label>
                <div className="user-image">
                  {imageUrl || objectURL ? imagePreview : imageDragAndDrop}
                </div>
                {imageUrl || !objectURL ? imageUrlBox : null}
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label className="col-form-label" for="itemTitle">
                  Title
                </Label>
                <Input
                  className="form-control"
                  type="text"
                  name="itemTitle"
                  value={title}
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
                  value={url}
                  onChange={(e) => setURL(e.target.value)}
                  innerRef={register(urlValidations)}
                />
                <span>{errors.itemUrl ? errors.itemUrl.message : null}</span>
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label className="col-form-label" for="itemDesc">
                  Description
                </Label>
                <Input
                  className="form-control"
                  type="textarea"
                  name="itemDesc"
                  value={description}
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
