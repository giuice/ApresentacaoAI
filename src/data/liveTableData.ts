import type { TableColumn, TableRow } from '@/components/ui/LiveTable';

export const comparisonColumns: TableColumn[] = [
  { key: 'specKit', label: 'Spec-Kit' },
  { key: 'gsd', label: 'GSD' },
  { key: 'bmad', label: 'BMAD' },
];

export const comparisonRows: TableRow[] = [
  {
    label: 'Complexidade alvo',
    cells: {
      specKit: { text: 'Baixa a média', highlight: 'high' },
      gsd: { text: 'Média a alta', highlight: 'high' },
      bmad: { text: 'Alta + coordenação multi-agente', highlight: 'high' },
    },
  },
  {
    label: 'Agentes / Papéis',
    cells: {
      specKit: { text: '1 agente guiado por spec', tooltip: 'Foco em especificação clara para um único agente executar' },
      gsd: { text: '1 agente com workflow disciplinado', tooltip: 'Pipeline sequencial: pesquisa → spec → código → validação' },
      bmad: { text: '9+ agentes especializados', highlight: 'high', tooltip: 'PM, Architect, Dev, QA, SM, UX, Analyst, Tech Writer, BMad Master' },
    },
  },
  {
    label: 'Output principal',
    cells: {
      specKit: { text: 'Spec estruturada + código', highlight: 'medium' },
      gsd: { text: 'Código validado + contexto vivo', highlight: 'medium' },
      bmad: { text: 'Artefatos completos de projeto', highlight: 'high', tooltip: 'PRD, Arquitetura, UX, Épicos, Stories, Código, Testes, Docs' },
    },
  },
  {
    label: 'Curva de adoção',
    cells: {
      specKit: { text: 'Rápida (~1h)', highlight: 'high' },
      gsd: { text: 'Moderada (~1 dia)' },
      bmad: { text: 'Mais íngreme, maior retorno em escala', tooltip: 'Investimento inicial maior, mas retorno exponencial em projetos complexos' },
    },
  },
  {
    label: 'Caso ideal',
    cells: {
      specKit: { text: 'Produto com escopo claro' },
      gsd: { text: 'Entrega contínua com contexto vivo' },
      bmad: { text: 'Múltiplos fluxos simultâneos', highlight: 'high' },
    },
  },
];

export const adoptionSignals: TableColumn[] = [
  { key: 'signal', label: 'Sinal de Adoção' },
  { key: 'specKit', label: 'Spec-Kit' },
  { key: 'gsd', label: 'GSD' },
  { key: 'bmad', label: 'BMAD' },
];

export const adoptionRows: TableRow[] = [
  {
    label: 'Requisitos vagos causam retrabalho',
    cells: {
      signal: { text: '→' },
      specKit: { text: '✓ Adote primeiro', highlight: 'high' },
      gsd: { text: 'Complementar' },
      bmad: { text: 'Não necessário ainda' },
    },
  },
  {
    label: 'IA perde contexto no meio do projeto',
    cells: {
      signal: { text: '→' },
      specKit: { text: 'Ajuda parcialmente' },
      gsd: { text: '✓ Resolve direto', highlight: 'high' },
      bmad: { text: 'Resolve via agentes' },
    },
  },
  {
    label: 'Coordenação de múltiplos fluxos',
    cells: {
      signal: { text: '→' },
      specKit: { text: 'Insuficiente' },
      gsd: { text: 'Parcial' },
      bmad: { text: '✓ Especialidade', highlight: 'high' },
    },
  },
];
