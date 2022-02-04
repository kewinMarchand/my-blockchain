export const uiHelper = {
    getColorByHash: (hash) => {
        return {color: `#${hash.substring(0, 6)}`};
    }
}