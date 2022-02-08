import React from 'react';
import * as S from './RadioButton.style';


export const RadioButton = React.forwardRef((props, ref) => {

    return (
        <S.RadioButtonWrapper onClick={props.onRadioButtonClick}>
            <S.ButtonRadio className={props.radioButtonStatus === props.value ? 'active' : ''}></S.ButtonRadio>
            <S.RadioButtonLabel>{props.label}</S.RadioButtonLabel>
        </S.RadioButtonWrapper>
    );
});
