import type { WizardConfig, WizardRecommendation } from '@/components/ui/DecisionWizard';

export const decisionWizardConfig: WizardConfig = {
  questions: [
    {
      id: 'scope',
      text: 'Qual é o escopo e risco do que você vai construir?',
      options: [
        { label: 'Feature pequena / bug / entrega rápida', value: 'small' },
        { label: 'Feature média / várias partes / precisa de consistência', value: 'medium' },
        { label: 'Produto/plataforma / muitos stakeholders / decisões arquiteturais', value: 'large' },
      ],
    },
    {
      id: 'validation',
      text: 'Você precisa de validação cruzada por papéis?',
      options: [
        { label: 'Não, eu decido e executo', value: 'no' },
        { label: 'Sim, quero PM/Arquiteto/QA como "vozes"', value: 'yes' },
      ],
    },
    {
      id: 'enemy',
      text: 'Seu maior inimigo agora é…',
      options: [
        { label: 'Ambiguidade (o que construir?)', value: 'ambiguity' },
        { label: 'Context rot / degradação em sessão longa', value: 'context-rot' },
        { label: 'Conflito de decisões (API, DB, padrões, responsabilidades)', value: 'conflict' },
      ],
    },
    {
      id: 'overhead',
      text: 'Tolerância a overhead (documentação/processo)?',
      options: [
        { label: 'Baixa (quero velocidade com estrutura mínima)', value: 'low' },
        { label: 'Média (aceito disciplina por fases)', value: 'medium' },
        { label: 'Alta (prefiro governança e rastreabilidade)', value: 'high' },
      ],
    },
  ],

  getRecommendation(answers: Record<string, string>): WizardRecommendation {
    const { scope, validation, enemy, overhead } = answers;

    // BMAD: needs cross-role validation OR conflict + large scope
    if (
      validation === 'yes' ||
      (enemy === 'conflict' && scope === 'large') ||
      (scope === 'large' && overhead === 'high')
    ) {
      return {
        tool: 'BMAD',
        tradeoff: 'Mais cerimônia (PRD/Arquitetura/Stories) em troca de alinhamento e previsibilidade.',
        nextStep: 'Começar pelo /bmad-help para escolher track e iniciar o fluxo.',
      };
    }

    // GSD: context rot OR medium scope with phases
    if (
      enemy === 'context-rot' ||
      (scope === 'medium' && overhead === 'medium') ||
      (scope === 'medium' && enemy !== 'ambiguity')
    ) {
      return {
        tool: 'GSD',
        tradeoff: 'Você compra a disciplina de fases/artefatos (CONTEXT/PLAN/SUMMARY).',
        nextStep: 'Iniciar projeto e rodar o loop por fase (discuss → plan → execute → verify).',
      };
    }

    // Spec-Kit: default for small scope / ambiguity / low overhead
    return {
      tool: 'Spec-Kit',
      tradeoff: 'Você precisa manter o hábito de atualizar spec/plan quando mudar o rumo.',
      nextStep: 'Rodar o fluxo Specify → Plan → Tasks → Implement.',
    };
  },
};
