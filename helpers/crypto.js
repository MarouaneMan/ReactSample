// simple reversible xor-based encryption

// generate random key once
const key = Array.from({length: 32}, () => Math.floor(Math.random() * 256));

export function encrypt(text)
{
    // two bytes per char to support UTF-16
    const bytes         = [...text].map(c => {
        const code = c.charCodeAt(0);
        return [Math.floor(code / 256), code % 256];
    }).flat();
    const xorBytes      = bytes.map((b, i) => b ^ key[i % key.length]);
    const encryptedText = String.fromCharCode(...xorBytes);
    return encryptedText;
}

export function decrypt(encryptedText)
{
    const xorBytes = [...encryptedText].map(c => c.charCodeAt(0));
    const bytes    = xorBytes.map((b, i) => b ^ key[i % key.length]);
    let text       = '';
    // recompose UTF-16 from byte pairs
    for (let i = 0; i < bytes.length; i += 2)
    {
        const code = bytes[i] * 256 + bytes[i + 1];
        text += String.fromCharCode(code);
    }
    return text;
}
