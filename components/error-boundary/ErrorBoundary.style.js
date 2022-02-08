import styled from 'styled-components';
import background from 'assets/images/BackgroundPwa.png';
import Theme from 'app/theme';
import appIconImg from 'assets/images/app_icon.png';
import {RootButton} from 'components/ui/buttons/BaseButton'

export const Wrapper = styled.div.attrs((props) => ({
    style: {
        backgroundImage : `url(${background})`,
        ...props.style,
    }
}))`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  background-size: 100% 100%;
`;

export const ErrorWrapper = styled.div`
  background-color: ${Theme.COLORS.WHITE};
  padding: 50px;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;

  div:nth-of-type(2) {
    display: inline-flex;
  }
`;

export const ErrorTextWrapper = styled.div`
  text-align: center;
  color: ${Theme.COLORS.BLACK};
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LogoIcon = styled.div.attrs((props) => ({
    style: {
        backgroundImage : `url(${appIconImg})`,
        ...props.style,
    }
}))`
  background-size: cover;
  width: 80px;
  height: 80px;
  margin-bottom: 2rem;
`;

export const ErrorTitle = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const ErrorSubtitle = styled.div`
  font-size: 1rem;
  color: ${Theme.COLORS.GRAY_L5};
`;

export const ReloadAppButton = styled(RootButton)`
  background-color: ${Theme.COLORS.RED_L1};
  //background-color: ${Theme.COLORS.RED_L2};

  &:focus, &:hover {
    background-color: ${Theme.COLORS.RED_L2};
  }

  &:active {
    background-color: ${Theme.COLORS.RED_L3};
  }
`;

