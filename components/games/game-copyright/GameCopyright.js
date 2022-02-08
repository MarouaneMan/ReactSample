import {IconWarning} from 'components/ui';
import {useTranslation} from 'react-i18next';
import * as S from './GameCopyright.style';
import * as ContentRatingIcons from 'assets/images/content_rating';

export function GameCopyright({game})
{
    const {t} = useTranslation();

    // Only PEGI is supported for now
    // TODO: add remaining content rating systems
    const PEGI = game.content_ratings.find(e => e.indexOf('PEGI') !== -1);

    return (
        <S.ScrollWrapper>
            <S.Copyright>
                {game.copyright}
            </S.Copyright>
            <S.ContentRatingWrapper>
                {PEGI && <S.ContentRatingIcon src={ContentRatingIcons[PEGI]}/>}
                <S.WarningWrapper>
                    <S.WarningHeader>
                        <S.WarningHeaderIcon>
                            <IconWarning/>
                        </S.WarningHeaderIcon>
                        <S.WarningHeaderText>
                            {t('games.content_rating_warning.header')}
                        </S.WarningHeaderText>
                    </S.WarningHeader>
                    <S.WarningMessage>
                        {t('games.content_rating_warning.message')}
                    </S.WarningMessage>
                </S.WarningWrapper>
            </S.ContentRatingWrapper>
        </S.ScrollWrapper>
    );
}
