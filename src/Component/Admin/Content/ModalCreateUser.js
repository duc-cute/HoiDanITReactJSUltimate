/** @format */

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/apiService";

const ModalCreateUser = ({
  show,
  setShow,
  fetchListUsersWithPaginate,
  setCurrentPage,
}) => {
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUserName("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
  };
  // const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleCreateUser = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid Email ");
      return;
    }
    const data = await postCreateNewUser(
      email,
      password,
      userName,
      role,
      image
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      setCurrentPage(1);
      await fetchListUsersWithPaginate(1);
    }

    if (data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        className="modal-add-user"
        backdrop="static"
        size="xl"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="USER">USER</option>
                <option value="ADMIN"> ADMIN</option>
              </select>
            </div>
            <div className="col-md-12 ">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(e) => handleUploadImage(e)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img alt="" src={previewImage} />
              ) : (
                <span> Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
