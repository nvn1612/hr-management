import "./project-docs.css";
import { List, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { localStorageUtil } from "src/share/utils";
import { useGetFileMutation } from "src/share/services";
import { useEffect, useState } from "react";

import type { UploadProps } from "antd";
import { Project } from "src/share/models";

<<<<<<< HEAD
=======
const baseApi = import.meta.env.VITE_REQUEST_API_URL;

>>>>>>> main
export const ProjectDocs = ({ project }: { project?: Project }) => {
  const [getFile] = useGetFileMutation();
  const [fileLinks, setFileLinks] = useState<string[]>([]);

  const getLinks = () => {
    setFileLinks([]);
    return project?.document?.map((filename) =>
      getFile({ filename })
        .unwrap()
        .then((link) => {
          setFileLinks([...fileLinks, link]);
        })
    );
  };

  useEffect(() => {
    if (project) {
      getLinks();
    }
  }, [project]);

  const uploadProps: UploadProps = {
<<<<<<< HEAD
    action: `http://localhost:3050/projects/uploadFileFromLocal/${project?.project_id}`,
=======
    action: `${baseApi}projects/upload-file-from-local/${project?.project_id}`,
>>>>>>> main
    headers: {
      authorization: localStorageUtil.get("accessToken")!,
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`file too large or bad internet`);
      }
    },
  };

  return (
    <div className='project-docs-sec'>
      <p className='project-section-title'>Documents</p>
      <List
        dataSource={
          project !== undefined && project.document!.length >= 1
            ? fileLinks
            : []
        }
        renderItem={(link) => {
          return (
            <List.Item>
              <a href={link}>{link}</a>
            </List.Item>
          );
        }}
      />
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload new document</Button>
      </Upload>
    </div>
  );
};
