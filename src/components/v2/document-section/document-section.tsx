import "./document-section.css";
import { handleFile } from "src/share/utils";
import { Typography, Button, Popconfirm, Upload, message } from "antd";
import { useState } from "react";

import type { UploadProps } from "antd";

const baseApi = import.meta.env.VITE_REQUEST_API_URL;

const files = [
  { uid: "01", name: "abckbdklgbdfjkgbsdk.docx" },
  { uid: "02", name: "abckbdklgbdfjkgbsdk.xlxs" },
  { uid: "03", name: "abckbdklgbdfjkgbsdk.pdf" },
  { uid: "04", name: "abckbdklgbdfjkgbsdk.csv" },
];

export const DocumentSection = () => {
  const [uploadProgress, setUploadProgress] = useState<boolean>(false);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: `${baseApi}upload/upload-file-for-project/`,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setUploadProgress(false);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        setUploadProgress(false);
      }
    },
    onDrop() {
      setUploadProgress(true);
    },
  };
  return (
    <div className='doc-sec'>
      <div className='file-list'>
        {files.map((files) => {
          const handledFile = handleFile(files.name);
          return (
            <div className='file-row'>
              <div className='file-name-icon'>
                {handledFile.fileIcon}
                <Typography.Link>
                  <a href='#' target='_blank'>
                    {handledFile.displayedFileName}
                  </a>
                </Typography.Link>
              </div>
              <Popconfirm title='Delete document ?'>
                <Button shape='round' danger>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          );
        })}
      </div>
      <Upload.Dragger
        {...props}
        fileList={files}
        listType='text'
        showUploadList={uploadProgress}
      >
        <strong>Choose a file</strong> or drag it here
      </Upload.Dragger>
    </div>
  );
};
