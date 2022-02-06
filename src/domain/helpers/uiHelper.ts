export const uiHelper = {
    getColorByHash: (hash: string): {color: string} => {
        return {color: `#${hash.substring(0, 6)}`};
    }
}