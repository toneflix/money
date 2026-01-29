let envLoaded = false

export const useSetEnvLoaded = (loaded?: boolean): void => {
    envLoaded = loaded ?? false
}

export const useIsEnvLoaded = (): boolean => {
    return envLoaded
}

export default {
    useSetEnvLoaded,
    useIsEnvLoaded
}