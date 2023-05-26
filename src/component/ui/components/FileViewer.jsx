/* eslint-disable no-useless-constructor */
import React from "react";
import FileViewer from "react-file-viewer";

class FileViewerComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FileViewer
        fileType={this.props.type}
        filePath={this.props.url}
        onError={this.onError}
      />
    );
  }

  onError(e) {}
}

export default FileViewerComponent;
