import "../../CSS/Seperator.css";

function Seperator({ heading, text }) {
  return (
    <>
      <div className="main-heading">
        <h2>{heading}</h2>
        <p>{text}</p>
      </div>
    </>
  );
}

export default Seperator;
