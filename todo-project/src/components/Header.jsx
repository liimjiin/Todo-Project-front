import "../css/Todo.css";

const Header = () => {

  return (
    <div className="Header">
      <h3>Today is</h3>
      <h2>{new Date().toDateString()}</h2>
    </div>
  );
};

export default Header;