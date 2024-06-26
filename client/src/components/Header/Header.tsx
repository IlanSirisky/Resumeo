import { HeaderContainer } from "./styles";
import resumeo from "../../assets/Resumeo logo.svg"

const Header = () => {
  return (
    <HeaderContainer>
      <img src={resumeo} alt="Moveo logo" style={{ height: "50px" }} />
    </HeaderContainer>
  );
};

export default Header;
