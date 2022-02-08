import {SpatialNavProvider, SpatialNavSection} from 'context';
import * as S from './SupportMessageBox.style';
import {IconSettings, PrimaryButton} from 'components/ui';
import {useTranslation} from 'react-i18next';
import {If} from 'helpers';
import React from 'react';
import ReactDOM from 'react-dom';

export function SupportMessageBox({onClose, supportMethods})
{

    const {t} = useTranslation();


    const box =
              <SpatialNavProvider>
                  <SpatialNavSection focusOnMount>
                      <S.Wrapper>
                          <S.MessageBox>
                              <S.BoxTitleWrapper>
                                  <S.Icon>
                                      <IconSettings/>
                                  </S.Icon>
                                  <S.BoxTitle>{t('support.title')}</S.BoxTitle>
                              </S.BoxTitleWrapper>
                              <S.BuildVersion>{t('support.version')} {process.env.REACT_APP_VERSION}</S.BuildVersion>
                              <S.Message>
                                  {t('support.message')} &nbsp;
                                  <If condition={supportMethods.length > 0}>
                                      {
                                          supportMethods.map((method, i) => {
                                              let currentMethod = method[Object.keys(method)[0]];
                                              return (
                                                  <React.Fragment key={i}>
                                                      <S.SupportLink
                                                          href={Object.keys(method)[i] === 'email' ? `mailto:${currentMethod}` : `${currentMethod}`}
                                                          target="_blank">{currentMethod}</S.SupportLink>
                                                      {i < (supportMethods.length - 1) ? ' - ' : null}
                                                  </React.Fragment>
                                              );
                                          })
                                      }
                                  </If>
                              </S.Message>
                              <S.CloseWrapper>
                                  <PrimaryButton onClick={onClose}>{t('buttons.close')}</PrimaryButton>
                              </S.CloseWrapper>
                          </S.MessageBox>
                      </S.Wrapper>
                  </SpatialNavSection>
              </SpatialNavProvider>;

    return (
        ReactDOM.createPortal(box, document.body)
    )

};
