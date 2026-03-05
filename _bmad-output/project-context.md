---
project_name: 'ApresentacaoAI'
user_name: 'Giuliano'
date: '2026-03-04'
sections_completed:
  - technology_stack
  - language_rules
  - framework_rules
  - testing_rules
  - quality_rules
  - workflow_rules
  - critical_rules
status: 'complete'
optimized_for_llm: true
---

# Project Context for AI Agents

_Regras críticas para agentes IA implementando código neste projeto. Foco em detalhes não-óbvios que agentes podem errar._

---

## Technology Stack & Versions

- **Runtime:** Node.js 22 LTS
- **Build:** Vite 6.x
- **Framework:** React 19.x
- **Language:** TypeScript 5.x (strict mode)
- **Styling:** Tailwind CSS 4.x (engine Oxide, configuração via `@theme` em CSS)
- **Animations:** Framer Motion 12.x
- **Testing:** Vitest + @testing-library/react
- **Navegação:** Estado interno (sem router) — índice de tópico em context
- **Deploy:** Estático (dist/) — compatível com Vercel, Netlify, GitHub Pages

---

## Critical Implementation Rules

### TypeScript Rules

- Strict mode habilitado — sem `any` explícito, sem `@ts-ignore`
- Usar `interface` para props de componentes, `type` para unions/utilities
- Path alias: `@/` → `src/` (configurado no tsconfig e vite)
- Importações com extensão omitida (Vite resolve automaticamente)
- Sem barrel exports (`index.ts`) — importações diretas para tree-shaking limpo
- Preferir `const` + arrow functions para componentes: `const Topic1 = () => {}`
- Enums proibidos — usar `as const` objects ou union types

### React & Component Rules

- Um componente por arquivo — nome do arquivo = nome do componente (PascalCase)
- Cada tópico é um componente: `Topic1.tsx`, `Topic2.tsx`, ... `Topic16.tsx`
- Componentes visuais reutilizáveis em `src/components/ui/`
- Props tipadas com `interface` no mesmo arquivo do componente
- Sem prop drilling profundo — usar composition pattern ou context quando necessário
- Estado da apresentação (tópico atual, direção) em um único context: `PresentationContext`
- Sem useEffect para lógica de negócio — useEffect apenas para side effects reais (listeners, resize)

### Framer Motion Rules

- Variantes de animação definidas como objetos `const` fora do componente
- Usar `motion.div` com `initial`, `animate`, `exit` — sem animações imperativas
- Transições entre tópicos: `AnimatePresence` com `mode="wait"`
- Animações de entrada dos elementos internos: stagger com `variants` parent/child
- Duração padrão: `0.3s` para UI, `0.6s` para transições de tópico, `1.2s` para efeitos dramáticos
- Easing padrão: `[0.25, 0.1, 0.25, 1]` (ease-out suave)

### Tailwind CSS 4 Rules

- Usar classes utilitárias Tailwind — CSS custom apenas quando Tailwind não cobre
- Tema Matrix/tech: palette baseada em verde (#00ff41, #0d1117, #161b22) definida no CSS theme
- Usar `@theme` do Tailwind 4 para tokens customizados (não `tailwind.config.js`)
- Responsivo: mobile-first, breakpoints `sm`, `md`, `lg` — apresentação deve funcionar em projetor (lg) e tablet (md)

### Testing Rules

- Testes em `src/__tests__/` ou co-located `ComponentName.test.tsx`
- Foco em testes de componente com `@testing-library/react`
- Não testar estilização — testar lógica de navegação, transições de estado, interatividade
- Testes de snapshot apenas para componentes UI base (não para tópicos inteiros)
- Coverage não é prioridade — priorizar que navegação e interatividade funcionem

### Code Quality & Style

- Sem console.log em código commitado (exceto dev mode)
- Sem magic numbers — extrair para constantes nomeadas
- Componentes UI genéricos não devem conter conteúdo de tópicos específicos
- Conteúdo textual dos tópicos separado dos componentes visuais (em `src/data/`)

---

## Project Structure

```
src/
  components/
    topics/          # Topic1.tsx ... Topic16.tsx
    ui/              # AnimatedCounter, Card, FlipCard, DataTable, etc.
    layout/          # Navigation, ProgressBar, MatrixBackground
  contexts/
    PresentationContext.tsx
  hooks/             # useKeyboardNavigation, useAnimationSequence, etc.
  data/              # Conteúdo dos tópicos como objetos TS (métricas, textos)
  styles/            # CSS global, theme tokens Tailwind (@theme)
  types.ts           # Tipos compartilhados
  App.tsx
  main.tsx
```

### Naming Conventions

- Componentes: `PascalCase.tsx` (ex: `AnimatedCounter.tsx`)
- Hooks: `camelCase.ts` com prefixo `use` (ex: `useKeyboardNavigation.ts`)
- Dados/constantes: `camelCase.ts` (ex: `topicData.ts`)
- Tipos compartilhados: `types.ts` na raiz de `src/`
- CSS: `kebab-case.css`

---

## Development Workflow

- Branch principal: `main`
- Dev server: `npm run dev` (Vite)
- Build: `npm run build` → output em `dist/`
- Deploy: estático (qualquer CDN/hosting)

---

## Critical Don't-Miss Rules

### Conteúdo

- Todo texto visível na apresentação em **PT-BR**
- Termos técnicos mantidos em inglês: context rot, spec-driven, pipeline, vibe coding, etc.
- Cada tópico referencia `docs/topicos/topicN.md` como fonte da verdade para conteúdo
- **NUNCA inventar métricas** — usar apenas dados de `docs/banco-metricas.md` ou das fontes nos tópicos

### Visual / Matrix Theme

- Background escuro obrigatório (#0d1117 ou mais escuro)
- Verde Matrix (#00ff41) como cor de destaque primária
- Efeito "chuva de código Matrix" sutil no background — NÃO deve competir com o conteúdo
- Efeito de glow/neon nos elementos de destaque
- Tipografia monospace para dados/métricas, sans-serif para corpo de texto

### Performance

- Animações com `will-change` e `transform` apenas — nunca animar `width`, `height`, `top`, `left`
- Lazy load dos componentes de tópico com `React.lazy` + `Suspense`
- Imagens (se houver) em WebP, max 200KB cada
- Efeito Matrix no background deve usar `requestAnimationFrame`, não `setInterval`

### Navegação

- Setas ← → para navegar entre tópicos
- Barra de espaço avança para próximo tópico
- Escape mostra/esconde overview de todos os tópicos
- Indicador de progresso visível (barra ou dots)
- Número do tópico atual / total visível discretamente

### Ferramentas — NUNCA Misturar

- **Spec-Kit** = regras e specs como constituição (projetos individuais/times pequenos)
- **GSD** = reset de contexto por tarefa (dev solo, velocidade com qualidade)
- **BMAD** = multi-agente ágil (projetos complexos, coordenação)
- São ferramentas DISTINTAS com filosofias próprias — nunca confundir ou misturar

---

## Usage Guidelines

**Para Agentes IA:**

- Ler este arquivo antes de implementar qualquer código
- Seguir TODAS as regras exatamente como documentado
- Em caso de dúvida, preferir a opção mais restritiva
- Referenciar `docs/topicos/topicN.md` para conteúdo de cada tópico

**Para Humanos:**

- Manter este arquivo enxuto e focado nas necessidades dos agentes
- Atualizar quando a stack tecnológica mudar
- Remover regras que se tornem óbvias com o tempo

Last Updated: 2026-03-04
