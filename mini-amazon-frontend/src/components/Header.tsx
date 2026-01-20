import {
  Typography,
  Input,
  Button,
  message,
  Tooltip,
  Row,
  Col,
  Avatar,
  Grid,
} from "antd";
import { ConfigProvider, theme } from "antd";
import { useSignoutMutation } from "../app/api";
import { useSelector } from "react-redux";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const { useBreakpoint } = Grid; // Destructure the hook

function UserButton() {
  const [signout] = useSignoutMutation();
  // const [role, setRole] = useState(store.getState().auth.role);
  // const unsubscribe = store.subscribe(() => {
  //   setRole(store.getState().auth.role);
  // });

  const role = useSelector((state) => state.auth.role);

  const onSignout = () => {
    console.log("before signout: " + role);
    signout()
      .then(() => {
        message.info("You have signed out!");
        console.log("sign out: " + role);
      })
      .catch((e) => console.log(e));
  };
  const user = (
    <Button icon={<UserOutlined />} type="text" onClick={onSignout}>
      Sign out
    </Button>
  );
  const guest = (
    <Button icon={<UserOutlined />} type="text" href="/login">
      Sign in
    </Button>
  );
  return role ? user : guest;
}

function SearchBar() {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <Tooltip title="search">
      <Search placeholder="input search text" onSearch={onSearch} />
    </Tooltip>
  );
}

function LargeLogo() {
  return <Typography.Link href="/">MiniAmazon</Typography.Link>;
}

function MiniLogo() {
  return <Typography.Link href="/">Mini</Typography.Link>;
}

function UserCart() {
  return (
    <Button type="text">
      <ShoppingCartOutlined /> Cart
    </Button>
  );
}

function HeaderOnSmallScreen() {
  return (
    <>
      <Row align="middle" justify="space-around" wrap={false}>
        <Col flex="none">
          <MiniLogo />
        </Col>

        <Col span={2}>
          <UserButton />
        </Col>

        <Col flex="auto" style={{ display: "flex", justifyContent: "right" }}>
          <UserCart />
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
        <LargeLogo />
      </Col>
      <Col span="12">
        <SearchBar />
      </Col>

      <Col style={{ display: "flex", justifyContent: "right" }}>
        <UserButton />
        <UserCart />
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
