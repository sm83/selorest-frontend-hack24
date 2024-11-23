import "./Header.scss";
import Pen from "@/svgComponents/Pen/Pen";
import Human from "@/svgComponents/Human/Human";

const header = () => {
  return (
    <header className="header-wrapper">
      <div className="upper-part">
        <div className="upper-part__left">
          <button className="round-button">
            <Human size={20} />
          </button>
        </div>
        <div className="upper-part__center">
          <span>Все счета</span>
        </div>
        <div className="upper-part__right">
          <button className="round-button">
            <Pen size={16} />
          </button>
        </div>
      </div>
      <div className="lower-part">
        <span>0 P</span>
      </div>
    </header>
  );
};

export default header;
