import { EAudioPriority, AudioQueue } from '../src/index'
import { Howl } from 'howler'
import 'typed-query-selector'
import '@picocss/pico/css/pico.css'

const queue = new AudioQueue()

const $ = document.querySelector.bind(document)
const add = $('button#add')!
const pause = $('button#pause')!
const resume = $('button#resume')!
const stop = $('button#stop')!
const clear = $('button#clear')!

add.addEventListener('click', () => {
    // TODO: Add audio file in /public folder
    queue.add(new Howl({ src: ['audio.mp3'] }), {
        priority: EAudioPriority.High,
    })
})
pause.addEventListener('click', () => queue.pause())
resume.addEventListener('click', () => queue.resume())
stop.addEventListener('click', () => queue.stop())
clear.addEventListener('click', () => queue.clear())
