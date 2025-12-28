export default function Header() {
  return (
    <header className="header flexrow">
      <div className="logo"> 
        MiniAmazon 
      </div>

      <div className="searchbar">
        <input type="search" />
      </div>

      <div className="statusbar">
        <div className="minilog">
          mini
        </div>

        <div className="status">
          <span className="fa fa-user"> </span>
          <span>Sign in </span>
          <span className="fa fa-shopping-cart"> </span>
          <span> $0.00 </span>
        </div>
      </div>
    </header>
  );
}