import "./project-docs.css";
import { List, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const ProjectDocs = ({ links }: { links?: string[] }) => {
  const listData = links
    ? links.map((link) => {
        return { fileLink: link };
      })
    : [];

  return (
    <div className='project-docs-sec'>
      <p>Documents</p>
      <List
        dataSource={listData}
        renderItem={(item) => {
          return (
            <List.Item>
              <List.Item.Meta description={item.fileLink} />
            </List.Item>
          );
        }}
      />
      <Upload>
        <Button icon={<UploadOutlined />}>Upload new Document</Button>
      </Upload>
    </div>
  );
};
