import React, { useEffect, useState } from 'react';
import Table from './Components/Table';
import EditIssue from './Components/EditModal';
import DeleteConfirmation from './Components/DeleteConfirmation';

function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [issueToDelete, setIssueToDelete] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/issues')
      .then((response) => response.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching issues:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    if (issueToDelete) {
      fetch(`http://localhost:3000/issues/${issueToDelete.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setIssues(issues.filter((issue) => issue.id !== issueToDelete.id));
          setDeleteModalVisible(false);
        })
        .catch((error) => console.error('Error deleting issue:', error));
    }
  };

  const openDeleteModal = (issue) => {
    setIssueToDelete(issue);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setIssueToDelete(null);
  };

  const handleEdit = (issue) => {
    setSelectedIssue(issue);
  };

  const handleSave = (updatedIssue) => {
    setIssues(
      issues.map((issue) =>
        issue.id === updatedIssue.id ? updatedIssue : issue
      )
    );
  };

  return (
    <div className="container mt-5 p-4 rounded">
      <h2 className="text-center fw-bold mb-4">
        Dynamic Issue Tracking
      </h2>
      <Table
        issues={issues}
        loading={loading}
        handleEdit={handleEdit}
        openDeleteModal={openDeleteModal}
      />
      {selectedIssue && (
        <EditIssue
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onSave={handleSave}
        />
      )}
      <DeleteConfirmation
        show={isDeleteModalVisible}
        onCancel={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default App;
