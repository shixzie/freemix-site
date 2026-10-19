import parity from './parity.json';

export type Status = 'delivered' | 'building' | 'groundwork' | 'planned' | 'ongoing';

export const STATUS_LABEL: Record<Status, string> = {
  delivered: 'Delivered',
  building: 'Building now',
  groundwork: 'Groundwork',
  planned: 'Planned',
  ongoing: 'Ongoing',
};

export interface Phase {
  n: number;
  title: string;
  short: string;
  weeks: string;
  status: Status;
  summary: string;
  goals: string[];
  /** What already exists in the repository, in plain words. */
  now?: string;
  exit: string;
}

// Condensed from docs/spec/implementation-roadmap.md in the FreeMix repository.
// Status reflects the code, tests and "current implementation boundary" notes
// in that file; durations are the spec's estimates, not promised dates.
export const PHASES: Phase[] = [
  {
    n: 0, title: 'Feasibility and constraints', short: 'Feasibility', weeks: '6–10 weeks', status: 'ongoing',
    summary: 'Disposable prototypes that prove the media stack, GPU interop and licensing posture before APIs freeze.',
    goals: ['1080p60 frames through D3D12, Metal and Vulkan via wgpu', '48 kHz capture, mix and output on all three OSes', 'Recoverable hardware-encoded record and stream', 'Codec, FFmpeg and vendor SDK licensing plan'],
    exit: 'Architecture decisions recorded and no blocker to a two-frame HD path.',
  },
  {
    n: 1, title: 'Foundation and simulated engine', short: 'Foundation', weeks: '8–10 weeks', status: 'delivered',
    summary: 'The workspace, typed media model, revisioned commands and a deterministic headless switcher.',
    goals: ['Typed IDs, formats, rates, colour and audio metadata', 'Versioned project schema with journal and atomic save', 'Idempotent commands, events, revisions and transactions', 'Deterministic clock, scheduler and simulated sources', 'Machine-checked parity ledger in CI'],
    now: 'The runnable MVP creates a show, cuts and fades on exact frames, rejects stale commands, and restores after a restart.',
    exit: 'A scripted end-to-end show runs in CI with no devices, network or GPU.',
  },
  {
    n: 2, title: 'GPU playback switcher', short: 'GPU switcher', weeks: '10–14 weeks', status: 'building',
    summary: 'The first real pixels: wgpu compositing, file playback, the native studio shell and a program recorder.',
    goals: ['wgpu context, resource pools and render graph', 'Image, colour, bars and file playback', 'Transforms, crop, opacity, layers and colour conversion', 'Native studio with Preview, Program and transitions', 'Master bus, meters, fullscreen output and a fault-tolerant recorder'],
    now: 'Native compositing, media playback and the egui studio console run today; the daemon renders Program on the GPU.',
    exit: 'A one-hour Basic Show passes on every Tier-1 OS.',
  },
  {
    n: 3, title: 'Live capture and professional core', short: 'Pro core', weeks: '12–16 weeks', status: 'building',
    summary: 'Cameras, audio devices and screens, plus the scene, overlay, multiview and colour tools a show depends on.',
    goals: ['OS camera, audio and screen capture with hot-plug and fallback', 'Drift-corrected audio with native EQ, gate, compressor and limiter', 'Scenes with ten layers, keys, masks and effects', 'Full transition family, eight overlays and stingers', 'Multiviews, tally, scopes, colour grading and controllers'],
    now: 'Linux V4L2 and macOS camera capture, scene layers, chroma keys, stingers, grading and scopes are in the tree.',
    exit: 'Profile A (HD) certified without network contribution.',
  },
  {
    n: 4, title: 'Output, stream and headless reliability', short: 'Outputs', weeks: '10–14 weeks', status: 'building',
    summary: 'Streaming, recording and a headless engine you can run as a service and control from a browser.',
    goals: ['RTMP/RTMPS and SRT with five independent destinations', 'Multi-bitrate output and a LAN HLS feed', 'Two recorders, ISO capture and timecode manifests', 'Service mode, health, readiness and support bundles', 'Browser control with roles, pairing and live previews'],
    now: 'Recorders, stream targets, the web operator page and phone tally run against the daemon.',
    exit: 'Headless show survives encoder, network and client failures.',
  },
  {
    n: 5, title: 'Graphics, data and automation', short: 'Graphics & automation', weeks: '12–16 weeks', status: 'building',
    summary: 'Titles, data-driven graphics, browser sources, playlists, scripts and every way to trigger them.',
    goals: ['Title scenes with shaping, animation and tickers', 'Title designer and live field editor', 'Isolated browser input with custom CSS', 'Data sources mapped to typed title fields', 'Triggers, macros, sandboxed Wasm scripts, PTZ and telestrator'],
    now: 'The keyframe title animator, data sources, cue lists with timed GO and sandboxed scripts are in the studio.',
    exit: 'Automation scenario resumes from the last revision with no duplicate actions.',
  },
  {
    n: 6, title: 'Guests and collaboration', short: 'Guests', weeks: '10–14 weeks', status: 'groundwork',
    summary: 'Up to eight browser guests with mix-minus, return video, talkback and a producer lobby.',
    goals: ['Guest signalling, lobby, invites and device preflight', 'Eight encrypted WebRTC guest inputs', 'Return video, mix-minus and talkback', 'Chat and guest manager roles', 'NAT traversal, bandwidth adaptation and echo handling'],
    now: 'Mix-minus planning, guest roles and a WebRTC SDP and bandwidth model exist; no live transport yet.',
    exit: 'Remote Show scenario passes with eight guests.',
  },
  {
    n: 7, title: 'Replay and sports', short: 'Replay', weeks: '14–20 weeks', status: 'groundwork',
    summary: 'Eight-camera instant replay with marks, A/B channels, highlights and export during record.',
    goals: ['Rolling segment storage per camera', 'Synchronised eight-source recording', 'Events, marks, tags and lists', 'Replay A/B, jog, shuttle and variable speed', 'Quad view, highlight reels and music beds'],
    now: 'The replay catalogue, angle resolution, highlight timeline and disk prediction are modelled; decoding and presentation are next.',
    exit: 'Sports Show scenario passes on certified storage.',
  },
  {
    n: 8, title: 'Professional hardware and formats', short: 'Hardware', weeks: '16–24 weeks, ongoing', status: 'planned',
    summary: 'Licensed vendor adapters, each shipped with its own conformance report.',
    goals: ['Blackmagic, AJA and Bluefish444 capture and output', 'NDI and OMT send and receive', 'Signed virtual camera and audio devices', 'Genlock, PTP, timecode and interlaced output', '10-bit HDR end to end, VST3 and UHD Profile B'],
    exit: 'Each adapter ships only with a platform-specific conformance report.',
  },
  {
    n: 9, title: 'Full parity and release certification', short: 'Release', weeks: '12–20 weeks', status: 'groundwork',
    summary: 'Close the last parity rows, then soak, audit and certify for release.',
    goals: ['vMix HTTP/TCP/tally compatibility adapter', 'Virtual sets and social moderation', 'Complete localisation and accessibility audit', '72-hour soak and disaster-recovery drills', 'External security and broadcast-operator review'],
    now: 'A vMix API translator, virtual-set planner, social desk and English/Spanish UI catalogues are in progress.',
    exit: 'No unclassified vMix 29 public feature remains.',
  },
];

