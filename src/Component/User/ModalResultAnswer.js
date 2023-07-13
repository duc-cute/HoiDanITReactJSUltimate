/** @format */

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalResultAnswer({ show, setShow, dataModalResult }) {
  const handleClose = () => setShow(false);
  console.log("check data ", dataModalResult);

  return (
    <>
      <Modal backdrop="static" size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Result ...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Questions : <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            Total Correct Answers : <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show Answer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResultAnswer;
