import {isTV} from 'app/device';
import {shallowEqual} from 'helpers';

const repeatTimeout = 420;
const repeatDelay   = 60;

class GamepadListener {

    constructor()
    {
        this.count           = 0;
        this.stopped         = true;
        this.paused          = false;
        this.state           = {
            Left  : 0,
            Down  : 0,
            Right : 0,
            Up    : 0,
            Select: 0,
            Back  : 0
        };
        this.repeat          = false;
        this.lastStateChange = Date.now();

        document.addEventListener('focus', (e) => {
            if (isTV && e.target && e.target.tagName.toLowerCase() === 'input')
                this.paused = true;
        }, true);

        document.addEventListener('blur', () => {
            if (this.paused)
                this.Start(this.dispatchCallback);
        }, true);
    }

    Start(dispatchCallback)
    {
        if (!(this.stopped || this.paused)) return;

        this.dispatchCallback = dispatchCallback;
        this.stopped          = false;
        this.paused           = false;
        if (navigator.getGamepads)
            this.Poll();
    }

    Stop()
    {
        this.stopped = true;
    }

    Count()
    {
        return this.count;
    }

    Poll()
    {
        if (this.stopped || this.paused)
            return;

        let gamepads = navigator.getGamepads();
        this.count   = 0;
        // Count how many connected gamepads
        for (let i = 0; i < gamepads.length; i++)
        {
            if (gamepads[i] && gamepads[i].connected)
                this.count++;
        }

        // Take only the first one
        for (let i = 0; i < gamepads.length; i++)
        {
            let controller = gamepads[i];
            if (controller && controller.connected)
            {
                let axes = [];

                if (controller.axes)
                {
                    for (let a = 0, x = controller.axes.length; a < x; a++)
                        axes.push(controller.axes[a].toFixed(2));
                }

                let leftStick = [axes[0], axes[1]];

                let newState = {
                    Left  : 0,
                    Down  : 0,
                    Right : 0,
                    Up    : 0,
                    Select: 0,
                    Back  : 0
                };

                // left stick
                if (leftStick[0] > .7)
                {
                    newState.Right = 1;
                }
                else if (leftStick[0] < -.7)
                {
                    newState.Left = 1;
                }
                else if (leftStick[1] > .7)
                {
                    newState.Down = 1;
                }
                else if (leftStick[1] < -.7)
                {
                    newState.Up = 1;
                }


                // Buttons
                for (i = 0; i < controller.buttons.length; i++)
                {

                    let val     = controller.buttons[i];
                    // eslint-disable-next-line
                    let pressed = val == 1.0;
                    if (typeof (val) == 'object')
                    {
                        pressed = val.pressed;
                        val     = val.value;
                    }
                    if (pressed)
                    {
                        //eslint-disable-next-line default-case
                        switch (i)
                        {
                            case 14:
                                newState.Left = 1;
                                break;
                            case 12:
                                newState.Up = 1;
                                break;
                            case 15:
                                newState.Right = 1;
                                break;
                            case 13:
                                newState.Down = 1;
                                break;
                            case 0:
                                newState.Select = 1;
                                break;
                            case 1:
                                newState.Back = 1;
                                break;
                        }
                    }
                }

                // auto-repeat
                const now = Date.now();
                if (shallowEqual(this.state, newState))
                {
                    if (now - this.lastStateChange < (this.repeat ? repeatDelay : repeatTimeout))
                    {
                        break;
                    }
                    this.repeat = true;
                }
                else
                {
                    this.repeat = false;
                }
                this.lastStateChange = now;

                if (newState.Left)
                    this.dispatchCallback('left');

                if (newState.Up)
                    this.dispatchCallback('up');

                if (newState.Right)
                    this.dispatchCallback('right');

                if (newState.Down)
                    this.dispatchCallback('down');

                // do not auto-repeat buttons
                if (newState.Select && newState.Select !== this.state.Select)
                    this.dispatchCallback('select');

                if (newState.Back && newState.Back !== this.state.Back)
                    this.dispatchCallback('back');

                this.state = newState;

                break;
            }
        }
        // Dont use requestAnimationFrame as it interferes with scrollArea animation
        setTimeout(this.Poll.bind(this), 60);
    }

}

export default GamepadListener;