export const AREAS: Record<string, { key: string; label: string; color: string }> = {
  'Inputs and source management': { key: 'inputs', label: 'Inputs', color: '#3b7bff' },
  'Switching, composition, and video processing': { key: 'switching', label: 'Switching', color: '#ef3b36' },
  'Titles, graphics, data, and telestration': { key: 'graphics', label: 'Graphics', color: '#9b6bff' },
  'Audio': { key: 'audio', label: 'Audio', color: '#22c55e' },
  'Recording, replay, streaming, and outputs': { key: 'outputs', label: 'Outputs', color: '#f5a524' },
  'Remote guests, control, automation, and operations': { key: 'control', label: 'Control', color: '#2dd4bf' },
};

export const features = parity.features;
export const generatedFrom = parity.generatedFrom;

export function phaseStats(n: number) {
  const rows = features.filter((f) => f.phase === n);
  return {
    rows: rows.length,
    tested: rows.filter((f) => f.testsPresent).length,
    blocked: rows.filter((f) => f.status === 'blocked').length,
  };
}

export const totals = {
  rows: features.length,
  tested: features.filter((f) => f.testsPresent).length,
  blocked: features.filter((f) => f.status === 'blocked').length,
  p0: features.filter((f) => f.priority === 'P0').length,
};
export const stats = parity.stats;
