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
