import "./mng-page-header.css";
import { Typography, Button, Badge, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import type { MngFilterItem } from "src/share/models";

const { Title, Text } = Typography;

interface MngPageHeaderProps {
  title?: string;
  itemCount?: number;
  addBtnContent?: string;
  addBtnOnClick?: () => void;
  filters?: MngFilterItem[];
}

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
        <Button type='primary' onClick={addBtnOnClick}>
          <PlusOutlined />
          {addBtnContent}
        </Button>
      </div>
      <div className='page-header-row-2'>
        {filters?.map((filter) => {
          return (
            <div className='filter-item'>
              <Text className='filter-title'>{filter.label}</Text>
              <Select
                className='filter-selector'
                options={filter.selector.options}
                defaultValue={filter.selector.defaultValue}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
