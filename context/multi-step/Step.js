import {useMultiStepContext} from './MultiStepContext';
import {If} from 'helpers';

export function Step(props)
{
    const {step} = useMultiStepContext();

    return (
        <If condition={step === props.name}>
            <props.component/>
        </If>
    );
}
