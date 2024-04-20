import { Button, ConfigProvider, ThemeConfig } from "antd";
import { ButtonHTMLType } from "antd/es/button";
import React, { PropsWithChildren } from "react";

type AntdButtonProp = {
  type?: "primary" | "dashed" | "text" | "link";
  clickFunc?: () => void;
  themeConfig?: ThemeConfig;
  children: React.ReactNode;
  htmlType?: ButtonHTMLType;
};

export const AntdButton = ({
  type,
  clickFunc,
  children,
  themeConfig,
  htmlType,
}: PropsWithChildren<AntdButtonProp>) => {
  return (
    <ConfigProvider theme={themeConfig ? themeConfig : undefined}>
      <Button
        type={type}
        {...(clickFunc ? { onClick: clickFunc } : undefined)}
        {...(htmlType ? { htmlType: htmlType } : undefined)}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};
