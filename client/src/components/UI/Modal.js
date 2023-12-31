import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const OpenModal = (props) => {
  console.log(props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.body}
      </Modal.Body>
      <Modal.Footer >
      <div className={`${props.message ? "alert alert-success" : ""}`} role="alert">
        {props.message}
</div>
        
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OpenModal