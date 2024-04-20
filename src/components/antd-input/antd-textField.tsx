import { Input, ConfigProvider, ThemeConfig } from "antd";

const FieldTypes = {
  Default: "default",
  Password: "password",
  Area: "area",
} as const;

type TextFieldProps = {
  placeholder: string;
  type?: (typeof FieldTypes)[keyof typeof FieldTypes];
  themeConfig?: ThemeConfig;
};

export const AntdTextField = ({
  type,
  placeholder,
  themeConfig,
}: TextFieldProps) => {
  const typeMap = () => {
    switch (type) {
      case FieldTypes.Default:
        return <Input placeholder={placeholder} />;
      case FieldTypes.Password:
        return <Input.Password placeholder='Password' />;
      case FieldTypes.Area:
        return <Input.TextArea placeholder={placeholder} />;
      default:
        return <Input placeholder={placeholder} />;
    }
  };

  return (
    <ConfigProvider theme={themeConfig ? themeConfig : undefined}>
      {typeMap()}
    </ConfigProvider>
  );
};
