class KeyboardListener {

    constructor()
    {
        this.listener = this.KeyDownListener.bind(this);
    }

    Start(dispatchCallback)
    {
        this.dispatchCallback = dispatchCallback;
        window.addEventListener('keydown', this.listener);
    }

    Stop()
    {
        window.removeEventListener('keydown', this.listener);
    }

    KeyDownListener(e)
    {
        //eslint-disable-next-line default-case
        switch (e.keyCode)
        {
            // Arrow Left
            case 37:
                this.dispatchCallback('left');
                e.preventDefault();
                break;

            // Arrow Up
            case 38:
                this.dispatchCallback('up');
                e.preventDefault();
                break;

            // Arrow Right
            case 39:
                this.dispatchCallback('right');
                e.preventDefault();
                break;

            // Arrow Down
            case 40:
                this.dispatchCallback('down');
                e.preventDefault();
                break;

            // Enter
            case 13:
                this.dispatchCallback('select');
                e.preventDefault();
                break;

            // Space (acting like Enter, cf: PROD-405, ask Nicolas)
            case 32:
                if (e.target.type === 'text')
                    break;

                this.dispatchCallback('select');
                e.preventDefault();
                break;

            // Escape
            case 27:
                this.dispatchCallback('back');
                e.preventDefault();
                break;

            // Tizen Remote Control Special cases
            // Back
            case 10009:
                this.dispatchCallback('back');
                e.preventDefault();
                break;
        }
    }
}

export default KeyboardListener;
