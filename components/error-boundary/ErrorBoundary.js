import {Component, createRef} from 'react';
import * as S from './ErrorBoundary.style';
import {withTranslation} from 'react-i18next';

class ErrorBoundary extends Component {
    constructor(props)
    {
        super(props);
        this.props  = props;
        this.state  = {hasError: false};
        this.btnRef = createRef();
    }

    static getDerivedStateFromError(error)
    {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    componentDidMount()
    {
        if (this.state.hasError)
        {
            window.addEventListener('gamepadconnected', this.gamepadHandler);
            window.addEventListener('keypress', () => window.location.reload(false));
            this.btnRef.current.focus();
        }
    }

    //componentDidCatch(error, errorInfo)
    //{
    //    // You can also log the error to an error reporting service
    //    logErrorToMyService(error, errorInfo);
    //}

    // Reload the App on gamepad button pressed
    gamepadHandler(e)
    {
        this.controller = e.gamepad;
        const update    = () => {
            for (const gamepad of navigator.getGamepads())
            {
                if (!gamepad) continue;
                for (const button of gamepad.buttons)
                {
                    let result = button.pressed ? true : '';
                    if (result)
                        window.location.reload(false);
                }
            }
            requestAnimationFrame(update);
        };
        update();
    }

    render()
    {
        const {t} = this.props;

        if (this.state.hasError)
        {
            return (
                <S.Wrapper>
                    <S.ErrorWrapper>
                        <S.ErrorTextWrapper>
                            <S.LogoIcon/>
                            <S.ErrorTitle>
                                {t('error.boundary.wrong')}
                            </S.ErrorTitle>
                            <S.ErrorSubtitle>
                                {t('error.boundary.support')}
                            </S.ErrorSubtitle>
                        </S.ErrorTextWrapper>
                        <S.ReloadAppButton ref={this.btnRef}
                                           tabIndex="1"
                                           onClick={() => window.location.reload(false)}>{t('error.boundary.reload')}</S.ReloadAppButton>
                    </S.ErrorWrapper>
                </S.Wrapper>
            );
        }

        return this.props.children;
    }
}

export const ErrorBoundaryWrapper = withTranslation()(ErrorBoundary);
