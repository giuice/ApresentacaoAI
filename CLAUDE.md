# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive presentation app about the evolution from "Vibe Coding" to "Context Engineering" in AI-assisted development. Built as a **React + Tailwind CSS** application with a tech/Matrix visual theme — not a static slide deck. Each topic is an immersive, interactive section (animations, scroll, multimedia).

Three tools are the practical focus: **Spec-Kit**, **BMAD**, and **GSD** — each solves different problems with its own philosophy. Never mix or confuse them.

## Workflow — Research First, Implementation Later

The project follows a strict 3-stage collaborative workflow defined in `AGENTS.md`:

1. **Etapa 1 — Research**: Web search + discuss topic, propose approaches, wait for user approval
2. **Etapa 2 — Consolidation**: Save approved topic as `docs/topicos/topicN.md` with full content, speaker notes, metrics, visual suggestions
3. **Etapa 3 — React Implementation**: Only after all topics are consolidated and user explicitly requests it

**Never generate React components or final code without the topic being discussed and approved first.**

## Key Directories

- `docs/` — Reference documents (metrics bank, tool guides, slide structure)
- `docs/topicos/` — Consolidated approved topics (`topic1.md` through `topic5.md` exist)
- `_bmad/` — BMAD runtime (agents, workflows, config). Load `_bmad/bmm/config.yaml` before any agent activation
- `_bmad-output/` — BMAD output artifacts (planning and implementation)
- `.github/agents/` — BMAD agent definitions for GitHub Copilot
- `.github/prompts/` — BMAD workflow prompts

## Reference Documents

- `docs/estrutura-slides.md` — Detailed topic/block organization
- `docs/banco-metricas.md` — Approved metrics, data, and case studies
- `docs/bmad-guide.md` — BMAD rules and flows
- `docs/github-spec-kit-guide.md` — Spec-Kit methodology
- `docs/gsd-guid.md` — GSD principles and usage

## Design System (Approved)

- **Design System Reference:** `_bmad-output/planning-artifacts/design-system.md` — definitive tokens, colors, typography, components, visual rules. **Dev agents MUST read this before implementing Epic 2+.**
- **Visual Demo:** `demo-ux-components.html` — interactive HTML demo with all approved components
- **UX Spec:** `_bmad-output/planning-artifacts/ux-design-specification.md` — rationale and design journey

## Language and Tone

- Content and speaker notes in **Brazilian Portuguese**
- Technical terms kept in English when no adequate translation exists (context rot, spec-driven, pipeline)
- Technical but accessible tone — concrete data, no empty hype

## Approved Analogies (use each only once)

- Vibe Coding = "Construir uma casa gritando instruções sem planta"
- Spec = "Planta arquitetônica executável"
- Context Rot = "IA com Alzheimer progressivo numa conversa longa"
- BMAD = "Contratar um time completo por US$ 10/hora"

## BMAD Configuration

- **User**: Giuliano
- **Communication Language**: Brazilian Portuguese
- **Output Folder**: `_bmad-output/`
- **Planning Artifacts**: `_bmad-output/planning-artifacts/`
- **Implementation Artifacts**: `_bmad-output/implementation-artifacts/`
- **Project Knowledge**: `docs/`
