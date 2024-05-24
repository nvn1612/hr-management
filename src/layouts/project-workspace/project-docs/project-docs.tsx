import "./project-docs.css";
import { List, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const ProjectDocs = () => {
  const listData = [
    { title: "Requirements", fileLink: "Link to Requirements Doc" },
    { title: "Contract", fileLink: "Link to Contract Doc" },
  ];

  return (
    <div className='project-docs-sec'>
      <p>Documents</p>
      <List
        dataSource={listData}
        renderItem={(item) => {
          return (
            <List.Item>
              <List.Item.Meta title={item.title} description={item.fileLink} />
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
