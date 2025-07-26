import { ConfigProvider, theme } from "antd";
import {useThemeStore} from "../../store/theme-store";

const AppThemeProvider = ({ children }: {children: any}) => {
  // @ts-ignore
  const { themeMode } = useThemeStore();

  return (
      <ConfigProvider theme={{algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
        {children}
      </ConfigProvider>
  );
};

export default AppThemeProvider;
