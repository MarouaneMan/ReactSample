import {NavButton} from 'components/profile';
import {IconLogout} from 'components/ui'

export function LogoutButton({onClick})
{
    return (
        <NavButton onClick={onClick}>
            <IconLogout/>
        </NavButton>
    )
}
