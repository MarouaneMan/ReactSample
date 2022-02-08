import styled, {css} from 'styled-components';
import background from 'assets/images/BackgroundPwa.png';
import appIconImg from 'assets/images/app_icon.png';
import Theme from 'app/theme';
import {landscape, mobileSmall} from 'app/device';

export const InstructionsWrapper = styled.div.attrs((props) => ({
  style: {
    backgroundImage : `url(${background})`,
    ...props.style,
  }
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  background-size: 100% 100%;
  z-index: 1000;
`;

export const InstructionsWrapperLandscape = styled(InstructionsWrapper)`
  ${landscape(css`
    display: none;
  `)}
`

// Standalone
export const RotateYourPhone = styled.div`
  box-sizing: border-box;
  background: ${Theme.COLORS.WHITE};
  padding: 40px;
  border-radius: 20px;
  color: ${Theme.COLORS.GRAY_L5};
  font-size: 1.25rem;
  display: flex;
  max-width: 80%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RotateText = styled.div`
  text-align: center;
`;

export const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-top: 20px;

  svg {
    display: block;
  }
`;

//no Standalone
export const Box = styled.div`
  max-width: 350px;
  width: 90%;
  box-sizing: border-box;
  max-height: 80vh;
  padding-top: 28px;
  background: ${Theme.COLORS.WHITE};
  z-index: 1000;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const AppIcon = styled.div`
  width: 80px;
  height: 80px;
  ${mobileSmall(css`
    width: 60px;
    height: 60px;
  `)};
  
  border-radius: 15px;
  background: ${Theme.COLORS.GRAY_L1};

  &:not(last-of-type) {
    margin-right: 10px;
  }
`;

export const FakeIcon = styled(AppIcon)``;

export const LogoIcon = styled(AppIcon).attrs((props) => ({
  style: {
    backgroundImage : `url(${appIconImg})`,
    ...props.style,
  }
}))`
  background-size: cover;
`;

export const TextWrapper = styled.div`
  padding: 25px 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InstallTitle = styled.h1`
  margin: 0;
  text-decoration: none;
  font-size: 1.5rem;
  color: black;
`;

export const InstallText = styled.h1`
  text-decoration: none;
  font-size: 1rem;
  line-height: 1.55rem;
  font-weight: normal;
  color: black;
  text-align: center;
`;



