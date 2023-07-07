/** @format */

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";

function ModalDeleteUser({
  show,
  setShow,
  dataDelete,
  fetchListUsersWithPaginate,
  currentPage,
  setCurrentPage,
}) {
  const handleClose = () => setShow(false);

  const handleSubmitDelete = async () => {
    const data = await deleteUser(dataDelete.id);

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
      <Modal backdrop="static" size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete the this user.email = <b>{dataDelete.email}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;
