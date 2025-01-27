import React, { useState, useEffect } from 'react';

function EditModal({ issue, onClose, onSave }) {
  const [editedIssue, setEditedIssue] = useState({ ...issue });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Reset state when the modal is closed or saved
  const resetModalState = () => {
    setEditedIssue({ ...issue });
    setMessage('');
    setMessageType('');
    setShowMessage(false);
    setIsModalOpen(false);
  };

  // Open the modal again when the 'issue' prop changes
  useEffect(() => {
    setEditedIssue({ ...issue }); // Reset issue data when modal is opened again
    setMessage('');
    setMessageType('');
    setShowMessage(false);
    setIsModalOpen(true);
  }, [issue]);

  // Handle form changes
  const handleChange = (e) => setEditedIssue((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Save changes and handle UI feedback
  const handleSave = () => {
    if (!editedIssue.location || !editedIssue.category || !editedIssue.subcategory || !editedIssue.description || !editedIssue.severity) {
      setMessage('All fields are required.');
      setMessageType('error');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      return;
    }

    fetch(`http://localhost:3000/issues/${editedIssue.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedIssue),
    })
      .then(() => {
        setMessage('Changes saved successfully!');
        setMessageType('success');
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false); // Hide success message after 2 seconds
          resetModalState(); // Reset modal state after showing the success message
        }, 2000); // Delay resetting modal state until after the message
        onSave(editedIssue); // Notify parent component that changes are saved
      })
      .catch(() => {
        setMessage('Error updating the issue.');
        setMessageType('error');
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      });
  };

  const handleClose = () => {
    resetModalState(); // Reset modal state when closing
    onClose(); // Notify parent about modal close
  };

  return (
    <>
      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header bg-primary text-white rounded-top">
                <h5 className="modal-title">Edit the Issue Details</h5>
                <button className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label className="form-label fw-bold" htmlFor="location">Location (e.g., building or floor):</label>
                  <input type="text" className="form-control" id="location" name="location" value={editedIssue.location} onChange={handleChange} placeholder="Enter the location of the issue" />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label fw-bold" htmlFor="category">Category (e.g., Electrical, Plumbing):</label>
                  <input type="text" className="form-control" id="category" name="category" value={editedIssue.category} onChange={handleChange} placeholder="Enter the category of the issue" />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label fw-bold" htmlFor="subcategory">Subcategory (optional):</label>
                  <input type="text" className="form-control" id="subcategory" name="subcategory" value={editedIssue.subcategory} onChange={handleChange} placeholder="Enter a specific subcategory" />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label fw-bold" htmlFor="description">Issue Description:</label>
                  <textarea className="form-control" id="description" name="description" value={editedIssue.description} onChange={handleChange} placeholder="Provide a detailed description of the issue"></textarea>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label fw-bold" htmlFor="severity">Severity (e.g., Low, Medium, High):</label>
                  <input type="text" className="form-control" id="severity" name="severity" value={editedIssue.severity} onChange={handleChange} placeholder="Specify the severity of the issue" />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
                <button className="btn btn-secondary" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessage && (
        <div className="modal show d-block" style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '400px',
        }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className={`modal-header ${messageType === 'error' ? 'bg-danger' : 'bg-success'} text-white`}>
                <h5 className="modal-title">{messageType === 'error' ? 'Error' : 'Success'}</h5>
              </div>
              <div className="modal-body">
                <div className={`alert alert-${messageType === 'error' ? 'danger' : 'success'}`} role="alert">
                  {message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditModal;
