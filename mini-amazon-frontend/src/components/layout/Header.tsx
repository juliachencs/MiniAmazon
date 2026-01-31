import AuthAvatar from "@/components/auth/AuthAvatar";
import ShoppingCartBtn from "@/components/cart/ShoppingCartBtn";
import LinkButton from "@/components/NavButtons";
import { Input, Tooltip, Row, Col, Grid, ConfigProvider, theme } from "antd";
import type { GetProps } from "antd";

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

export function LargeHomeLogo() {
  return (
    <LinkButton type="text" to="/">
      MiniAmazon
    </LinkButton>
  );
}

export function MiniHomeLogo() {
  return (
    <LinkButton type="text" to="/">
      MAz
    </LinkButton>
  );
}

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
