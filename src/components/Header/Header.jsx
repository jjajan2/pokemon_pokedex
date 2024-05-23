import "./Header.css";

function Header() {
  return (
    <header>
      <div className="header_inner">
        <h1 onClick={() => (window.location.href = "/")}>Pokemon Pokédex</h1>
      </div>
    </header>
  );
}

export default Header;
