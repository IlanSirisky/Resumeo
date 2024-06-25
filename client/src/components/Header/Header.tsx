import { HeaderContainer } from "./styles";
import moveoLogo from "../../assets/moveo-logo.svg";
import { Heading } from "monday-ui-react-core/next";

const Header = () => {
  return (
    <HeaderContainer>
      <img src={moveoLogo} alt="Moveo logo" style={{ height: "40px" }} />
      <Heading type={Heading.types.H1}>Resumeo</Heading>
    </HeaderContainer>
  );
};

export default Header;
