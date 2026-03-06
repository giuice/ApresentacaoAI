# Design System Reference - ApresentacaoAI

**Status:** Aprovado
**Data:** 2026-03-05
**Autor:** Giuliano
**Demo Visual:** `/demo-ux-components.html` (abrir no browser para referencia visual)

> Este documento e a referencia definitiva de tokens, componentes e regras visuais.
> O dev agent DEVE consumir este documento ao implementar qualquer story do Epic 2+.

---

## 1. Tema e Paleta de Cores

### Tema Padrao: Matrix Neon

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg-deep` | `#000000` | Background principal (body) |
| `--color-bg-surface` | `#0A0A0A` | Superficies elevadas (headers, areas secundarias) |
| `--color-bg-card` | `#0D1117` | Background de cards e containers |
| `--color-bg-card-hover` | `#161B22` | Card em hover |
| `--color-accent-primary` | `#00FF41` | Accent principal (solucao, sucesso, SDD, BMAD) |
| `--color-accent-primary-dim` | `#00CC33` | Accent primario suavizado (bordas ativas) |
| `--color-accent-danger` | `#FF003C` | Accent de perigo (problema, Vibe Coding, erros) |
| `--color-accent-danger-dim` | `#CC0030` | Danger suavizado (bordas) |
| `--color-accent-warning` | `#FFB800` | Destaque de keywords/avisos |
| `--color-text-primary` | `#F3F4F6` | Texto principal sobre fundo escuro |
| `--color-text-secondary` | `#9CA3AF` | Texto secundario (descricoes, labels) |
| `--color-text-muted` | `#4B5563` | Texto apagado (metadados, bordas passivas) |
| `--color-border-subtle` | `#1F2937` | Bordas sutis de cards e divisores |

### Glow Effects (box-shadow / text-shadow)

| Token | Valor |
|-------|-------|
| `--glow-primary` | `rgba(0, 255, 65, 0.15)` |
| `--glow-primary-strong` | `rgba(0, 255, 65, 0.35)` |
| `--glow-danger` | `rgba(255, 0, 60, 0.15)` |
| `--glow-danger-strong` | `rgba(255, 0, 60, 0.35)` |

### Uso de glow em CSS:

```css
/* Box glow em hover de cards */
box-shadow: 0 8px 32px var(--glow-primary);

/* Text glow para metricas de destaque */
text-shadow: 0 0 10px var(--glow-primary-strong), 0 0 40px var(--glow-primary);
```

---

## 2. Tipografia

| Papel | Fonte | Fallback | Uso |
|-------|-------|----------|-----|
| **Mono** (dados/tech) | `JetBrains Mono` | `Fira Code`, `monospace` | Titulos, metricas (88%, +55%), terminal, codigo |
| **Sans** (leitura) | `Inter` | `system-ui`, `sans-serif` | Corpo de texto, descricoes, paragrafos |

### Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Escala Tipografica (Desktop/Projetor)

| Elemento | Classe Tailwind | Fonte |
|----------|----------------|-------|
| Metrica gigante (88%) | `text-8xl` a `text-9xl` | Mono, weight 700 |
| Titulo de topico | `text-5xl` a `text-6xl` | Mono, weight 700 |
| Subtitulo | `text-xl` a `text-2xl` | Sans, weight 500 |
| Corpo | `text-base` a `text-lg` | Sans, weight 400 |
| Label/tag | `text-xs` a `text-sm` | Mono, weight 400 |
| Metadado/muted | `text-xs` | Mono, weight 300 |

---

## 3. Espacamento e Layout

- **Layout base:** `min-h-screen` com flex centering (`flex items-center justify-center`)
- **Densidade:** Airy/Spacious - muito espaco de respiro entre elementos
- **Gaps padrao:** `gap-8` a `gap-16` entre secoes; `gap-4` a `gap-6` entre elementos internos
- **Max-width conteudo:** `max-w-5xl` (1024px) a `max-w-7xl` (1280px)
- **Sem alturas fixas em px** — usar `vh`/`vw` e classes relativas
- **Padding de seguranca para projetor:** minimo `p-8` nas areas de conteudo

---

## 4. Componentes UI Aprovados

### 4.1 `<AnimatedCounter />`

**Arquivo:** `src/components/ui/AnimatedCounter.tsx`

