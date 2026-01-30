import {
  Input,
  Button,
  Tooltip,
  Row,
  Col,
  Grid,
  ConfigProvider,
  theme,
} from "antd";

import type { GetProps } from "antd";

import AuthAvatar from "@/components/AuthAvatar";
import { MiniHomeLogo, LargeHomeLogo } from "@/components/HomeBtn";
import ShoppingCartBtn from "@/pages/cart/ShoppingCartBtn";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const { useBreakpoint } = Grid; // Destructure the hook

function SearchBar() {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <Tooltip title="search">
      <Search placeholder="input search text" onSearch={onSearch} />
    </Tooltip>
  );
}

// function UserCart() {
//   return (
//     <Button type="text">
//       <ShoppingCartOutlined /> Cart
//     </Button>
//   );
// }

function HeaderOnSmallScreen() {
  return (
    <>
      <Row align="middle" justify="space-around" wrap={false}>
        <Col flex="none">
          <MiniHomeLogo />
        </Col>

        <Col span={2}>
          <AuthAvatar />
        </Col>

        <Col flex="auto" style={{ display: "flex", justifyContent: "right" }}>
          <ShoppingCartBtn />
        </Col>
      </Row>
      <Row wrap={false}>
        <Col flex="auto">
          <SearchBar />
        </Col>
      </Row>
    </>
  );
}

function HeaderOnLargeScreen() {
  return (
    <Row align="middle" justify="space-between">
      <Col>
        <LargeHomeLogo />
      </Col>

      <Col span="12">
        <SearchBar />
      </Col>

      <Col style={{ display: "flex", justifyContent: "right" }}>
        <AuthAvatar />
        <ShoppingCartBtn />
      </Col>
    </Row>
  );
}

export default function Header() {
  const screens = useBreakpoint();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <header>
        {screens.md ? <HeaderOnLargeScreen /> : <HeaderOnSmallScreen />}
      </header>
    </ConfigProvider>
  );
}
