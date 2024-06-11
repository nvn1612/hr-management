import "./mng-page-header.css";
import { Typography, Button, Badge, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { OUserRole, type MngFilterItem } from "src/share/models";
import { localStorageUtil } from "src/share/utils";

const { Title, Text } = Typography;

interface MngPageHeaderProps {
  title?: string;
  itemCount?: number;
  addBtnContent?: string;
  addBtnOnClick?: () => void;
  filters?: PageFilter[];
}

export interface PageFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: any) => void;
  items: MngFilterItem;
}

const role = localStorageUtil.get("role");
const isAdmin = role === OUserRole.Admin;

export const MngPageHeader = ({
  title,
  itemCount,
  addBtnContent,
  addBtnOnClick,
  filters,
}: MngPageHeaderProps) => {
  return (
    <div className='mng-page-header'>
      <div className='page-header-row-1'>
        <div className='mng-title-section'>
          <Title>{title}</Title>
          <Badge count={itemCount ? itemCount : 0} showZero color='#1677ff' />
        </div>
        {isAdmin || title === "Projects" ? (
          <Button type='primary' onClick={addBtnOnClick}>
            <PlusOutlined />
            {addBtnContent}
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className='page-header-row-2'>
        {filters?.map((filter, index) => {
          return (
            <div className='filter-item' key={index}>
              <Text className='filter-title'>{filter.items.label}</Text>
              <Select
                className='filter-selector'
                options={filter.items.selector.options}
                defaultValue={filter.items.selector.defaultValue}
                onChange={filter.onChange && filter.onChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
