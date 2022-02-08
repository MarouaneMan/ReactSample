import {MultiStep, Step} from 'context/multi-step';
import {RowLayout} from 'components/ui';
import {StepAskCode, StepGetMethod, StepResetPassword, StepVerifyCode} from './steps';

export function AccountRecoveryScreen()
{
    return (
        <RowLayout alignItems="center" justifyContent="center" fullSize>
            <MultiStep defaultStep="step1">
                <Step name="step1" component={StepGetMethod}/>
                <Step name="step2" component={StepAskCode}/>
                <Step name="step3" component={StepVerifyCode}/>
                <Step name="step4" component={StepResetPassword}/>
            </MultiStep>
        </RowLayout>
    );
}
