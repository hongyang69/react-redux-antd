import React from "react";
import { connect } from "react-redux";
import { Upload, Icon, Modal } from "antd";
import { SERVER_URL } from "../../utils/requestUtils";
import styled from "styled-components";
import {
  UPLOAD_FAILURE_ERROR,
  createError,
  handleError
} from "../../utils/error";

const Picture = styled.div`
  .ant-upload-list-item-info {
    > span {
      height: 100%;
    }
  }
`;

class UploadComponent extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: this.props.value.url
      ? [
          {
            uid: -1,
            url: this.props.value.url
          }
        ]
      : []
  };

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = info => {
    const { fileList, file } = info;
    if (file.status === "done") {
      if (file.response.success) {
        if (this.props.success) {
          this.props.success(file.response);
          this.setState({ fileList });
        }
      } else {
        this.setState({ fileList: [] });
        this.props.handleError(createError(UPLOAD_FAILURE_ERROR, ""));
      }
    } else if (file.status === "uploading") {
      this.setState({ fileList });
    }
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Picture>
        <Upload
          action={`${SERVER_URL}/file/upload`}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          data={file => {
            return {
              file0: file,
              fileCount: 1
            };
          }}
          onRemove={() => {
            if (this.props.onRemove) {
              this.props.onRemove();
            }
            this.setState({ fileList: [] });
          }}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Picture>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { value = { url: null } } = props;
  return { value };
};

const mapDispatchToProps = dispatch => {
  return {
    handleError: err => handleError(err, dispatch)
  };
};

const UploadPicture = connect(mapStateToProps, mapDispatchToProps)(
  UploadComponent
);

export default UploadPicture;
