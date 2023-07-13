/** @format */

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiService";

function ModalDeleteQuiz({ show, setShow, dataDelete, fetchDataQuiz }) {
  const handleClose = () => setShow(false);

  const handleSubmitDelete = async () => {
    const data = await deleteQuiz(dataDelete.id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchDataQuiz();
    }

    if (data.EC !== 0) {
      toast.error(data.EM);
    }
    console.log(dataDelete);
  };
  return (
    <>
      <Modal backdrop="static" size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the Quiz</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure to delete the this quiz.name = <b>{dataDelete.name}</b>
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

export default ModalDeleteQuiz;
