import React from 'react';
import * as S from './LoadingButton.style';
import {If} from 'helpers';

export const LoadingButton = React.forwardRef(({
                                                   children, isLoading, loadingText,
                                                   showLoadingText, forceClick, onClick, button,
                                                   ...props
                                               }, forwardedRef) => {
    const Button = button;
    return (
        <>
            <Button {...props} ref={forwardedRef} onClick={(!isLoading || forceClick) ? onClick : () => {
            }}>
                <If condition={isLoading}>
                    <S.Wrapper>
                        <S.Spinner/>
                        <If condition={showLoadingText === true}>
                            <S.Text>
                                {loadingText}
                            </S.Text>
                        </If>
                    </S.Wrapper>
                </If>
                <If condition={!isLoading}>
                    {children}
                </If>
            </Button>
        </>
    );
});
