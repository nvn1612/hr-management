import React, { useState, useEffect } from "react";
import { Modal, Radio, Input, Avatar, List, Checkbox, DatePicker, Pagination, Button } from "antd";
import VirtualList from "rc-virtual-list";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import { useGetUsersQuery } from "src/share/services";
import { useCreateUserMutation } from "src/share/services";
import { useAddStaffDepartmentMutation } from "src/share/services";
import { User } from 'src/share/models/accountModels'
import { Department } from "src/share/models";
import "./modal-add-staffs-departments.css";

type ModalAddStaffsDepartmentProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
};



const ContainerHeight = 300;

export const ModalAddStaffsDepartment = ({
  visible,
  setVisible,
  department
}: ModalAddStaffsDepartmentProps) => {
  const [value, setValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [listStaff, setListStaff] = useState<(string | undefined)[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };



  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  const handleCheckChange = (index: number, id: string | undefined) => {
    setCheckedItems((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      if (newState[index]) {
        setListStaff((prevList) => [...prevList, id]);
      } else {
        setListStaff((prevList) => prevList.filter((staffId) => staffId !== id));
      }

      return newState;
    });
  };
  const { data: staffData } = useGetUsersQuery({ role: "STAFF", search: searchValue });
  const [addStaffDepartment] = useAddStaffDepartmentMutation();
  const handleAddStaffDepartment = async () => {
    const filteredListStaff = listStaff.filter((id) => id !== undefined);
    await addStaffDepartment({ departmentId: department?.department_id, listStaff: filteredListStaff }).unwrap().then().catch()
  }

  const [createUserDepartment] = useCreateUserMutation();

  const handleCreateUserDepartment = async () => {
    await createUserDepartment({ username: username, email: email, password: password, role: "STAFF", department_id: department?.department_id }).unwrap().then().catch()
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  return (
    <>
      <Modal
        title="Add Staffs To Department"
        open={visible}
        onCancel={() => setVisible(false)}
        width={700}
        footer={null}
      >
        <hr />
        <div className="Change-select-staff-option">
          <Radio.Group
            className="group-radio-select-add-staffs"
            defaultValue={1}
            onChange={onChange}
          >
            <div className={`select-staffs ${value === 1 ? "active" : ""}`}>
              <Radio value={1}>All Staffs</Radio>
            </div>
            <div className={`create-staffs ${value === 2 ? "active" : ""}`}>
              <Radio value={2}>Create new staff</Radio>
            </div>
          </Radio.Group>
        </div>
        <div className={`select-staffs-content ${value === 2 ? "hidden" : ""}`}>
          <p>Choose who can join this department</p>
          <div className="searchbar-staffs ">
            <Input
              size="large"
              placeholder="Search staffs...."
              prefix={
                <div className="icon-search-staffs" >
                  <SearchOutlined />
                </div>
              }
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <hr />
          <div className="list-add-staffs">
            <List>
              <VirtualList
                data={staffData?.users.filter(user => user.UserProperty?.department_id === null).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) ?? []}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
              >
                {(item: User, index: number) => (
                  <List.Item key={item.email}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href="">{item.username}</a>}
                    />
                    <Checkbox
                      className="checkbox-staff"
                      checked={checkedItems[index]}
                      onChange={() => handleCheckChange(index, item.user_id)}
                    />
                  </List.Item>
                )}
              </VirtualList>
            </List>
            <Pagination current={currentPage} total={staffData?.users.length} pageSize={itemsPerPage} onChange={setCurrentPage} />
            <div className="button-save-staffs">
              <Button type="primary" onClick={
                async () => {
                  await handleAddStaffDepartment();
                  setVisible(false);
                }
              }>Save</Button>
            </div>
          </div>
        </div>
        <div
          className={`select-create-new-staffs ${value === 2 ? "" : "hidden"}`}
        >
          <div className="title-add-staff">
            <UserOutlined />
            <h2>Add staff</h2>
          </div>

          <hr />
          <form action="" className="form-add-staff">
            <div className="input-add-staff">
              <strong>Username</strong>
              <Input placeholder="diepvt123" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-add-staff">
              <strong>Password</strong>
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="input-add-staff">
              <div className="email-phone-staff">
                <div className="email-staff">
                  <strong>Email</strong>
                  <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="phone-number-staff">
                  <strong>Role</strong>
                  <Input placeholder="Staff" disabled />
                </div>
              </div>
            </div>
            <div className="input-add-staff">
              <strong>Deparment</strong>
              <div className="department-staff">
                <Input placeholder={department?.name} disabled />
              </div>
            </div>
            <div className="button-save-staffs">
              <Button type="primary" onClick={
                async () => {
                  await handleCreateUserDepartment();
                  setVisible(false);
                }
              }>Save</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};