import PQueue from 'p-queue'
import type { Howl } from 'howler'

function play(howl: Howl) {
    return new Promise(resolve => {
        howl.once('end', resolve)
        howl.play()
    })
}

export enum EAudioPriority {
    Low = 0,
    Normal = 1,
    High = 2,
    Highest = 3,
}

export interface AudioOption {
    priority?: EAudioPriority
}

/**
 * Represents an audio queue that manages the playback of audio files.
 */
export class AudioQueue {
    private queue = new PQueue({ concurrency: 1 })
    private current: Howl | null = null

    /**
     * Adds an audio file to the queue for playback.
     * @param howl The Howl instance representing the audio file.
     * @param option Optional audio playback options.
     * @returns An AbortController that can be used to abort the playback.
     */
    add(howl: Howl, option?: AudioOption): AbortController {
        const { priority = EAudioPriority.Normal } = option || {}

        const abort = new AbortController()
        abort.signal.addEventListener('abort', () => howl.stop())

        this.queue.add(
            async () => {
                this.current = howl
                if (!abort.signal.aborted) {
                    await play(howl)
                }
                this.current = null
            },
            { signal: abort.signal, priority },
        )
        return abort
    }

    /**
     * Pauses the currently playing audio.
     */
    pause(): void {
        this.current?.pause()
    }

    /**
     * Resumes the playback of the paused audio.
     */
    resume(): void {
        this.current?.play()
    }

    /**
     * Stops the currently playing audio.
     */
    stop(): void {
        this.current?.stop()
    }

    /**
     * Clears the audio queue, removing all pending audio files.
     */
    clear(): void {
        this.queue.clear()
    }
}
