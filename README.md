# audio-queue

```
🧪 WIP: will be available later
```

Just add audio to the queue and it will play it for you, one after the other.

## Installation

```bash
npm install audio-queue howler
npm install -D @types/howler
```

## Usage

```javascript
import { AudioQueue } from 'audio-queue'
import { Howl } from 'howler'

const audioQueue = new AudioQueue()
audioQueue.add(new Howl({ src: ['audio.mp3'] }))
```

And you can abort an audio by calling `.abort()` on the return of `add`:

```javascript
const abortController = audioQueue.add(new Howl({ src: ['audio.mp3'] }))

abortController.abort()
```

Or you can pause/resume/stop the current audio:

```javascript
audioQueue.pause()
audioQueue.resume()
audioQueue.stop()
```

And you can even clear the queue:

```javascript
audioQueue.clear()
```
