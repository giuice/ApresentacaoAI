---
title: 'Mobile Navigation + Topic 17 Redesign'
slug: 'mobile-nav-topic17-redesign'
created: '2026-03-09'
status: 'completed'
stepsCompleted: [1, 2, 3, 4, 5, 6]
tech_stack: [React, TypeScript, Tailwind CSS, Framer Motion]
files_to_modify: []
code_patterns: []
test_patterns: []
---

# Tech-Spec: Mobile Navigation + Topic 17 Redesign

**Created:** 2026-03-09

## Overview

### Problem Statement

A apresentação é inacessível pelo celular — a navegação depende 100% de teclado (ArrowRight/Left, Space, Escape) sem nenhum suporte a touch/swipe. Além disso, o Tópico 17 ("Copilot Operacional") apresenta conteúdo técnico denso compactado em cards sem narrativa guiada, tornando impossível para o apresentador explicar os conceitos à plateia de forma inteligível.

### Solution

1. **Mobile Navigation:** Adicionar swipe horizontal para navegar entre tópicos, botões de seta visuais na tela para mobile, e tap no CyberProgressBar para abrir o Overview (substituto do ESC).
2. **Topic 17 Redesign:** Reestruturar como narrativa progressiva com scroll vertical, onde cada seção contextualiza o problema antes de apresentar a solução. Integrar conteúdo do artigo OpenAI sobre Skills como caso real. Público-alvo: devs frontend de todos os níveis.

### Scope

**In Scope:**
- Swipe horizontal (esquerda/direita) para navegar entre tópicos no mobile
- Botões de seta visuais na tela (visíveis apenas em mobile/touch)
- Tap no CyberProgressBar para abrir o Overview no mobile
- Redesign completo do Topic17 com narrativa guiada e scroll vertical
- Integração do conteúdo do artigo OpenAI sobre Skills no Tópico 17
- Público-alvo: devs frontend de todos os níveis

**Out of Scope:**
- Mudanças nos tópicos 1-16
- Mudanças na lógica de roteamento/hash sync
- Novo design system ou tokens visuais
- Versão PWA ou funcionalidades offline

## Context for Development

### Codebase Patterns

- Navegação centralizada em `PresentationContext` com reducer (actions: NEXT, PREV, GOTO, TOGGLE_OVERVIEW)
- Keyboard handling isolado em `useKeyboardNavigation.ts`
- Topic components são lazy-loaded via `topicComponents` record em App.tsx
- Design system definido em `_bmad-output/planning-artifacts/design-system.md`
- Cada tópico exporta dados tipados de arquivo separado (ex: `topic17Data.ts`)

### Files to Reference

| File | Purpose |
| ---- | ------- |

### Technical Decisions

- Apresentador acessará pelo celular durante a apresentação ao vivo
- Tamanho do conteúdo não é problema — scroll vertical é aceitável
- Artigo OpenAI sobre Skills (https://developers.openai.com/blog/skills-agents-sdk) deve ser integrado como caso real no Tópico 17

## Implementation Plan

### Tasks

- [x] Criar hook `useSwipeNavigation` para swipe horizontal entre tópicos
- [x] Criar componente `MobileNavArrows` com botões de seta visuais (mobile only)
- [x] Adicionar `onTap` ao CyberProgressBar para abrir Overview no mobile
- [x] Integrar swipe hook e MobileNavArrows no App/PresentationLayout
- [x] Redesign completo do Topic17 com narrativa progressiva e scroll vertical
- [x] Integrar conteúdo do artigo OpenAI sobre Skills como caso real
- [x] Atualizar testes do Topic17 para nova estrutura
- [x] Adicionar mock de IntersectionObserver no test setup

### Acceptance Criteria

- [x] Swipe horizontal navega entre tópicos no mobile (threshold 50px, ignora vertical > 100px)
- [x] Botões de seta visíveis apenas em mobile (md:hidden), com disabled nos extremos
- [x] Tap no CyberProgressBar abre o Overview (substituto do ESC no mobile)
- [x] Topic17 apresenta narrativa guiada com scroll vertical em seções contextualizadas
- [x] Dados da OpenAI Skills integrados: conceito, progressive disclosure, +44% PRs, filosofia, anti-patterns, skills concretas, AGENTS.md triggers
- [x] Todos os 304 testes passando, build de produção OK

## Additional Context

### Dependencies

- Framer Motion (já instalado) — `whileInView` para animações scroll-triggered
- Nenhuma nova dependência adicionada

### Testing Strategy

- Testes unitários do topic17Data (estrutura, campos obrigatórios)
- Testes de renderização do Topic17 (seções narrativas, skills case study, closing, toggle notas)
- Mock de IntersectionObserver adicionado ao test setup global
- Build de produção verificado com `vite build`

### Notes

**Artigo OpenAI — Dados-chave para integrar:**
- Skills = pacotes de conhecimento operacional (SKILL.md + scripts/ + references/)
- Modelo de progressive disclosure: metadata carrega primeiro, instruções completas só quando selecionado
- Resultados: +44% throughput de PRs (316→457 merged em 3 meses)
- Filosofia: model handles judgment, scripts handle mechanical work
- Anti-patterns: overloading AGENTS.md, encoding shell recipes in prompts, making all skills mandatory
- Skills concretas: code-change-verification, docs-sync, final-release-review, test-coverage-improver
- AGENTS.md com triggers if/then para ativar skills automaticamente

## Review Notes
- Adversarial review completed (13 findings)
- Findings: 13 total, 9 fixed, 4 skipped (low severity / pre-existing)
- Resolution approach: auto-fix
- Fixed: F1 (preventDefault Space), F2 (conditional ARIA attrs), F3 (role conflict), F4 (swipe vs scroll), F5 (stale closure), F6 (aria-disabled), F7 (render antiPatterns), F8 (title text-5xl), F10 (hardcoded "16")
- Skipped: F9 (static module computation - minor), F11 (re-export - pre-existing), F12 (shallow tests - acceptable smoke tests), F13 (mock timing - acceptable for unit tests)
