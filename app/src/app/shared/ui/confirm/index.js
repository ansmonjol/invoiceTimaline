import React from 'react'
import { Modal } from 'react-bootstrap';

const ConfirmModal = ({ onClose, onOk, title, text, yes, no }) =>  (
  <Modal bsSize="sm" show onHide={onClose} aria-labelledby="contained-modal-title-sm">
    <Modal.Header closeButton>
      <h4 className="modal-title">{!!title ? title : 'Confirmation'}</h4>
    </Modal.Header>
    <Modal.Body>
      <p>{!!text ? text : 'Are you sure ?'}</p>
    </Modal.Body>
    <Modal.Footer>
      <button onClick={onClose} type="button" className="btn btn-default" data-dismiss="modal">{!!no ? no : 'No'}</button>
      <button onClick={onOk} type="button" className="btn btn-danger">{!!yes ? yes : 'Yes'}</button>
    </Modal.Footer>
  </Modal>
)

ConfirmModal.propTypes = {
  onClose: React.PropTypes.func,
  onOk: React.PropTypes.func,
  title: React.PropTypes.string,
  text: React.PropTypes.string,
  yes: React.PropTypes.string,
  no: React.PropTypes.string,
}

export default ConfirmModal;