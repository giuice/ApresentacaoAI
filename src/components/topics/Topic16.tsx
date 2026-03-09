import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { topic16Data } from '@/data/topic16Data';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { NeonCard } from '@/components/ui/NeonCard';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { useShouldReduceMotion } from '@/hooks/useShouldReduceMotion';

const MOTION_EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const LOOP_PHASE_ACCENT: Record<string, string> = {
	specs: 'text-accent-primary',
	generate: 'text-text-muted',
	review: 'text-[#ffb700]',
	human: 'text-accent-primary',
};

const Topic16 = () => {
	const [page, setPage] = useState<'content' | 'notes'>('content');
	const shouldReduceMotion = useShouldReduceMotion();

	const {
		title,
		subtitle,
		paradox,
		riskFindings,
		enterpriseConsensus,
		enterpriseCards,
		loopSteps,
		loopNote,
		finalManifesto,
		narratorNotes,
		labels,
	} = topic16Data;

	// Subtask 2.5 — Montar linhas do terminal para as notas do narrador
	const terminalLines = useMemo<TerminalLine[]>(() => {
		const lines: TerminalLine[] = [{ type: 'comment', text: labels.notesTerminalLead }];
		narratorNotes.forEach((note, index) => {
			lines.push({
				type: 'output',
				text: `${labels.notesLinePrefix} ${index + 1}: ${note}`,
			});
		});
		lines.push({ type: 'comment', text: labels.notesTerminalOutro });
		return lines;
	}, [labels.notesLinePrefix, labels.notesTerminalLead, labels.notesTerminalOutro, narratorNotes]);

	return (
		<TopicReveal className="flex h-full flex-col gap-6 overflow-hidden px-8 py-8">
			{/* Header */}
			<TopicRevealItem className="flex flex-wrap items-start justify-between gap-4">
				<div className="max-w-5xl space-y-2">
					<h2 className="text-5xl font-mono font-bold leading-tight text-accent-primary lg:text-6xl">
						{title}
					</h2>
					<p className="text-sm font-mono text-text-secondary">{subtitle}</p>
				</div>
				<NarratorToggle page={page} onToggle={setPage} accent="success" />
			</TopicRevealItem>

			{page === 'content' ? (
				<TopicRevealItem className="min-h-0 flex-1 overflow-y-auto pr-1">
					<div className="space-y-10 pb-4">

						{/* Subtask 2.2 — Momento 1: O Paradoxo */}
						<section className="space-y-4" aria-label={labels.paradoxEyebrow}>
							<p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.paradoxEyebrow}
							</p>
							<p className="text-xs font-mono text-text-muted">{paradox.eyebrow}</p>

							{/* Dois números grandes lado a lado */}
							<div className="grid grid-cols-2 gap-4">
								{paradox.metrics.map((metric, index) => (
									<motion.div
										key={metric.value}
										initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: shouldReduceMotion ? 0.01 : 0.5,
											delay: shouldReduceMotion ? 0 : index * 0.15,
											ease: MOTION_EASING,
										}}
									>
										<NeonCard
											variant={metric.color === 'positive' ? 'success' : 'danger'}
											className="p-6 text-center"
										>
											<p
												className={`text-5xl font-mono font-bold lg:text-6xl ${
													metric.color === 'positive'
														? 'text-accent-primary'
														: 'text-[#ffb700]'
												}`}
											>
												{metric.value}
											</p>
											<p className="mt-2 text-sm text-text-secondary leading-snug">
												{metric.label}
											</p>
										</NeonCard>
									</motion.div>
								))}
							</div>

							<p className="text-center text-xs font-mono text-text-muted tracking-wider">
								{paradox.subMetrics}
							</p>

							<p className="max-w-4xl text-base text-text-primary lg:text-lg leading-relaxed">
								{paradox.implication}
							</p>
						</section>

						<GlowDivider />

						{/* Subtask 2.3 — Momento 2: Parede de Dados */}
						<section className="space-y-4" aria-label={labels.riskEyebrow}>
							<p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.riskEyebrow}
							</p>

							<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
								{riskFindings.map((finding, index) => (
									<motion.div
										key={finding.text}
										initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: shouldReduceMotion ? 0.01 : 0.35,
											delay: shouldReduceMotion ? 0 : 0.2 + index * 0.08,
											ease: MOTION_EASING,
										}}
										className={`flex items-start gap-2 rounded-lg border px-3 py-2 font-mono text-sm ${
											finding.type === 'alert'
												? 'border-[#ffb700]/30 bg-[#ffb700]/5 text-[#ffb700]'
												: 'border-accent-primary/20 bg-accent-primary/5 text-accent-primary'
										}`}
									>
										<span className="shrink-0 font-bold">
											[{finding.type.toUpperCase()}]
										</span>
										<span>{finding.text}</span>
									</motion.div>
								))}
							</div>
						</section>

						<GlowDivider />

						{/* Subtask 2.3 — Momento 3: Padrão dos Grandes */}
						<section className="space-y-4" aria-label={labels.enterpriseEyebrow}>
							<p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.enterpriseEyebrow}
							</p>

							<div className="space-y-2">
								{enterpriseCards.map((card, index) => (
									<motion.div
										key={card.company}
										initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: shouldReduceMotion ? 0.01 : 0.4,
											delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1,
											ease: MOTION_EASING,
										}}
										className="flex flex-col gap-0.5 rounded-lg border border-border-subtle bg-bg-card/80 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
									>
										<span className="w-24 shrink-0 font-mono text-xs font-bold tracking-[0.15em] text-accent-primary">
											{card.company}
										</span>
										<span className="text-sm font-semibold text-text-primary">
											{card.stat}
										</span>
										<span className="text-xs text-text-muted sm:ml-auto sm:text-right">
											{card.detail}
										</span>
									</motion.div>
								))}
							</div>

							<blockquote className="border-l-2 border-accent-primary/50 pl-4 text-sm italic text-text-primary">
								{enterpriseConsensus}
							</blockquote>
						</section>

						<GlowDivider />

						{/* Subtask 2.4 — Momento 4: Loop Fechado + Manifesto */}
						<section className="space-y-4" aria-label={labels.loopEyebrow}>
							<p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.loopEyebrow}
							</p>

							{/* Diagrama vertical */}
							<div className="max-w-md space-y-1">
								{loopSteps.map((step, index) => (
									<div key={step.phase}>
										<motion.div
											initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												duration: shouldReduceMotion ? 0.01 : 0.4,
												delay: shouldReduceMotion ? 0 : 0.4 + index * 0.12,
												ease: MOTION_EASING,
											}}
											className={`rounded-lg border border-border-subtle bg-bg-card/80 px-4 py-3 ${
												step.phase === 'human'
													? 'border-accent-primary/40 bg-accent-primary/5'
													: ''
											}`}
										>
											<p
												className={`text-xs font-mono font-bold uppercase tracking-wider ${LOOP_PHASE_ACCENT[step.phase]}`}
											>
												{step.label}
											</p>
											{step.items.length > 0 && (
												<p className="mt-0.5 text-xs text-text-muted">
													{step.items.join(' · ')}
												</p>
											)}
											<p className="mt-0.5 text-xs text-text-secondary">{step.note}</p>
										</motion.div>
										{index < loopSteps.length - 1 && (
											<div className="flex items-center justify-center py-0.5 text-text-muted">
												<span className="font-mono text-xs">↓</span>
											</div>
										)}
									</div>
								))}
							</div>

							<p className="text-xs font-mono text-text-muted">{loopNote}</p>
						</section>

						<GlowDivider />

						{/* Manifesto Final */}
						<section className="space-y-4" aria-label={labels.manifestoEyebrow}>
							<p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.manifestoEyebrow}
							</p>

							<div className="space-y-1">
								{finalManifesto.lines.map((line, index) => (
									<motion.p
										key={line}
										className="text-2xl font-mono font-bold text-text-primary lg:text-3xl"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											duration: shouldReduceMotion ? 0.01 : 0.5,
											delay: shouldReduceMotion ? 0 : 0.6 + index * 0.3,
											ease: MOTION_EASING,
										}}
									>
										{line}
									</motion.p>
								))}
							</div>

							<motion.blockquote
								className="border-l-2 border-accent-primary/50 pl-4 text-base italic text-text-primary"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: shouldReduceMotion ? 0.01 : 0.6,
									delay: shouldReduceMotion ? 0 : 1.6,
									ease: MOTION_EASING,
								}}
							>
								{finalManifesto.quote}
								<footer className="mt-1 text-xs font-mono not-italic text-text-muted">
									{finalManifesto.source}
								</footer>
							</motion.blockquote>
						</section>
					</div>
				</TopicRevealItem>
			) : (
				/* Subtask 2.5 — Página 2: Notas via MatrixTerminal */
				<TopicRevealItem className="flex min-h-0 flex-1 items-center justify-center">
					<MatrixTerminal title={labels.notesTerminalTitle} lines={terminalLines} contrast="high" />
				</TopicRevealItem>
			)}
		</TopicReveal>
	);
};

export default Topic16;
