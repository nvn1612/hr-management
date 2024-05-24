import React, { useState, useEffect } from "react";
import { Modal, Radio, Input, Avatar, List, Checkbox, DatePicker } from "antd";
import VirtualList from "rc-virtual-list";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import "./modal-add-staffs-departments.css";
type ModalAddStaffsDepartmentProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 300;

export const ModalAddStaffsDepartment = ({
  visible,
  setVisible,
}: ModalAddStaffsDepartmentProps) => {
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const [data, setData] = useState<UserItem[]>([]);
  const handleSelectAll = () => {
    setCheckedItems(new Array(data.length).fill(true));
  };

  const handleDeselectAll = () => {
    setCheckedItems(new Array(data.length).fill(false));
  };
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
      });
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) <= 1
    ) {
      appendData();
    }
  };

  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  useEffect(() => {
    setCheckedItems(new Array(data.length).fill(false));
  }, [data]);

  const handleCheckChange = (index: number) => {
    setCheckedItems((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  return (
    <>
      <Modal
        title="Add Staffs To Department"
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={700}
        okText="Save"
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
              prefix={<SearchOutlined />}
            />
          </div>
          <div className="option-select">
            <p onClick={handleSelectAll}>Select All</p>
            <p onClick={handleDeselectAll}>Deselect All</p>
          </div>
          <hr />
          <div className="list-add-staffs">
            <List>
              <VirtualList
                data={data}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
              >
                {(item: UserItem, index: number) => (
                  <List.Item key={item.email}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.picture.large} />}
                      title={<a href="">{item.name.last}</a>}
                    />
                    <Checkbox
                      className="checkbox-staff"
                      checked={checkedItems[index]}
                      onChange={() => handleCheckChange(index)}
                    />
                  </List.Item>
                )}
              </VirtualList>
            </List>
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
              <Input placeholder="diepvt123" />
            </div>
            <div className="input-add-staff">
              <strong>Staff name</strong>
              <Input placeholder="Van Diep Tran" />
            </div>

            <div className="input-add-staff">
              <div className="email-phone-staff">
                <div className="email-staff">
                  <strong>Email</strong>
                  <Input placeholder="abc@gmail.com" />
                </div>
                <div className="phone-number-staff">
                  <strong>Number phone</strong>
                  <Input placeholder="+84 4567789" />
                </div>
              </div>
            </div>
            <div className="input-add-staff">
              <strong>Birthday</strong>
              <div className="birthday-staff">
                <DatePicker />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
