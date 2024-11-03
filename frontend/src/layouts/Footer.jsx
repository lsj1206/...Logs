import React from "react";
import { styled } from "../styles/Theme";
//Components
import IconButton from "../components/button/IconButton";
// Icons
import { ReactComponent as PageUpIcon } from "../assets/icons/caret-up-solid.svg";

const Footer = ({ className, scrollUp }) => {
  return (
    <FooterContainer className={className}>
      <IconButton onClick={scrollUp} size={[32, 32]} svgIcon={PageUpIcon} />
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin-bottom: -5px;
  margin-right: -5px;
  padding: 0;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: transparent;
`;

export default Footer;
