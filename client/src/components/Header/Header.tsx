import { HeaderContainer } from "./styles";
import resumeo from "../../assets/resumeo1.svg";

const Header = () => {
  return (
    <HeaderContainer>
      <img src={resumeo} alt="Moveo logo" style={{ height: "40px" }} />
    </HeaderContainer>
  );
};

export default Header;