| Prop | Tipo | Descricao |
|------|------|-----------|
| `value` | `number` | Valor final (ex: 88) |
| `suffix` | `string` | Sufixo (ex: "%", ".08%") |
| `variant` | `"danger" \| "success"` | Cor: danger=#FF003C, success=#00FF41 |

**Comportamento:**
- Anima de 0 ao `value` com easing cubic (ease-out)
- Delay de **0.4s** apos o topico entrar em foco
- Fonte mono, tamanho `text-8xl`+ com glow text-shadow
- `prefers-reduced-motion`: valor final exibido sem animacao

### 4.2 `<SplitScreen />`

**Arquivo:** `src/components/ui/SplitScreen.tsx`

| Prop | Tipo | Descricao |
|------|------|-----------|
| `leftContent` | `ReactNode` | Lado esquerdo (Problema) |
| `rightContent` | `ReactNode` | Lado direito (Solucao) |

**Comportamento:**
- Grid 2 colunas em desktop (>= 1024px); empilha vertical em mobile
- Esquerda: background com tom vermelho sutil, badge "Vibe Coding"
- Direita: background com tom verde sutil, badge "Spec-Driven"
- **Regra espacial:** Problema SEMPRE a esquerda, Solucao SEMPRE a direita

### 4.3 `<NeonCard />`

**Arquivo:** `src/components/ui/NeonCard.tsx`

| Prop | Tipo | Descricao |
|------|------|-----------|
| `variant` | `"danger" \| "success"` | Cor da borda/glow |
| `children` | `ReactNode` | Conteudo do card |

**Comportamento:**
- Background `--color-bg-card`; borda `--color-border-subtle`
- Hover: translateY(-6px), borda accent, box-shadow glow
- Barra superior de 3px aparece no hover (accent color)
- Border-radius: 16px

### 4.4 `<MatrixTerminal />`

**Arquivo:** `src/components/ui/MatrixTerminal.tsx` (ou integrado no topico)

**Comportamento:**
- Window chrome com 3 dots (red/yellow/green) + tab label
- Body com fonte mono verde sobre fundo escuro
- Linhas aparecem sequencialmente (delay de ~200ms entre linhas)
- Cursor piscando ao final
- Classes de cor: `comment` (muted), `keyword` (warning), `success` (primary), `prompt` (muted)

### 4.5 `<LiveTable />`

**Arquivo:** `src/components/ui/LiveTable.tsx`

**Comportamento:**
- Grid tabular comparativo (Spec-Kit vs GSD vs BMAD)
- Header com accent primary; body rows com hover highlight
- Efeito scanline horizontal animado no hover de cada row
- Tooltips opcionais em celulas
- Totalmente legivel em projetor (sem overflow)

### 4.6 `<DecisionWizard />`

**Arquivo:** `src/components/ui/DecisionWizard.tsx`

**Comportamento:**
- Perguntas sequenciais (A/B/C) com visual de terminal
- Resposta selecionada avanca para proxima pergunta com animacao
- Final: recomendacao + trade-offs + proximo passo
- Teclado: Enter confirma, Esc reinicia (sem interferir com navegacao global)
- Reset ao desmontar

### 4.7 `<CyberProgressBar />`

**Arquivo:** `src/components/layout/ProgressBar.tsx`

**Comportamento:**
- 5 blocos segmentados (Problema, Evolucao, Ferramentas, Novo Papel, Impacto)
- Bloco ativo: fill com accent primary + glow
- Animacao de fill: scaleX com transition 0.5s ease
- Fixo no rodape da apresentacao
- Compacto (height ~8px) com labels opcionais

### 4.8 Glow Dividers

**Comportamento:**
- Linha horizontal com gradient (transparent -> accent -> transparent)
- Blur sutil acima para efeito de glow
- Usado entre secoes para separacao visual

---

## 5. Efeitos e Animacoes

### Matrix Rain Background

**Arquivo:** `src/components/layout/MatrixBackground.tsx`

- Canvas com `requestAnimationFrame`
- **Otimizacoes obrigatorias (performance):**
  - Frame skip (rodar a ~30fps, nao 60)
  - Maximo ~40 streams ativos simultaneos
  - Font size >= 18px (menos colunas)
  - Cache da cor (nao ler CSS a cada frame)
  - Typed arrays (Float32Array) para posicoes
- Cor dos caracteres: `--color-accent-primary`
- Opacity do canvas: 0.5 (sutil, legibilidade primeiro)
- Cancelar RAF no unmount (sem memory leak)

