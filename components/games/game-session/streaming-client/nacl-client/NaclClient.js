import {useNaclClient} from 'hooks';
import * as S from './NaclClient.style';
import ReactDOM from 'react-dom';
import {Authentication} from 'services';
import {If} from 'helpers';

export function NaclClient()
{
    const {ref, logRef} = useNaclClient();

    // use specific variants of client + optional logger console according to specific users
    const username     = Authentication.GetUsername();
    // for all our QA users - latest variant and no console
    let showConsole    = false;
    let manifestSource = 'tizen/qa_Knuckles.nmf';
    if (username === 'Regis_BT')
    {
        // Bouygues test user - specific version and console
        showConsole    = true;
        manifestSource = 'tizen/stats_Knuckles.nmf';
    }
    else if (username.startsWith('samsung_') || username === 'sandra')
    {
        // Samsung users - current production client and no console
        showConsole    = false;
        manifestSource = 'tizen/Knuckles.nmf';
    }

    return ReactDOM.createPortal(
        <S.Wrapper>
            <embed ref={ref} type="application/x-nacl" src={manifestSource} showConsole={showConsole}/>
            <If condition={showConsole}>
                <div>
                    <div ref={logRef}/>
                    <button onClick={() => {
                        // copy log contents to clipboard
                        navigator.clipboard.writeText(logRef.current.innerHTML.replaceAll('<br>', '\n'));
                    }}>
                        Copy to clipboard
                    </button>
                </div>
            </If>
        </S.Wrapper>,
        document.body
    );
}
