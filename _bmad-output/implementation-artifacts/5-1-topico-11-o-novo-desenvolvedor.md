# Story 5.1: Tópico 11 — O Novo Desenvolvedor

Status: review

## Story

As a audiência,  
I want ver o Tópico 11 reposicionando o papel do desenvolvedor na era da IA,  
so that eu entenda que a IA não substitui o dev, mas amplifica quem usa método.

## Acceptance Criteria

1. **Given** que o apresentador navega até o Tópico 11 **When** o tópico entra em foco **Then** `Topic11.tsx` é renderizado com o reposicionamento do papel do desenvolvedor.
2. **Given** o Tópico 11 renderizado **When** visualizado em projetor **Then** o conteúdo vem de `src/data/topic11Data.ts` e permanece legível.
3. **Given** as animações de entrada **When** o tópico estabiliza **Then** os elementos entram com delay escalonado ≥ 0.4s.
4. **Given** o Tópico 11 **When** finalizado **Then** inclui Página 2 com notas do narrador focadas no reposicionamento de papel.

## Tasks / Subtasks

- [x] Task 1: Criar `src/data/topic11Data.ts` com conteúdo consolidado (AC: #2, #4)
  - [x] 1.1 Definir interface `Topic11Data` com seções para: hero (escada Codeforces), transição Coder → Conductor → Orchestrator, responsabilidades do novo papel, métricas e notas do narrador.
  - [x] 1.2 Estruturar métricas com fontes e contexto executivo (ex.: rating 2727 / percentil 99,8; 57% workflows multi-agente), mantendo texto em PT-BR.
  - [x] 1.3 Exportar labels de acessibilidade e strings de UI (eyebrows, títulos de bloco e título do terminal de notas).
- [x] Task 2: Implementar `src/components/topics/Topic11.tsx` (AC: #1, #3, #4)
  - [x] 2.1 Substituir placeholder por layout completo usando `TopicReveal` + `TopicRevealItem` + `NarratorToggle`.
  - [x] 2.2 Página 1: renderizar narrativa “dev como orquestrador” com blocos visuais distintos (hero Codeforces, transição de papéis e responsibilities board), alimentados exclusivamente por `topic11Data`.
  - [x] 2.3 Página 2: renderizar notas via `MatrixTerminal` com linhas derivadas de `narratorNotes`.
  - [x] 2.4 Garantir legibilidade em projetor (desktop) sem overflow estrutural e mantendo contraste do tema Matrix.
  - [x] 2.5 Manter animações com stagger ≥ 0.4s (padrão `TopicReveal`), respeitando reduced motion.
- [x] Task 3: Criar testes em `src/__tests__/topic11.test.tsx` (AC: #1-#4)
  - [x] 3.1 Validar render do título/subtítulo com dados vindos de `topic11Data`.
  - [x] 3.2 Validar presença dos blocos-chave do tópico (hero, transição e responsabilidades).
  - [x] 3.3 Validar toggle de páginas (Conteúdo ↔ Notas) com renderização de `MatrixTerminal`.
  - [x] 3.4 Validar que os dados exibidos são oriundos de `src/data/topic11Data.ts`.
- [x] Task 4: Gates de qualidade
  - [x] 4.1 Executar `npm test` com suíte verde.
  - [x] 4.2 Executar `npm run build` sem erros.
  - [x] 4.3 Confirmar lazy-load do tópico preservado no build final.

## Dev Notes

### Developer Context Section
- Este tópico abre o Epic 5 e marca a transição narrativa de “ferramentas” para “novo papel profissional”.
- O foco não é escrever mais código; é mostrar mudança de responsabilidade: especificação, orquestração e validação.
- O padrão de duas páginas (conteúdo + notas) deve seguir a convenção consolidada nas stories 4.x para manter consistência da apresentação ao vivo.

### Technical Requirements
- Usar componentes já existentes: `TopicReveal`, `NarratorToggle`, `MatrixTerminal`, `NeonCard`, `GlowDivider` e/ou `AnimatedCounter` quando apropriado para métricas.
- Manter conteúdo textual desacoplado em `src/data/topic11Data.ts`; o componente deve apenas consumir dados.
- Preservar linguagem PT-BR e termos técnicos em inglês quando aplicável (ex.: orchestration, workflow multi-agent).

### Architecture Compliance
- Seguir estrutura do projeto: UI em `src/components/topics/`, dados em `src/data/`, testes em `src/__tests__/`.
- Não adicionar dependências novas; usar stack atual React 19 + TypeScript strict + Tailwind 4 + Framer Motion 12.
- Não alterar navegação global nem contratos de `PresentationContext`; isolamento de interações locais é obrigatório.

### Library / Framework Requirements
- React 19.x
- TypeScript 5.x (strict)
- Tailwind CSS 4.x
- Framer Motion 12.x
- Vitest + Testing Library

### File Structure Requirements
- Criar: `src/data/topic11Data.ts`
- Atualizar: `src/components/topics/Topic11.tsx`
- Criar: `src/__tests__/topic11.test.tsx`

### Testing Requirements
- Cobrir renderização da página de conteúdo e da página de notas.
- Cobrir origem dos dados (topic11Data como fonte única).
- Cobrir acessibilidade básica (elementos chave localizáveis por texto/aria-label).
- Validar regressão com `npm test` e `npm run build`.

### Project Context Reference
- `C:\Projects\ApresentacaoAI\_bmad-output\planning-artifacts\epics.md` (Epic 5 / Story 5.1)  
- `C:\Projects\ApresentacaoAI\docs\topicos\topic11.md`  
- `C:\Projects\ApresentacaoAI\_bmad-output\project-context.md`  
- `C:\Projects\ApresentacaoAI\_bmad-output\planning-artifacts\design-system.md`  
- Referência de padrão de story/contexto: stories 4.x em `C:\Projects\ApresentacaoAI\_bmad-output\implementation-artifacts\4-*.md`

## Dev Agent Record

### Agent Model Used
- claude-sonnet-4-6

### Debug Log References
- Build falhou inicialmente com TS2322: NeonCard não aceita variant `"default"` — corrigido para `"danger"` (before panel e stages inativos).

### Completion Notes List
- Criado `src/data/topic11Data.ts` com interface completa: escada Codeforces (4 modelos), 3 estágios de transição, responsabilidades before/after, métricas orquestração (57%) e 5 notas do narrador.
- `Topic11.tsx` substituiu o placeholder com layout de 2 páginas seguindo padrão Topic9/Topic10: tabela Codeforces animada, 3 NeonCards de transição, before/after, AnimatedCounter para 57%, MatrixTerminal para notas.
- 9 testes criados cobrindo: estrutura de dados, tabela Codeforces, estágios, toggle de páginas, dado de orquestração e fonte única de dados.
- 204/204 testes passaram (zero regressões). Build limpo com lazy chunk `Topic11-DmkT1Hlx.js` (10.82 kB).

### File List
- `src/data/topic11Data.ts` (novo)
- `src/components/topics/Topic11.tsx` (atualizado — substituiu placeholder)
- `src/__tests__/topic11.test.tsx` (novo)
- `_bmad-output/implementation-artifacts/5-1-topico-11-o-novo-desenvolvedor.md` (atualizado)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (atualizado)

## Change Log

- 2026-03-08: Story criada em modo não-interativo (YOLO) com status `ready-for-dev`, ACs consolidados e contexto técnico completo para implementação.
- 2026-03-09: Implementação completa. Todos os ACs satisfeitos. Status → review.
