import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { topic11Data } from '@/data/topic11Data';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { NeonCard } from '@/components/ui/NeonCard';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { useShouldReduceMotion } from '@/hooks/useShouldReduceMotion';

const MOTION_EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const Topic11 = () => {
	const [page, setPage] = useState<'content' | 'notes'>('content');
	const shouldReduceMotion = useShouldReduceMotion();

	const {
		title,
		subtitle,
		codeforcesLadder,
		orchestrationStat,
		transition,
		responsibilities,
		closingQuote,
		narratorNotes,
		labels,
	} = topic11Data;

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
					<div className="space-y-8 pb-4">
						{/* Section 1: Codeforces Ladder */}
						<section className="space-y-4" aria-label={labels.codeforcesEyebrow}>
							<div className="space-y-2">
								<p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
									{labels.codeforcesEyebrow}
								</p>
								<p className="max-w-4xl text-base text-text-primary lg:text-lg">
									{codeforcesLadder.intro}
								</p>
							</div>

							<div className="rounded-2xl border border-border-subtle bg-bg-card/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] lg:p-6">
								<div className="overflow-x-auto">
									<table
										className="w-full text-sm"
										aria-label={labels.codeforcesTableCaption}
									>
										<thead>
											<tr className="border-b border-border-subtle/60">
												<th className="py-2 pr-4 text-left text-xs font-mono uppercase tracking-[0.15em] text-text-muted">
													Modelo
												</th>
												<th className="py-2 pr-4 text-right text-xs font-mono uppercase tracking-[0.15em] text-text-muted">
													Rating
												</th>
												<th className="py-2 pr-4 text-left text-xs font-mono uppercase tracking-[0.15em] text-text-muted">
													Percentil
												</th>
												<th className="py-2 text-left text-xs font-mono uppercase tracking-[0.15em] text-text-muted">
													Equivalente
												</th>
											</tr>
										</thead>
										<tbody>
											{codeforcesLadder.rows.map((row, index) => {
												const isHighlight = index === codeforcesLadder.rows.length - 1;
												return (
													<motion.tr
														key={row.model}
														className={`border-b border-border-subtle/30 ${isHighlight ? 'bg-accent-primary/5' : ''}`}
														initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{
															duration: shouldReduceMotion ? 0.01 : 0.4,
															delay: shouldReduceMotion ? 0 : 0.4 + index * 0.12,
															ease: MOTION_EASING,
														}}
													>
														<td
															className={`py-2.5 pr-4 font-mono text-sm ${isHighlight ? 'font-bold text-accent-primary' : 'text-text-primary'}`}
														>
															{row.model}
														</td>
														<td
															className={`py-2.5 pr-4 text-right font-mono text-sm tabular-nums ${isHighlight ? 'font-bold text-accent-primary' : 'text-text-secondary'}`}
														>
															{row.rating.toLocaleString('pt-BR')}
														</td>
														<td
															className={`py-2.5 pr-4 font-mono text-sm ${isHighlight ? 'font-bold text-accent-primary' : 'text-text-secondary'}`}
														>
															{row.percentile}
														</td>
														<td
															className={`py-2.5 text-sm ${isHighlight ? 'font-semibold text-text-primary' : 'text-text-muted'}`}
														>
															{row.equivalent}
														</td>
													</motion.tr>
												);
											})}
										</tbody>
									</table>
								</div>

								<div className="mt-4 border-t border-border-subtle/60 pt-4">
									<p className="text-sm text-text-primary">{codeforcesLadder.highlight}</p>
									<p className="mt-1 text-xs font-mono text-text-muted">{codeforcesLadder.source}</p>
								</div>
							</div>
						</section>

						<GlowDivider />

						{/* Section 2: Transition Stages + Orchestration Stat */}
						<section className="space-y-4" aria-label={labels.transitionEyebrow}>
							<div className="space-y-1">
								<p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
									{labels.transitionEyebrow}
								</p>
								<h3 className="text-xl font-mono font-semibold text-text-primary lg:text-2xl">
									{labels.transitionHeading}
								</h3>
							</div>

							<div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
								{transition.stages.map((stage, index) => {
									const isLast = index === transition.stages.length - 1;
									return (
										<motion.div
											key={stage.name}
											initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: shouldReduceMotion ? 0.01 : 0.45,
												delay: shouldReduceMotion ? 0 : 0.4 + index * 0.15,
												ease: MOTION_EASING,
											}}
										>
											<NeonCard variant={isLast ? 'success' : 'danger'} className="h-full p-4">
												<div className="space-y-2">
													<div className="flex items-baseline gap-2">
														<h4
															className={`text-base font-mono font-bold ${isLast ? 'text-accent-primary' : 'text-text-primary'}`}
														>
															{stage.name}
														</h4>
														<span className="text-xs font-mono text-text-muted">{stage.year}</span>
													</div>
													<p className="text-sm text-text-secondary leading-relaxed">
														{stage.description}
													</p>
												</div>
											</NeonCard>
										</motion.div>
									);
								})}
							</div>

							<p className="text-xs font-mono text-text-muted">{transition.supportText}</p>

							{/* Orchestration stat */}
							<NeonCard variant="success" className="p-4">
								<div className="flex flex-wrap items-center gap-4">
									<AnimatedCounter
										value={orchestrationStat.value}
										suffix={orchestrationStat.suffix}
										variant="success"
										className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold"
									/>
									<div className="flex-1 min-w-0">
										<p className="text-base text-text-primary leading-snug">
											{orchestrationStat.label}
										</p>
										<p className="mt-1 text-xs font-mono text-text-muted">
											{orchestrationStat.source}
										</p>
									</div>
								</div>
							</NeonCard>
						</section>

						<GlowDivider />

						{/* Section 3: Before vs After */}
						<section className="space-y-4" aria-label={labels.responsibilitiesEyebrow}>
							<p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.responsibilitiesEyebrow}
							</p>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<NeonCard variant="danger" className="p-4">
									<div className="space-y-3">
										<h4 className="text-sm font-mono font-bold uppercase tracking-wider text-text-muted">
											{labels.beforeLabel}
										</h4>
										<ul className="space-y-2">
											{responsibilities.before.map((item) => (
												<li key={item.label} className="flex items-start gap-2 text-sm text-text-secondary">
													<span className="mt-0.5 shrink-0 font-mono text-text-muted">–</span>
													{item.label}
												</li>
											))}
										</ul>
									</div>
								</NeonCard>

								<NeonCard variant="success" className="p-4">
									<div className="space-y-3">
										<h4 className="text-sm font-mono font-bold uppercase tracking-wider text-accent-primary">
											{labels.afterLabel}
										</h4>
										<ul className="space-y-2">
											{responsibilities.after.map((item) => (
												<li key={item.label} className="space-y-0.5">
													<p className="text-sm font-semibold text-text-primary">{item.label}</p>
													{item.description && (
														<p className="text-xs text-text-muted leading-relaxed">
															{item.description}
														</p>
													)}
												</li>
											))}
										</ul>
									</div>
								</NeonCard>
							</div>
						</section>

						{/* Closing quote */}
						<motion.blockquote
							className="border-l-2 border-accent-primary/50 pl-4 text-base italic text-text-primary lg:text-lg"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: shouldReduceMotion ? 0.01 : 0.6,
								delay: shouldReduceMotion ? 0 : 1.2,
								ease: MOTION_EASING,
							}}
						>
							{closingQuote}
						</motion.blockquote>
					</div>
				</TopicRevealItem>
			) : (
				<TopicRevealItem className="flex min-h-0 flex-1 items-center justify-center">
					<MatrixTerminal title={labels.notesTerminalTitle} lines={terminalLines} contrast="high" />
				</TopicRevealItem>
			)}
		</TopicReveal>
	);
};

export default Topic11;