### Scanline Overlay (opcional)

- `repeating-linear-gradient` com linhas de 2px
- Opacity muito baixa (~3%)
- `pointer-events: none`; `position: fixed`

### Transicoes entre Topicos

- Framer Motion `AnimatePresence`
- Direcao: next = slide left, prev = slide right
- Somente `transform: translateX` + `opacity`
- `prefers-reduced-motion`: crossfade simples (opacity only)

### Animacoes de Entrada (Stagger)

- Elementos entram com `opacity: 0 -> 1` e `translateY: 20px -> 0`
- Delay minimo: **0.4s** apos transicao de topico
- Usar `staggerChildren` do Framer Motion (nao setTimeout)
- Variantes definidas FORA do corpo do componente

---

## 6. Regras de Consistencia Visual

### Dicotomia Problema vs Solucao

| Aspecto | Problema | Solucao |
|---------|----------|---------|
| Cor | `--color-accent-danger` (#FF003C) | `--color-accent-primary` (#00FF41) |
| Posicao espacial | Esquerda / Acima | Direita / Abaixo |
| Tom visual | Caos, ruido, urgencia | Estrutura, clareza, ordem |

### Hierarquia de Atencao (por topico)

1. **Metrica principal** (counter gigante) — ocupa centro/destaque
2. **Titulo do topico** — mono, bold, grande
3. **Conteudo explicativo** — sans, medio, secondary color
4. **Metadados/fonte** — mono, pequeno, muted

### Contraste Minimo

- Texto primary (#F3F4F6) sobre bg (#000000) = ratio 18.1:1 (WCAG AAA)
- Accent green (#00FF41) sobre bg (#000000) = ratio 10.5:1 (WCAG AAA)
- Accent red (#FF003C) sobre bg (#000000) = ratio 5.1:1 (WCAG AA)

---

## 7. Mapeamento Componente -> Story

| Componente | Criado na Story | Usado nas Stories |
|------------|-----------------|-------------------|
| Tokens/Tema | **2.1** | Todas subsequentes |
| MatrixBackground | **2.2** | Global (layout) |
| Transicoes (AnimatePresence) | **2.3** | Global (layout) |
| Stagger animations | **2.4** | Todos os topicos |
| AnimatedCounter | **3.1** | 3.3, 3.5, 3.7, 5.2 |
| SplitScreen | **3.2** | 3.7 |
| NeonCard | **3.2** | 4.1-4.4, 5.x |
| LiveTable | **4.5** | 4.7 |
| DecisionWizard | **4.6** | 4.7 |
| MatrixTerminal (typewriter) | **4.3** | 4.3 |
| CyberProgressBar | **1.3** (ja criado) | Global (layout) |

---

## 8. Tokens para Tailwind 4 `@theme` (Story 2.1)

O dev DEVE expandir `src/styles/theme.css` com estes tokens:

```css
@theme {
  /* Backgrounds */
  --color-bg-deep: #000000;
  --color-bg-surface: #0A0A0A;
  --color-bg-card: #0D1117;
  --color-bg-card-hover: #161B22;

  /* Accents */
  --color-accent-primary: #00FF41;
  --color-accent-primary-dim: #00CC33;
  --color-accent-danger: #FF003C;
  --color-accent-danger-dim: #CC0030;
  --color-accent-warning: #FFB800;

  /* Text */
  --color-text-primary: #F3F4F6;
  --color-text-secondary: #9CA3AF;
  --color-text-muted: #4B5563;

  /* Borders */
  --color-border-subtle: #1F2937;

  /* Glows (for arbitrary values) */
  --glow-primary: rgba(0, 255, 65, 0.15);
  --glow-primary-strong: rgba(0, 255, 65, 0.35);
  --glow-danger: rgba(255, 0, 60, 0.15);
  --glow-danger-strong: rgba(255, 0, 60, 0.35);

  /* Typography */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-sans: 'Inter', system-ui, sans-serif;

  /* Transitions */
  --transition-smooth: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-bounce: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

> **Nota:** Os tokens antigos (`--color-matrix-bg`, `--color-matrix-green`, etc.) devem ser substituidos por esta paleta expandida na Story 2.1. Manter retrocompatibilidade com `--color-matrix-green` como alias de `--color-accent-primary` se necessario durante a transicao.
