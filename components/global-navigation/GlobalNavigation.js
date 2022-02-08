import {Menu, LogoNav} from 'components/ui';
import * as S from './GlobalNavigation.style';
import {SpatialNavSection, useSpatialNavContext} from 'context';
import {useGlobalNavigation} from 'hooks';
import {AsideNav} from './aside-nav/AsideNav';
import {If} from 'helpers';
import {useRef} from 'react';

export function GlobalNavigation()
{
    const {navigation, currentTab, visible, subMenuVisible, onTabSelected, onSubTabSelected} = useGlobalNavigation();
    const menuWrapper                                                                        = useRef();
    const {setFocus}                                                                         = useSpatialNavContext();

    return (
        <If condition={visible}>
            <S.Wrapper>
                <S.Content>
                    <S.LogoWrapper>
                        <LogoNav/>
                    </S.LogoWrapper>
                    <SpatialNavSection focusOnMount enterTo="last-focused">
                        <S.MenuWrapper ref={menuWrapper}>
                            <Menu items={Object.keys(navigation)}
                                  namespace="navigation"
                                  onItemSelected={onTabSelected}/>
                        </S.MenuWrapper>
                    </SpatialNavSection>
                    <S.AsideNavWrapper>
                        <AsideNav/>
                    </S.AsideNavWrapper>
                </S.Content>
                {navigation[currentTab.name]?.subMenu && subMenuVisible &&
                <SpatialNavSection enterTo="last-focused">
                    <S.SubContent>
                        <Menu items={navigation[currentTab.name].subMenu}
                              namespace={currentTab.name}
                              onItemSelected={onSubTabSelected}
                              preventMoveRight={true}
                              overrideMoveUp={() => {
                                  setFocus(menuWrapper.current);
                              }}
                        />
                    </S.SubContent>
                </SpatialNavSection>
                }
            </S.Wrapper>
        </If>
    );
}
