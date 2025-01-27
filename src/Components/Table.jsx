import React from 'react';

const Table = ({ issues, loading, handleEdit, openDeleteModal }) => {
  return (
    <div className="table-responsive mx-auto" style={{ maxWidth: '95%' }}>
      {loading ? (
        <p className="fw-bold" style={{ display: 'flex', justifyContent: 'center' }}>Loading...</p>
      ) : (
        <table className="table table-striped table-bordered table-hover align-middle text-center">
          <thead>
            <tr>
              <th>Select</th>
              <th>Sr. No.</th>
              <th>Location</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Description</th>
              <th>Severity</th>
              <th>Image</th>
              <th>Reference Code 1</th>
              <th>Reference Code 2</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.length > 0 ? (
              issues.map((issue, index) => (
                <tr key={issue.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{index + 1}</td>
                  <td>{issue.location}</td>
                  <td>{issue.category}</td>
                  <td>{issue.subcategory}</td>
                  <td>{issue.description}</td>
                  <td>{issue.severity}</td>
                  <td>
                    <img
                      src={issue.imagePath || '/logo192.jpg'}
                      alt="Issue"
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '5px',
                      }}
                    />
                  </td>
                  <td>{issue.referenceCode1}</td>
                  <td>{issue.referenceCode2}</td>
                  <td>
                  <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(issue)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => openDeleteModal(issue)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center fw-bold">
                  No issues found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
