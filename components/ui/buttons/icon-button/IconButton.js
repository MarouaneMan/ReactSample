import React from 'react';
import * as S from './IconButton.style';

export function IconButton({children, icon, button, ...props})
{
    const Icon   = icon;
    const Button = button;
    return (
        <Button {...props}>
            <S.Wrapper>
                <S.Icon>
                    <Icon/>
                </S.Icon>
                <S.Text>
                    {children}
                </S.Text>
            </S.Wrapper>
        </Button>
    );
}
