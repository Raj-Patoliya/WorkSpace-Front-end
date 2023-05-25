import React from "react";

const CSVUploadInstructions = () => {
  return (
    <div>
      <h6>File Upload Instruction: WorkSpace</h6>
      <p>
        Please follow these instructions to upload a file containing issue data
        to the system:
      </p>
      <ol>
        <li>File Format: Ensure the file is in CSV format.</li>
        <li>Column Order: Arrange the columns in the following order:</li>
      </ol>
      <p>
        <code>
          issue_summary, issue_description, project, assignee, issue_type,
          priority, reporter, status
        </code>
      </p>
      <p>Column Definitions:</p>
      <ul>
        <li>
          <strong>Issue Summary:</strong> Brief issue summary or title.
        </li>
        <li>
          <strong>Issue description:</strong> Detailed issue information.
        </li>
        <li>
          <strong>Project:</strong> Identifier of the project.
        </li>
        <li>
          <strong>Assignee:</strong> Identifier of Person responsible for the
          issue.
        </li>
        <li>
          <strong>Issue type:</strong> Type of the issue.
        </li>
        <li>
          <strong>Priority:</strong> Priority level assigned to the issue.
        </li>
        <li>
          <strong>Reporter:</strong> Person who reported the issue.
        </li>
        <li>
          <strong>Status:</strong> Current status of the issue.
        </li>
      </ul>
    </div>
  );
};

export default CSVUploadInstructions;
