export function debounce(func, wait) {
    let timeout = undefined;
    return function () {
        const later = () => {
            timeout = undefined;
            func();
        };

        if (timeout !== undefined) {
            clearTimeout(timeout);
        }
        timeout = window.setTimeout(later, wait);
    };
}
