import React from 'react';

const DeleteConfirmation = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal show" style={{ display: 'block' }} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="btn-close" onClick={onCancel} />
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this issue?</p>
          </div>
          <div className="modal-footer">
          <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
