import { Button, Typography } from "antd";
import { ConfigProvider, theme } from "antd";
import { Col, Row } from "antd";
import {
  YoutubeFilled,
  TwitterCircleFilled,
  FacebookFilled,
} from "@ant-design/icons";

export default function Footer() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <footer>
        <Row wrap justify="space-between" align="middle">
          <Col
            style={{ display: "flex", justifyContent: "center" }}
            xs={{ span: 24, order: 3 }}
            sm={{ span: 24, order: 3 }}
            md={{ span: 8, order: 1 }}
          >
            <Typography.Text> &copy; 2025 All rights reserved.</Typography.Text>
          </Col>

          <Col
            style={{ display: "flex", justifyContent: "center" }}
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={{ span: 8, order: 2 }}
          >
            <Button icon=<YoutubeFilled /> type="text"></Button>
            <Button icon=<TwitterCircleFilled /> type="text"></Button>
            <Button icon=<FacebookFilled /> type="text"></Button>
          </Col>

          <Col
            style={{ display: "flex", justifyContent: "center" }}
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 8, order: 3 }}
          >
            <Button type="text"> Contact Us </Button>
            <Button type="text"> Privacy Policies </Button>
            <Button type="text"> Help </Button>
          </Col>
        </Row>
      </footer>
    </ConfigProvider>
  );
}
