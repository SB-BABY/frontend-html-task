import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import { lightTheme, darkTheme } from "../../theme";

const routes = [
  { title: "Home", icon: "house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

const Tooltip = styled.div`
  position: absolute;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
  background: ${(props) => props.theme.sidebarBackgroundActive};
  color: ${(props) => props.theme.textActive};
  padding: 12px 20px;
  border-radius: 20px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 1000;
  pointer-events: none;

`;

const SidebarContainer = styled.div`
  background: ${(props) => props.theme.sidebarBackground};
  color: ${(props) => props.theme.textDefault};
  width: ${(props) => (props.$isOpened ? "250px" : "80px")};
  border-radius: 20px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 100;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 5px;
`;

const LogoText = styled.span`
  color: ${(props) => props.theme.textLogo};
  font-weight: bold;
  white-space: nowrap;
  opacity: ${(props) => (props.$isOpened ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 22px;
  left: ${(props) =>
    props.$isOpened ? "calc(100% - 20px)" : "calc(100% - 10px)"};
  background: ${(props) =>
    props.$isOpened
      ? props.theme.buttonBackground
      : props.theme.buttonBackgroundActive};
  border: none;
  color: ${(props) => props.theme.textDefault};
  cursor: pointer;
  padding: 7px 10px;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${(props) => props.theme.buttonBackgroundActive};
  }
`;

const NavSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  row-gap: 5px;
`;

const NavItemWrapper = styled.div`
  position: relative;
  margin: 0 10px;
  
  &:hover {
    ${Tooltip} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const NavItemInner = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  gap: 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.$isActive ? props.theme.sidebarBackgroundActive : "transparent"};
  color: ${(props) =>
    props.$isActive ? props.theme.textActive : props.theme.textDefault};
  border-radius: 20px;
  
  &:hover {
    background: ${(props) => props.theme.sidebarBackgroundHover};
    color: ${(props) => props.theme.textHover};
  }

  & > svg {
    margin-right: ${(props) => (props.$isOpened ? "10px" : "0")};
    min-width: 20px;
    text-align: center;
    font-size: 1.1rem;
  }
`;

const NavIcon = styled(FontAwesomeIcon)`
  width: 20px;
  height: 20px;
`;

const NavText = styled.span`
  opacity: ${(props) => (props.$isOpened ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  margin: 0 10px;
  gap: 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  background: transparent;
  color: ${(props) => props.theme.textDefault};
  border-radius: 20px;
  border: none;
  
  &:hover {
    background: ${(props) => props.theme.sidebarBackgroundHover};
    color: ${(props) => props.theme.textHover};
  }
`;

const ThemeText = styled.span`
  opacity: ${(props) => (props.$isOpened ? 1 : 0)};
  transition: opacity 0.3s ease;
  white-space: nowrap;
`;

const Sidebar = (props) => {
  const { color } = props;
  const [isOpened, setIsOpened] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const [currentTheme, setCurrentTheme] = useState(
    color === "dark" ? darkTheme : lightTheme
  );

  const goToRoute = (path) => {
    setActivePath(path);
    console.log(`going to "${path}"`);
  };

  const toggleSidebar = () => {
    setIsOpened((v) => !v);
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <SidebarContainer $isOpened={isOpened}>
        <SidebarHeader>
          <Logo src={logo} alt="TensorFlow logo" />
          <LogoText $isOpened={isOpened}>TensorFlow</LogoText>
          <ToggleButton onClick={toggleSidebar} $isOpened={isOpened}>
            <FontAwesomeIcon icon={isOpened ? "angle-left" : "angle-right"} />
          </ToggleButton>
        </SidebarHeader>

        <NavSection>
          {routes.map((route) => (
            <NavItemWrapper key={route.title}>
              <NavItemInner
                onClick={() => goToRoute(route.path)}
                $isActive={activePath === route.path}
                $isOpened={isOpened}
              >
                <NavIcon icon={route.icon} />
                <NavText $isOpened={isOpened}>{route.title}</NavText>
              </NavItemInner>
              {!isOpened && <Tooltip>{route.title}</Tooltip>}
            </NavItemWrapper>
          ))}
        </NavSection>

        <NavSection>
          {bottomRoutes.map((route) => (
            <NavItemWrapper key={route.title}>
              <NavItemInner
                onClick={() => goToRoute(route.path)}
                $isActive={activePath === route.path}
                $isOpened={isOpened}
              >
                <NavIcon icon={route.icon} />
                <NavText $isOpened={isOpened}>{route.title}</NavText>
              </NavItemInner>
              {!isOpened && <Tooltip>{route.title}</Tooltip>}
            </NavItemWrapper>
          ))}

          <ThemeToggle onClick={toggleTheme}>
            <FontAwesomeIcon
              icon={currentTheme === lightTheme ? faMoon : faSun}
              fixedWidth
            />
            <ThemeText $isOpened={isOpened}>
              {currentTheme === lightTheme ? "Dark Mode" : "Light Mode"}
            </ThemeText>
          </ThemeToggle>
        </NavSection>
      </SidebarContainer>
    </ThemeProvider>
  );
};

Sidebar.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default Sidebar;
