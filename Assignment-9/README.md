# Daybase — Productivity Dashboard

Daybase is a single-page productivity dashboard that brings the small tools a person leans on throughout a workday — tasks, schedule, focus time, goals, motivation, and weather — into one calm, unified screen.

Rather than juggling separate apps and tabs, everything lives behind one set of tiles. Open a tool, do the thing, and step back to the board.

## What it does

**Dashboard Navigation**
The home screen. Six tiles, one per feature, each opening into a focused full-screen view with its own back action. Only one feature is ever open at a time.

**Todo List**
Add tasks, star the important ones, mark items complete, and delete what's done. Everything is saved automatically and reloads exactly as you left it.

**Daily Planner**
A 24-hour view of the day, one row per hour. Type a note into any slot to plan your time; the current hour is highlighted automatically as the day moves forward.

**Daily Goals**
A short list of what matters most today, with a live progress bar showing how many goals are complete out of the total.

**Pomodoro Timer**
A focus timer with Work, Short Break, and Long Break sessions, each with its own duration and accent color. A circular ring traces the session visually as it counts down, and a soft chime marks the end of a session.

**Motivation Quote**
A rotating quote fetched live from a public quotes API, with a graceful fallback if the request fails, so the card is never left blank.

**Weather**
Live conditions — temperature, feels-like, humidity, wind, and precipitation — for your current location (with a sensible fallback city if location access is declined).

**Date & Time**
A quietly updating clock and date in the header, always visible regardless of which feature is open.

**Dynamic Background**
An ambient backdrop that shifts in tone across morning, afternoon, evening, and night, paired with a greeting on the dashboard that changes with the time of day.

**Theme Switch**
A light and dark mode, toggled from the header, remembered across visits with no flash of the wrong theme on reload.

## Design approach

Daybase is built around a control-room feel: a deep slate surface at night, a warm paper surface in daylight, and a distinct accent color per feature — teal for tasks, amber for planning, violet for goals, coral for focus, sky blue for weather — so each tool has its own identity at a glance. Typography pairs Space Grotesk for headings with Inter for body text and JetBrains Mono for anything numeric, like the clock and timer. Motion is deliberate and restrained: a slow-drifting ambient gradient, a soft entrance for the dashboard tiles, and a progress ring that eases as it moves — nothing that overstays its welcome, and all of it disabled automatically for anyone with reduced-motion preferences turned on.

## How data is handled

Everything you enter — tasks, planner notes, goals, and your theme choice — stays in your browser's local storage. Nothing is sent to a server except two outbound requests: one to fetch a motivation quote, and one to fetch current weather conditions for your location.

## Built with

- HTML5 and CSS3, using custom properties for theming — no CSS framework
- Vanilla JavaScript (no build tools or libraries)
- The Web Storage, Fetch, Geolocation, and Web Audio browser APIs
- Open-Meteo for weather data
- Quotable for motivation quotes
- Google Fonts (Space Grotesk, Inter, JetBrains Mono)

## Project contents

| File | Purpose |
|---|---|
| `index.html` | Page structure — the dashboard and every feature view |
| `style.css` | All visual styling, theming, and layout |
| `script.js` | All application logic — navigation, storage, timers, and API calls |