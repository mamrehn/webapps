/* Pictograms of the app tiles (STYLEGUIDE.md § 5.7) — keyed by app id.
   Each one shows how the app works, not what it is called: the robot
   next to its digital twin, the branch that merges back, the address
   space the prefix halves. app.js wraps the markup in
   <svg class="pictogram" viewBox="0 0 48 48" aria-hidden="true">.

   Grid 48 × 48, coordinates within 3…45, one stroke weight (set by the
   class). Ink draws the object, .muted the context, one or two hues
   (.blue .orange .teal .brown .magenta .violet) what the app does.
   Fills: .paper .wash .tint .solid. Lines: .dotted. No raw colors.    */

window.PICTOGRAMS = {
  // The humanoid torso with arms and the AI camera in its head, and its
  // digital twin in the Webots simulation, in the same pose
  pib3: `
    <path d="M7 23 4 31l1 7M17 23l3.5 7 1.5-7"/>
    <rect class="paper" x="6" y="7" width="12" height="10" rx="3"/>
    <circle class="orange" cx="12" cy="12" r="2"/>
    <path d="M12 17v3"/>
    <path class="wash" d="M7 40V23a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v17z"/>
    <rect class="paper" x="25" y="5" width="20" height="25" rx="2"/>
    <path d="M35 30v4M30 34h10"/>
    <g class="blue">
      <path d="M32 18.5 30 24M38 18.5l2 3.5.5-4"/>
      <rect class="paper" x="31.5" y="8" width="7" height="6" rx="2"/>
      <path d="M35 14v2"/>
      <path class="tint" d="M32 27v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v8z"/>
    </g>`,

  // A card with a question, reviewed again at growing intervals
  flashcards: `
    <rect class="wash" x="15" y="5" width="26" height="17" rx="2"/>
    <rect class="paper" x="7" y="10" width="26" height="17" rx="2"/>
    <path class="blue" d="M17 15.5a3 3 0 1 1 4.5 2.6c-.9.5-1.5 1.1-1.5 2.4"/>
    <circle class="solid blue" cx="20" cy="23.5" r=".5"/>
    <path class="muted" d="M4 37h39M40 34l3 3-3 3"/>
    <g class="solid magenta">
      <circle cx="7" cy="37" r="1.5"/><circle cx="12" cy="37" r="1.5"/>
      <circle cx="20" cy="37" r="1.5"/><circle cx="33" cy="37" r="1.5"/>
    </g>`,

  // A command in the console, a branch that merges back
  git: `
    <path d="M5 10h38"/>
    <path class="orange" d="M19 10c6 0 4 10 10 10s4-10 11-10"/>
    <circle class="paper" cx="8" cy="10" r="3"/>
    <circle class="paper" cx="19" cy="10" r="3"/>
    <circle class="paper" cx="40" cy="10" r="3"/>
    <circle class="paper orange" cx="29" cy="20" r="3"/>
    <rect class="wash" x="5" y="28" width="38" height="14" rx="2"/>
    <path class="teal" d="M10 32l3 3-3 3M17 38h11"/>`,

  // Tokens and components: a palette, text styles, a button, a check
  styleguide: `
    <g class="solid">
      <rect class="blue" x="5" y="6" width="4" height="4" rx=".5"/>
      <rect class="orange" x="12" y="6" width="4" height="4" rx=".5"/>
      <rect class="teal" x="19" y="6" width="4" height="4" rx=".5"/>
      <rect class="brown" x="26" y="6" width="4" height="4" rx=".5"/>
      <rect class="magenta" x="33" y="6" width="4" height="4" rx=".5"/>
      <rect class="violet" x="40" y="6" width="4" height="4" rx=".5"/>
    </g>
    <path d="M5 19h18"/>
    <path class="muted" d="M5 24h30M5 29h24"/>
    <rect x="5" y="35" width="18" height="8" rx="2"/>
    <path d="M10 39h8"/>
    <rect x="29" y="35" width="8" height="8" rx="1.5"/>
    <path d="M31 39l1.8 1.8L35.2 37"/>`,

  // Four colored wires pressed into the LSA forks of a socket
  netzwerkdose: `
    <path class="wash" d="M8 12l6-6h28l-6 6z"/>
    <path class="wash" d="M36 12l6-6v14l-6 6z"/>
    <rect class="paper" x="8" y="12" width="28" height="14" rx="1"/>
    <path d="M11 15v5M15 15v5M17 15v5M21 15v5M23 15v5M27 15v5M29 15v5M33 15v5"/>
    <path class="wash" d="M19 46v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6"/>
    <path class="teal" d="M21 38c0-8-8-10-8-21"/>
    <path class="orange" d="M23 38c0-8-4-10-4-21"/>
    <path class="blue" d="M25 38V17"/>
    <path class="brown" d="M27 38c0-8 4-10 4-21"/>`,

  // Chosen traits turn into sentences on the report
  zeugnis: `
    <rect class="solid magenta" x="4" y="13" width="10" height="5" rx="1"/>
    <rect class="muted" x="4" y="22" width="10" height="5" rx="1"/>
    <rect class="solid magenta" x="4" y="31" width="10" height="5" rx="1"/>
    <rect class="paper" x="19" y="5" width="24" height="38" rx="2"/>
    <path d="M23 11h10"/>
    <path class="muted" d="M23 17h16"/>
    <path class="magenta" d="M23 22h16M23 27h11"/>
    <path class="muted" d="M23 37h7"/>
    <circle cx="37" cy="36" r="3"/>`,

  // One screen for the room: notes, clock, the time that is left
  dashboard: `
    <rect class="paper" x="4" y="5" width="40" height="29" rx="2"/>
    <path d="M24 34v7M16 41h16"/>
    <path d="M9 11h14"/>
    <path class="muted" d="M9 16h17M9 21h12"/>
    <circle cx="36" cy="15" r="5"/>
    <path d="M36 12.5V15l1.8 1.8"/>
    <path class="muted" d="M9 28h30"/>
    <rect class="solid teal" x="9" y="27" width="19" height="2" rx=".5"/>`,

  // Markdown in git and the mebis course, kept in step both ways
  'mebis-sync': `
    <path class="paper" d="M3 12a2 2 0 0 1 2-2h8l5 5v21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <path d="M13 10v5h5M7 20h6"/>
    <path class="muted" d="M7 25h7M7 30h5"/>
    <rect class="paper" x="30" y="10" width="15" height="28" rx="2"/>
    <path d="M30 15h15M34 21h6"/>
    <path class="muted" d="M34 26h7M34 31h5"/>
    <path class="blue" d="M20 19h8m-3-3 3 3-3 3"/>
    <path class="orange" d="M28 29h-8m3-3-3 3 3 3"/>`,

  // A ZIP of submissions becomes landscape sheets, two pages and a grade box each
  'mebis-quiz-pdf': `
    <path class="wash" d="M17 4a1 1 0 0 1 1-1h4l2 2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1z"/>
    <path class="dotted" d="M24 7v5"/>
    <path d="M24 15v3m-2-2 2 2 2-2"/>
    <rect class="paper" x="4" y="21" width="40" height="23" rx="1"/>
    <path class="muted dotted" d="M24 24v18"/>
    <rect class="solid orange" x="16" y="25" width="4" height="4" rx=".5"/>
    <rect class="solid orange" x="36" y="25" width="4" height="4" rx=".5"/>
    <path class="muted" d="M8 27h5M8 33h12M8 37h8M28 27h5M28 33h12M28 37h8"/>`,

  // Lesson entries filled in down the week, one check still open
  'webuntis-helfer': `
    <rect class="paper" x="5" y="7" width="38" height="35" rx="2"/>
    <path d="M5 14h38M14 4v6M34 4v6"/>
    <rect class="solid teal" x="10" y="19" width="4" height="4" rx=".5"/>
    <path class="teal" d="M18 21h14"/>
    <rect class="solid teal" x="10" y="27" width="4" height="4" rx=".5"/>
    <path class="teal" d="M18 29h14"/>
    <rect class="orange" x="10" y="35" width="4" height="4" rx=".5"/>
    <path class="muted dotted" d="M18 37h14"/>
    <path class="teal" d="M38 19v15m-2.5-2.5L38 34l2.5-2.5"/>`,

  // The booking list: free rooms for a small group get a star, the rest fade
  'webuntis-raeume': `
    <rect class="paper" x="4" y="6" width="40" height="36" rx="2"/>
    <rect class="wash" x="5" y="31" width="38" height="10" stroke="none"/>
    <path class="muted" d="M4 18h40M4 30h40"/>
    <g class="solid orange">
      <path transform="translate(11 12)" d="M0-3.6.88-1.21 3.42-1.11 1.43.46 2.12 2.91 0 1.5-2.12 2.91-1.43.46-3.42-1.11-.88-1.21Z"/>
      <path transform="translate(11 24)" d="M0-3.6.88-1.21 3.42-1.11 1.43.46 2.12 2.91 0 1.5-2.12 2.91-1.43.46-3.42-1.11-.88-1.21Z"/>
    </g>
    <path d="M19 12h18M19 24h14"/>
    <path class="muted" d="M19 36h16"/>`,

  // Several exams, each with its own clock
  timers: `
    <path d="M14 6V4M12 3h4M34 6V4M32 3h4M24 24v-2M22 21h4"/>
    <circle class="muted" cx="14" cy="14" r="7"/>
    <path class="blue" d="M14 7a7 7 0 1 1-7 7"/>
    <circle class="muted" cx="34" cy="14" r="7"/>
    <path class="orange" d="M34 7a7 7 0 0 1 2.16 13.66"/>
    <circle class="muted" cx="24" cy="32" r="7"/>
    <path class="blue" d="M24 25a7 7 0 0 1 6.66 4.84"/>`,

  // The NPC answers, the game master checks before the learner sees it
  'dual-llm': `
    <path class="paper magenta" d="M3 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-4 4v-4a2 2 0 0 1-2-2z"/>
    <path class="magenta" d="M7 9h8M7 12h5"/>
    <path class="paper" d="M24 16l7 3v6c0 5-3 8-7 10-4-2-7-5-7-10v-6z"/>
    <path class="blue" d="M20.5 26l2.5 2.5 4.5-5"/>
    <path class="paper blue" d="M45 31a2 2 0 0 0-2-2H31a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8l4 4v-4a2 2 0 0 0 2-2z"/>
    <path class="blue" d="M33 34h8M33 37h5"/>`,

  // A prompt becomes code, the mission plays in space
  'coode-vibes': `
    <rect class="paper" x="17" y="4" width="27" height="22" rx="2"/>
    <path d="M17 9h27"/>
    <path class="blue" d="M21 14h6M24 18h10M21 22h5"/>
    <path class="muted" d="M29 14h8"/>
    <path class="paper" d="M4 26a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-9l-4 4v-4H6a2 2 0 0 1-2-2z"/>
    <path class="solid magenta" d="M13 26.5q.5 2.5 3 3-2.5.5-3 3-.5-2.5-3-3 2.5-.5 3-3z"/>
    <ellipse class="muted" cx="37" cy="38" rx="8.5" ry="2.5" transform="rotate(-20 37 38)"/>
    <circle class="wash" cx="37" cy="38" r="4.5"/>
    <path class="muted" transform="rotate(-20 37 38)" d="M28.5 38a8.5 2.5 0 0 0 17 0"/>`,

  // One download, a machine with everything already installed
  vm: `
    <path class="blue" d="M24 3v11m-4-4 4 4 4-4"/>
    <rect class="paper" x="5" y="17" width="38" height="26" rx="2"/>
    <path d="M5 22h38"/>
    <g class="tint orange">
      <rect x="10" y="26" width="7" height="5" rx="1"/><rect x="20.5" y="26" width="7" height="5" rx="1"/><rect x="31" y="26" width="7" height="5" rx="1"/>
      <rect x="10" y="34" width="7" height="5" rx="1"/><rect x="20.5" y="34" width="7" height="5" rx="1"/><rect x="31" y="34" width="7" height="5" rx="1"/>
    </g>`,

  // Halving the address space: /24 → /25 → /26
  subnetting: `
    <rect class="wash" x="4" y="6" width="40" height="7" rx="1"/>
    <path class="blue" d="M24 13l-11 7M13 27l5.5 7"/>
    <path class="muted" d="M24 13l11 7M13 27l-5.5 7M35 27l-5.5 7M35 27l5.5 7"/>
    <rect class="blue" x="4" y="20" width="18" height="7" rx="1"/>
    <rect class="muted" x="26" y="20" width="18" height="7" rx="1"/>
    <rect class="muted" x="4" y="34" width="7" height="7" rx="1"/>
    <rect class="solid blue" x="15" y="34" width="7" height="7" rx="1"/>
    <rect class="muted" x="26" y="34" width="7" height="7" rx="1"/>
    <rect class="muted" x="37" y="34" width="7" height="7" rx="1"/>`,

  // A rule decides, the path taken leads to the result
  berufsschulpflicht: `
    <path class="paper" d="M24 4l9 9-9 9-9-9z"/>
    <path class="teal" d="M15 13H9v15"/>
    <path class="muted" d="M33 13h6v15"/>
    <rect class="teal" x="3" y="29" width="12" height="12" rx="2"/>
    <path class="teal" d="M6 35l2.5 2.5L12 32.5"/>
    <rect class="muted" x="33" y="29" width="12" height="12" rx="2"/>
    <path class="muted" d="M36.5 32.5l5 5m0-5-5 5"/>`,

  // The IHK key as a step function: look up points, read off the grade
  notenrechner: `
    <path d="M7 5v36h37"/>
    <path class="blue" d="M7 38h11v-6h7.5v-6H32v-6h5v-6h4V8h3"/>
    <path class="orange dotted" d="M29 41V26H7"/>
    <circle class="solid orange" cx="29" cy="26" r="1"/>`,

  // Evil twin: two Wi-Fi networks that look alike, the same PDF by name —
  // but behind the twin, half the class gets different content
  diffiefellows: `
    <path d="M4.51 9.51a12 12 0 0 1 16.98 0M7.34 12.34a8 8 0 0 1 11.32 0M10.17 15.17a4 4 0 0 1 5.66 0"/>
    <circle class="solid" cx="13" cy="18" r="1"/>
    <g class="magenta">
      <path d="M26.51 9.51a12 12 0 0 1 16.98 0M29.34 12.34a8 8 0 0 1 11.32 0M32.17 15.17a4 4 0 0 1 5.66 0"/>
      <circle class="solid" cx="35" cy="18" r="1"/>
    </g>
    <path class="paper" d="M6 26a2 2 0 0 1 2-2h7l5 5v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/>
    <path d="M15 24v5h5M9 31h4"/>
    <path class="muted" d="M9 35h8M9 39h6"/>
    <path class="paper" d="M28 26a2 2 0 0 1 2-2h7l5 5v12a2 2 0 0 1-2 2H30a2 2 0 0 1-2-2z"/>
    <path d="M37 24v5h5M31 31h4"/>
    <path class="magenta" d="M31 35h8M31 39h6"/>`,

  // Commits in time, grouped into work sessions, summed up
  'work-tracker': `
    <path class="muted" d="M3 12h42"/>
    <g class="solid">
      <circle cx="6" cy="12" r=".5"/><circle cx="10" cy="12" r=".5"/><circle cx="14" cy="12" r=".5"/><circle cx="18" cy="12" r=".5"/>
      <circle cx="27" cy="12" r=".5"/><circle cx="31" cy="12" r=".5"/>
      <circle cx="38.5" cy="12" r=".5"/><circle cx="42" cy="12" r=".5"/>
    </g>
    <g class="tint teal">
      <rect x="4" y="18" width="16" height="5" rx="1"/><rect x="25" y="18" width="8" height="5" rx="1"/><rect x="36.5" y="18" width="7.5" height="5" rx="1"/>
    </g>
    <path class="muted" d="M24 27v4m-2-2 2 2 2-2"/>
    <circle cx="8.5" cy="38" r="4.5"/>
    <path d="M8.5 35.5V38l1.8 1.8"/>
    <rect class="solid teal" x="16" y="36" width="28" height="4" rx="1"/>`
};
