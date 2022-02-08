import * as S from './BuildVersion.style';

export function BuildVersion()
{
    let buildVersion = `Build version : ${process.env.REACT_APP_VERSION}`;

    // Append branch/commit if defined
    if (process.env.REACT_APP_BRANCH_COMMIT)
        buildVersion += ` - ${process.env.REACT_APP_BRANCH_COMMIT}`;

    console.log(buildVersion);

    return (
        <S.BuildVersion>{buildVersion}</S.BuildVersion>
    );
}
