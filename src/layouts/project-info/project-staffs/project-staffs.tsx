import "./project-staffs.css";
import { useState } from "react";
import { Tag, Input } from "antd";

export const ProjectStaffs = () => {
  const [showAddUser, setShowAddUser] = useState<boolean>(false);

  const onEnterNewUser = () => {
    setShowAddUser(false);
  };

  return (
    <div className='project-staffs'>
      <p>Staffs</p>
      <Tag closable={true}>Nguyen Van A</Tag>
      <Tag closable={true}>Nguyen Van B</Tag>
      {showAddUser ? (
        <Input size='small' onPressEnter={onEnterNewUser} />
      ) : (
        <Tag
          className='add-user-tag'
          onClick={() => {
            setShowAddUser(true);
          }}
        >
          New Staff
        </Tag>
      )}
    </div>
  );
};
