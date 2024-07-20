import "./document-section.css";
import { handleFile } from "src/share/utils";
import { Typography, Button, Popconfirm } from "antd";

export const DocumentSection = () => {
  const files = [
    "abckbdklgbdfjkgbsdk.docx",
    "def.xlxs",
    "xyz.pdf",
    "Orange.csv",
  ];
  return (
    <div className='file-list'>
      {files.map((fileString) => {
        const handledFile = handleFile(fileString);
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
  );
};
