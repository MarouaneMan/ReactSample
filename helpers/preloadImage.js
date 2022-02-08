export function preloadImage(src)
{
    return new Promise((resolve, reject) => {
        let image     = new Image();
        image.src     = src;
        image.onload  = resolve;
        image.onerror = reject;
    });
}
