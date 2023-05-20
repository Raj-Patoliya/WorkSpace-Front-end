/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
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
        // errorComponent={CustomErrorComponent}
        onError={this.onError}
      />
    );
  }

  onError(e) {
    // logger.logError(e, "error in file-viewer");
  }
}

export default FileViewerComponent;
