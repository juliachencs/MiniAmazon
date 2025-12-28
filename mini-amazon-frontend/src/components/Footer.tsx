
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer flexrow">
      <div className="copyrights">&copy; 2025 All rights reserved. </div>

      <div className="socialmedia">
        <a className="fa fa-youtube"></a>
        <a className="fa fa-twitter"></a>
        <a className="fa fa-facebook"></a>
      </div>

      <div className="footmenu">
        <span> Contact Us </span>
        <span> Privacy Policies </span>
        <span> Help </span>
      </div>
    </footer>
  );
}