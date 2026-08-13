# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`pushgig-ics` is a TypeScript library that generates iCal (.ics) calendar files with timezone support. It has one runtime dependency (luxon) and exposes a single public entry point: `buildCalendar` from `src/index.ts`.

## Commands

- Build: `yarn build` (incremental `tsc -b`, emits to `dist/`)
- Test: `yarn test` (jest via ts-jest)
- Run a single test file: `yarn test src/builder/event.test.ts` (or `yarn test -t "test name"` to filter by name)
- Build + test (what CI runs): `yarn ci`
- Format check / write: `yarn prettier:check` / `yarn prettier:format`

Node version is pinned in `.node-version` (14.17.0). Package manager is yarn (`yarn.lock`).

## Architecture

The code is split into two layers:

- **`src/model/`** — low-level iCal data model. Factory functions (`createCalendar`, `createComponent`, `createProperty`, `createParameter`) each return an object closure with a `toString()` method that serializes to iCal text. A Calendar contains Properties, TimeZones, and Components; a Component (e.g. VEVENT) contains Properties; a Property has a name, a value, and optional Parameters (e.g. `;TZID=...`). `src/model/values/` holds complex property values (datetime, duration, geo) that also serialize via `toString()`. `src/model/raw.ts` wraps a raw pre-serialized iCal string as a component. Property/component name constants (e.g. `DTSTART`, `VEVENT`) live in `property.ts` and `component.ts`.

- **`src/builder/`** — high-level user-facing API on top of the model. `buildCalendar(props)` assembles a Calendar from `CalendarBuilderProps` (name, description, ttl, events, meta); `buildEvent` builds a VEVENT from `EventBuilderProps`. The builder collects the unique `timeZone` ids across events and embeds a matching VTIMEZONE for each.

Key details:

- **Timezones are static raw blocks**, not computed: `src/builder/timezones/america.ts` is a hand-maintained list of `{id, raw}` VTIMEZONE definitions. `getDefaultTimeZone(tzid)` throws if an event references a tzid not in that list — adding support for a new timezone means adding its raw VTIMEZONE block there (and wiring new region files through `timezones/index.ts`).
- **Serialization rules** live in `src/utils/string.ts`: CRLF line separators, line folding at 75 octets (byte-aware for UTF-8), and value escaping. Escaping is applied only to property names listed in `ESCAPED_PROPERTIES` in `src/model/property.ts` — add a name there if its value needs escaping.
- **Dates**: `DateTimeProps` accepts either `local` or `utc` ISO strings. A string of 10 chars or fewer (date-only) becomes a `VALUE=DATE` property; longer strings serialize as date-time. Invalid dates throw from `toString()`, not at creation time.
- **`meta` props** on calendars and events become `X-META-<KEY>` custom properties.

Tests are colocated with source (`*.test.ts` next to each module).
