import { Button, ConfigProvider, ThemeConfig } from "antd";
import { PropsWithChildren } from "react";

type AntdButtonProp = {
  type?: "primary";
  clickFunc: () => void;
  themeConfig?: ThemeConfig;
  children: unknown;
};

export const AntdButton = ({
  type,
  clickFunc,
  themeConfig,
}: PropsWithChildren<AntdButtonProp>) => {
  return (
    <ConfigProvider theme={themeConfig ? themeConfig : undefined}>
      <Button type={type} onClick={clickFunc}>
        asdfsadf
      </Button>
    </ConfigProvider>
  );
};
