import { Typography, Button, message } from "antd";

import { useSignoutMutation } from "../app/api";
import { useSelector } from "react-redux";
import "./Header.css";

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
    <Button type="text" style={{ color: "white" }} onClick={onSignout}>
      Sign out{" "}
    </Button>
  );
  const guest = <Typography.Link href="/login">Sign in </Typography.Link>;
  return role ? user : guest;
}
export default function Header() {
  return (
    <header className="header flexrow">
      <div className="logo">MiniAmazon</div>

      <div className="searchbar">
        <input type="search" />
      </div>

      <div className="statusbar">
        <div className="minilog">mini</div>

        <div className="status">
          <span className="fa fa-user"> </span>
          {/* <Button type="link" href="/login">
            Sign in{" "}
          </Button> */}
          <UserButton></UserButton>
          <span className="fa fa-shopping-cart"> </span>
          <span> $0.00 </span>
        </div>
      </div>
    </header>
  );
}
