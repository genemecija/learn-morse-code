let ctx = null

export function getAudioContext() {
    if (!ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (AudioCtx) ctx = new AudioCtx()
    }
    return ctx
}
