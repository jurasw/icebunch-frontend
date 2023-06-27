import { Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const { Dragger } = Upload;

interface Props {
  userId: string | undefined;
}

const AvatarUpload = ({ userId }: Props) => {
  const { t } = useTranslation();
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (file: any, setUploadedFile: any) => {
    setUploadedFile(file);
  };

  const sendRequest = async (uploadedFile: any) => {
    const formData = new FormData();

    formData.append("file", uploadedFile);
    await axios.put(
      `/user-profile/image/upload/${userId}`,
      formData
    );

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
          {t('click-or-drag')}
        </p>
        <p className="ant-upload-hint">
          {t('image-max')}
        </p>
      </Dragger>
      {uploadedFile && (
        <Button
          mt={4}
          float="right"
          variant="primaryButton"
          onClick={() => sendRequest(uploadedFile)}
        >
          {t('save')}
        </Button>
      )}
    </div>
  );
};

export default AvatarUpload;
