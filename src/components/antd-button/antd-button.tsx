import { Button, ConfigProvider, ThemeConfig } from "antd";
import React, { PropsWithChildren } from "react";

type AntdButtonProp = {
  type?: "primary" | "dashed" | "text" | "link";
  clickFunc: () => void;
  themeConfig?: ThemeConfig;
  children: React.ReactNode;
};

export const AntdButton = ({
  type,
  clickFunc,
  children,
  themeConfig,
}: PropsWithChildren<AntdButtonProp>) => {
  return (
    <ConfigProvider theme={themeConfig ? themeConfig : undefined}>
      <Button type={type} onClick={clickFunc}>
        {children}
      </Button>
    </ConfigProvider>
  );
};
