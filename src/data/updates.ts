// Progress log shown on /roadmap/, newest first. Each entry covers the FreeMix
// commits since the previous site sync, in plain words.
export interface Update {
  date: string;
  /** Short commit range in the FreeMix repository, `from..to`. */
  range: string;
  title: string;
  items: string[];
}

export const UPDATES: Update[] = [
  {
    date: '2026-10-30',
    range: '775eb1a..37d6b66',
    title: 'Open network video, aux buses and no licensed SDKs',
    items: [
      'FreeMix now speaks OMT, the open media transport, through its own implementation: it publishes Program to the network, reads omt:// sources as inputs and finds them automatically. With this, FreeMix drops NDI, VST3 and every other licensed vendor SDK from its plans; capture cards, outputs and plugins will plug in through FreeMix’s own open SDKs instead.',
      'The mixer gains aux buses A to G alongside Master, with their own meters and a Buses window in Studio for sends and output routing.',
      'Replay inputs can be A/B linked on one transport and run playlists of events with per-entry speed, and Studio shows replay storage health and the recording time left. Reel exports wait for still-recording segments to close.',
    ],
  },
  {
    date: '2026-10-27',
    range: 'c9e426c..775eb1a',
    title: 'Replay with sound, MIDI control and key profiles',
    items: [
      'Instant replays now record and play their source audio, a cued replay can be jogged frame by frame, and a finished replay can hand Program back to the live source on its own.',
      'Highlight reels gain dissolves between clips, a music bed, recorded audio and a free-space check before exporting a web-ready MP4.',
      'Studio can drive console actions from a MIDI controller, and keyboard layouts come as key profiles, with FreeMix and vMix styles built in and .fmkeys import and export.',
      'Health alerts can be acknowledged and silenced from Studio, the command line or the web operator page, and each show can set its own alert rules. The operator page also gains per-strip Program meters.',
      'A deinterlace layer effect and feathered garbage mattes join the video tools.',
    ],
  },
  {
    date: '2026-10-26',
    range: '64afb29..c9e426c',
    title: 'Instant replay and highlight reels',
    items: [
      'Instant replay works end to end: up to four inputs record into rolling segment files, an operator marks or captures the last 5, 10 or 20 events, and any angle plays back through a Replay input from a new Replay panel in Studio or from the command line. Replay audio, A/B linking and jog or shuttle are still to come.',
      'Highlight reels of up to 64 clips, each with its own trims and 25 to 100 percent speed, are edited in the Replay panel and exported to an H.264 MP4 with progress and cancel.',
      'Studio’s health strip now also warns about network trouble, sources drifting out of sync and encoders running out of headroom.',
      'Project shortcuts can be scoped to a single Studio tool window or pop-out.',
    ],
  },
  {
    date: '2026-10-22',
    range: 'afe5b41..64afb29',
    title: 'Pro audio, new input types and a browser title editor',
    items: [
      'Every audio strip and the Master bus now have their own FX chain: EQ with a curve view, gate, compressor, expander, limiter and a sample-accurate delay, plus EBU R128 loudness and true-peak meters. Live cameras and capture devices are drift-corrected to the show clock, so sound and picture stay in sync over long shows.',
      'New inputs: media lists that play gaplessly with shuffle, loop and their own transitions, still images and slideshows, PDFs and slide decks with presenter notes, and screen or window capture with its audio, including Wayland on Linux.',
      'Keying gains key/fill and alpha keys, light wrap, polygon garbage mattes, a perceptual chroma key and one-click auto key from the input’s own picture.',
      'Phones and tablets now pair with the show over a TLS web gateway on the venue network. From the browser, a graphics operator can edit titles at /titles, and the operator page can adjust strip FX, reset loudness and fire shortcuts.',
      'Project shortcuts can use chords, mouse buttons and OSC, target whatever is on Preview or Program, and export as .fmshortcuts files. Studio’s health strip shows the engine’s CPU, GPU and alerts.',
    ],
  },
  {
    date: '2026-10-19',
    range: '1c841b0..afe5b41',
    title: 'See what a cue does before you press GO',
    items: [
      'The Cues panel now spells out, step by step, what firing the standby cue will do, including waits, follow-on cues and scripts, and flags any step the server would refuse as the show stands. Hovering a cue shows the same preview, and Preview on PVW puts its shot on Preview first.',
      'An armed cue’s countdown never goes below zero, and the Studio top bar drops detail on narrow windows instead of overlapping.',
      'Commands several operators send at once now share one disk write: with four clients cutting together, journal writes fell from 48 to 12 and every cut was acknowledged in about 185 ms instead of 290 ms.',
      'When the native frame loop runs behind, a late frame still waits for its clip audio and title animation, so audio keeps playing.',
    ],
  },
];
