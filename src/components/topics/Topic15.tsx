import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { topic15Data } from '@/data/topic15Data';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { NeonCard } from '@/components/ui/NeonCard';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { useShouldReduceMotion } from '@/hooks/useShouldReduceMotion';

const MOTION_EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const Topic15 = () => {
	const [page, setPage] = useState<'content' | 'notes'>('content');
	const shouldReduceMotion = useShouldReduceMotion();

	const { title, subtitle, scaleCases, patternNote, timeline, narratorNotes, labels } =
		topic15Data;

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
						{/* Section 1: Escada de Escala */}
						<section aria-label={labels.scalesEyebrow}>
							<p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.scalesEyebrow}
							</p>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								{scaleCases.map((caseItem, index) => (
									<motion.div
										key={caseItem.company}
										initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: shouldReduceMotion ? 0.01 : 0.45,
											delay: shouldReduceMotion ? 0 : 0.2 + index * 0.15,
											ease: MOTION_EASING,
										}}
									>
										<NeonCard variant="success" className="h-full p-4">
											<div className="space-y-3">
												{/* Step badge + scale label */}
												<div className="flex items-center gap-2 flex-wrap">
													<span className="rounded border border-accent-primary/30 bg-accent-primary/10 px-2 py-0.5 text-xs font-mono font-bold text-accent-primary">
														DEGRAU {caseItem.step}
													</span>
													<span className="text-xs font-mono text-text-muted">
														{caseItem.scaleLabel}
													</span>
												</div>

												{/* Company + subtitle */}
												<div>
													<h3 className="text-base font-mono font-bold text-text-primary">
														{caseItem.company}
													</h3>
													<p className="text-xs text-text-muted">{caseItem.subtitle}</p>
												</div>

												{/* Before → After contrast */}
												<div className="flex items-center gap-3 flex-wrap">
													<div className="text-center">
														<p
															className="font-mono font-bold text-accent-danger"
															style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)' }}
														>
															{caseItem.before}
														</p>
														<p className="text-xs font-mono text-text-muted">
															{caseItem.beforeLabel}
														</p>
													</div>
													<span className="font-mono text-text-muted text-lg">→</span>
													<div className="text-center">
														<p
															className="font-mono font-bold text-accent-primary"
															style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}
															aria-label={`${caseItem.after} ${caseItem.afterLabel}`}
														>
															{caseItem.after}
														</p>
														<p className="text-xs font-mono text-text-muted">
															{caseItem.afterLabel}
														</p>
													</div>
												</div>

												{/* Savings label */}
												<p className="text-sm font-mono font-semibold text-accent-primary">
													↑ {caseItem.savingsLabel}
												</p>

												{/* Extra metric */}
												<p className="text-xs text-text-secondary">{caseItem.extraMetric}</p>

												{/* Insight */}
												<p className="border-t border-accent-primary/10 pt-2 text-xs italic text-text-muted">
													{caseItem.insight}
												</p>

												{/* Source */}
												<p className="text-xs font-mono text-text-muted">{caseItem.source}</p>
											</div>
										</NeonCard>
									</motion.div>
								))}
							</div>
						</section>

						<GlowDivider />

						{/* Section 2: Pattern note */}
						<motion.section
							aria-label={labels.patternEyebrow}
							className="rounded-xl border border-accent-primary/30 bg-bg-card/60 p-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: shouldReduceMotion ? 0.01 : 0.5,
								delay: shouldReduceMotion ? 0 : 0.9,
								ease: MOTION_EASING,
							}}
						>
							<p className="mb-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.patternEyebrow}
							</p>
							<p className="text-sm leading-relaxed text-text-secondary">{patternNote}</p>
						</motion.section>

						<GlowDivider />

						{/* Section 3: Timeline Codeforces */}
						<section aria-label={labels.timelineEyebrow}>
							<p className="mb-6 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.timelineEyebrow}
							</p>

							<div className="relative flex items-start">
								{/* Connector line */}
								<div
									className="absolute left-0 right-0 top-5 h-px border-t border-dashed border-accent-primary/30"
									aria-hidden="true"
								/>

								{timeline.points.map((point, index) => (
									<motion.div
										key={point.year}
										className="relative flex flex-1 flex-col items-center gap-2 px-2 text-center"
										initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: shouldReduceMotion ? 0.01 : 0.4,
											delay: shouldReduceMotion ? 0 : 0.6 + index * 0.2,
											ease: MOTION_EASING,
										}}
									>
										{/* Year node */}
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent-primary bg-bg-card">
											<span className="text-xs font-mono font-bold text-accent-primary">
												{point.year}
											</span>
										</div>

										<p className="text-xs font-mono text-text-muted">{point.subject}</p>
										<p
											className="font-mono font-bold text-accent-primary"
											style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
										>
											{point.rating}
										</p>
										<p className="text-xs text-text-secondary">{point.percentile}</p>
									</motion.div>
								))}
							</div>

							{/* Closing question */}
							<motion.p
								className="mt-6 text-center text-base font-mono font-semibold text-text-primary lg:text-lg"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: shouldReduceMotion ? 0.01 : 0.6,
									delay: shouldReduceMotion ? 0 : 1.3,
									ease: MOTION_EASING,
								}}
							>
								{timeline.closingQuestion}
							</motion.p>
						</section>
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

export default Topic15;
