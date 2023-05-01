import "./Navbar.css";
const Navbar = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="nav">
          <ul>
            <li>
              <h1>Pokédex</h1>
            </li>
            <li>
              <h2>คลิกที่ภาพเพื่อดูข้อมูล</h2>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
