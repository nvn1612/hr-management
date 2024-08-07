import "./project.css";
import { MenuDots, Pen, Trash, Page, Plus } from "src/assets/icons";
import { Typography, Button, Avatar, Popconfirm, Popover, List } from "antd";
import { CustomAvatar } from "src/components/v2";
import { TaskList } from "src/layouts/v2";

export const AdminProject = () => {
  const ProjectOptions = () => {
    return (
      <div className='project-option'>
        <Button type='text' className='project-option-btn'>
          <Page />
          <Typography.Text>Detail</Typography.Text>
        </Button>
        <Button type='text' className='project-option-btn'>
          <Pen />
          <Typography.Text>Edit</Typography.Text>
        </Button>
        <Popconfirm title='Delete project ?'>
          <Button className='project-option-btn' type='text'>
            <Trash />
            <Typography.Text>Delete</Typography.Text>
          </Button>
        </Popconfirm>
      </div>
    );
  };

  return (
    <div className='admin-project-page'>
      <header className='header-row'>
        <div className='first-part'>
          <Typography.Title level={2}>Mobile App</Typography.Title>
          <Popover content={ProjectOptions} trigger='click'>
            <Button type='text' size='small'>
              <MenuDots />
            </Button>
          </Popover>
        </div>
        <div className='second-part'>
          <Button type='primary' className='create-task-btn'>
            <Plus />
            <Typography.Text style={{ color: "white" }}>
              Create Task
            </Typography.Text>
          </Button>
          <Avatar.Group maxCount={3}>
            <CustomAvatar size={32} userName='abcd' />
            <CustomAvatar size={32} userName='bcda' />
            <CustomAvatar size={32} userName='cdab' />
            <CustomAvatar size={32} userName='dabc' />
          </Avatar.Group>
        </div>
      </header>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        className='task-sec'
        dataSource={[1, 2, 3]}
        renderItem={() => {
          return (
            <List.Item>
              <TaskList />
            </List.Item>
          );
        }}
      />
    </div>
  );
};
