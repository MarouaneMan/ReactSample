import {Profile} from 'components/profile/selection-manager/profile/Profile';
import * as S from './ProfileList.style';
import {SpatialNavSection} from 'context';

export function ProfileList({list, onSelected})
{
    return (
        <SpatialNavSection focusOnMount enterTo="last-focused">
            <S.Wrapper>
                {list.map((profile, index) =>
                    <Profile key={index} data={profile} count={list.length} onClick={() => onSelected(profile)}/>)
                }
            </S.Wrapper>
        </SpatialNavSection>
    );
}
