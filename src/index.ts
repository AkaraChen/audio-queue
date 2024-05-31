import PQueue from 'p-queue'
import type { Howl } from 'howler'

function play(howl: Howl) {
    return new Promise(resolve => {
        howl.once('end', resolve)
        howl.play()
    })
}

export class AudioQueue {
    private queue = new PQueue({ concurrency: 1 })
    private current: Howl | null = null

    add(howl: Howl) {
        const abort = new AbortController()
        this.queue.add(
            async () => {
                this.current = howl
                await play(howl)
            },
            { signal: abort.signal },
        )
        return abort
    }
    pause() {
        this.current?.pause()
    }
    resume() {
        this.current?.play()
    }
    stop() {
        this.current?.stop()
    }
    clear() {
        this.queue.clear()
    }
}
