import { Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";

const { Dragger } = Upload;

interface Props {
  userId: string | undefined;
}

const AvatarUpload = ({ userId }: Props) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (file: any, setUploadedFile: any) => {
    setUploadedFile(file);
  };

  const sendRequest = async (uploadedFile: any) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("file", uploadedFile);
    await axios.post(
      `/user-profile/image/upload/${userId}`,
      formData
    )
    .catch((e)=> {
      toast.closeAll()
      toast({
        title: e.message,
        status: "error",
      });
      })
      setLoading(false)
    toast({
      title: t('avatar-saved'),
      status: "success"
    })

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
          { loading ? (<Spinner />) : t('save')}
        </Button>
      )
    }
    </div>
  );
};

export default AvatarUpload;
