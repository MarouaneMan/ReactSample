import {useMultiViewContext} from './MultiViewContext';
import {If} from 'helpers';

export function View(props)
{
    const {view, viewRenderCount} = useMultiViewContext();

    return (
        <If condition={view === props.name}>
            <props.component {...props} firstRender={viewRenderCount.current[props.name] === 1}/>
        </If>
    );
}
