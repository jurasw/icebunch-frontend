import { Upload, Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

interface Props {
  userId: string | undefined;
}

const AvatarUpload = ({ userId }: Props) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (file: any, setUploadedFile: any) => {
    setUploadedFile(file);
  };

  const sendRequest = async (uploadedFile: any) => {
    const formData = new FormData();

    formData.append("file", uploadedFile);
    const response = await axios.post(
      `/users/image/upload/${userId}`,
      formData
    );

    console.log(response);
  };

  return (
    <div>
      <Dragger
        beforeUpload={(file) => {
          handleFileUpload(file, setUploadedFile);
          return false;
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      {uploadedFile && (
        <Button onClick={() => sendRequest(uploadedFile)}>Save</Button>
      )}
    </div>
  );
};

export default AvatarUpload;
