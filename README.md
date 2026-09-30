# Tally

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=20232A)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![PGlite](https://img.shields.io/badge/Database-PGlite-336791?logo=postgresql&logoColor=white)](https://pglite.dev/)

Tally is a streamer-focused scenario builder. It lets a streamer create structured random-event experiences that can later be used during a live stream, such as a Minecraft event deck.

## Core idea

The application organizes content into a simple hierarchy:

```text
Menu
└── Scenario
		└── Branch
				└── Option
```

- A **menu** is the main collection from which the streamer selects a scenario.
- A **scenario** is a complete event set, such as `Random Events`.
- A **branch** is an event that can be selected within a scenario.
- An **option** is a further choice connected to a branch.

Branches do not require options. A branch without options can be a terminal event selected directly by the first randomizer. A branch with options can lead to another selection step.

## Current state

The database schema and initialization flow are in place for menus, scenarios, branches, and options. The randomizer itself is planned but is not implemented yet.

Data is stored locally in the browser using [PGlite](https://pglite.dev/), with a PostgreSQL-compatible schema.

## Getting started

```bash
npm install
npm run dev
```

Useful project commands:

```bash
npm run build
npm run lint
```

## Project structure

```text
db/
	functions/       Database access functions
	schema/          Menu and scenario schema
src/
	components/      Reusable React components
	services/        Client-side services and validation
	App.jsx          Main application view
```

## Roadmap

- Build the menu and scenario selection experience.
- Add scenario, branch, and option creation workflows.
- Implement random branch selection.
- Continue selection through branch options when they exist.
- Connect the experience to streamer-facing live controls.
