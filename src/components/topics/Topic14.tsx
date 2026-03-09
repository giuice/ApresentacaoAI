import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { topic14Data } from '@/data/topic14Data';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { NeonCard } from '@/components/ui/NeonCard';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { useShouldReduceMotion } from '@/hooks/useShouldReduceMotion';

const MOTION_EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const Topic14 = () => {
	const [page, setPage] = useState<'content' | 'notes'>('content');
	const shouldReduceMotion = useShouldReduceMotion();

	const {
		title,
		subtitle,
		heroBlock,
		jCurve,
		valeForces,
		twoCurves,
		roiMetrics,
		formula,
		narratorNotes,
		labels,
	} = topic14Data;

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
						{/* Section 1: Hero — O Contraste Central */}
						<section aria-label={labels.heroEyebrow}>
							<p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.heroEyebrow}
							</p>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								{/* Negative: sem estrutura */}
								<NeonCard variant="danger" className="p-6">
									<div className="space-y-2">
										<p className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-text-muted">
											Sem Estrutura · METR RCT, 2025
										</p>
										<p
											className="font-mono font-bold text-accent-danger"
											style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)' }}
											aria-label={`Produtividade real: ${heroBlock.negative.value}`}
										>
											{heroBlock.negative.value}
										</p>
										<p className="text-sm text-text-secondary leading-snug">
											{heroBlock.negative.label}
										</p>
										<p className="text-xs font-mono text-text-muted">
											16 devs, 246 tarefas · percepção: +20% (gap de 39pp)
										</p>
									</div>
								</NeonCard>

								{/* Positive: com estrutura */}
								<NeonCard variant="success" className="p-6">
									<div className="space-y-2">
										<p className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-text-muted">
											Com Estrutura · Wharton/Industry 2025
										</p>
										<div className="flex flex-wrap items-baseline gap-3">
											<p
												className="font-mono font-bold text-accent-primary"
												style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
											>
												{heroBlock.positive.avg}
											</p>
											<p className="text-lg font-mono font-semibold text-text-secondary">
												/ {heroBlock.positive.top}
											</p>
										</div>
										<p className="text-sm text-text-secondary leading-snug">
											{heroBlock.positive.label}
										</p>
										<p className="text-xs font-mono text-text-muted">
											média / top performers
										</p>
									</div>
								</NeonCard>
							</div>

							<p className="mt-3 text-xs font-mono text-text-muted">{heroBlock.source}</p>
						</section>

						<GlowDivider />

						{/* Section 2: A Curva J */}
						<section aria-label={labels.jCurveEyebrow}>
							<p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.jCurveEyebrow}
							</p>

							<div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
								{jCurve.phases.map((phase, index) => {
									const isLast = index === jCurve.phases.length - 1;
									return (
										<motion.div
											key={phase.phase}
											initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: shouldReduceMotion ? 0.01 : 0.45,
												delay: shouldReduceMotion ? 0 : 0.3 + index * 0.15,
												ease: MOTION_EASING,
											}}
										>
											<NeonCard variant={isLast ? 'success' : 'danger'} className="h-full p-4">
												<div className="space-y-2">
													<div className="flex items-baseline gap-2 flex-wrap">
														<h4
															className={`text-base font-mono font-bold ${isLast ? 'text-accent-primary' : 'text-text-primary'}`}
														>
															{phase.phase}
														</h4>
														<span className="text-xs font-mono text-text-muted">
															{phase.timeframe}
														</span>
													</div>
													<p className="text-sm text-text-secondary leading-relaxed">
														{phase.description}
													</p>
												</div>
											</NeonCard>
										</motion.div>
									);
								})}
							</div>

							<p className="mt-3 text-xs font-mono text-text-muted">{jCurve.note}</p>
						</section>

						<GlowDivider />

						{/* Section 3: As Três Forças do Vale */}
						<section aria-label={labels.valeEyebrow}>
							<p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.valeEyebrow}
							</p>

							<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
								{valeForces.map((force, index) => (
									<motion.div
										key={force.title}
										initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: shouldReduceMotion ? 0.01 : 0.4,
											delay: shouldReduceMotion ? 0 : 0.4 + index * 0.12,
											ease: MOTION_EASING,
										}}
									>
										<NeonCard variant="danger" className="h-full p-4">
											<div className="space-y-2">
												<h4 className="text-sm font-mono font-bold text-text-primary">
													{force.title}
												</h4>
												<p className="text-base font-mono font-semibold text-accent-danger">
													{force.stat}
												</p>
												<p className="text-xs text-text-secondary leading-relaxed">
													{force.note}
												</p>
												<p className="text-xs font-mono text-text-muted">{force.source}</p>
											</div>
										</NeonCard>
									</motion.div>
								))}
							</div>
						</section>

						<GlowDivider />

						{/* Section 4: Duas Curvas */}
						<section aria-label={labels.curvesEyebrow}>
							<p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.curvesEyebrow}
							</p>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								{twoCurves.curves.map((curve, index) => {
									const isSuccess = index === 1;
									return (
										<motion.div
											key={curve.label}
											initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: shouldReduceMotion ? 0.01 : 0.45,
												delay: shouldReduceMotion ? 0 : 0.4 + index * 0.2,
												ease: MOTION_EASING,
											}}
										>
											<NeonCard
												variant={isSuccess ? 'success' : 'danger'}
												className="h-full p-4"
											>
												<div className="space-y-3">
													<h4
														className={`text-sm font-mono font-bold ${isSuccess ? 'text-accent-primary' : 'text-text-primary'}`}
													>
														{curve.label}
													</h4>
													<ul className="space-y-1.5">
														{curve.markers.map((marker) => (
															<li
																key={marker}
																className="flex items-start gap-2 text-xs text-text-secondary"
															>
																<span
																	className={`mt-0.5 shrink-0 font-mono ${isSuccess ? 'text-accent-primary' : 'text-accent-danger'}`}
																>
																	{isSuccess ? '✓' : '×'}
																</span>
																{marker}
															</li>
														))}
													</ul>
													<p
														className={`text-xs font-mono font-semibold ${isSuccess ? 'text-accent-primary' : 'text-accent-danger'}`}
													>
														{curve.outcome}
													</p>
												</div>
											</NeonCard>
										</motion.div>
									);
								})}
							</div>

							<motion.div
								className="mt-4 rounded-xl border border-accent-primary/30 bg-bg-card/60 p-4"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: shouldReduceMotion ? 0.01 : 0.6,
									delay: shouldReduceMotion ? 0 : 1.0,
									ease: MOTION_EASING,
								}}
							>
								<p className="text-xs font-mono text-text-muted">{twoCurves.separator}</p>
								<p className="mt-1 text-sm font-mono font-semibold text-accent-primary">
									→ {twoCurves.conclusion}
								</p>
							</motion.div>
						</section>

						<GlowDivider />

						{/* Section 5: ROI Comprovado */}
						<section aria-label={labels.roiEyebrow}>
							<p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.roiEyebrow}
							</p>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{roiMetrics.map((metric, index) => (
									<motion.div
										key={metric.label}
										initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: shouldReduceMotion ? 0.01 : 0.45,
											delay: shouldReduceMotion ? 0 : 0.4 + index * 0.15,
											ease: MOTION_EASING,
										}}
									>
										<NeonCard variant="success" className="h-full p-4">
											<div className="space-y-2">
												<AnimatedCounter
													value={metric.value}
													suffix={metric.suffix}
													variant="success"
													className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold"
												/>
												<p className="text-sm font-semibold text-text-primary leading-snug">
													{metric.label}
												</p>
												<p className="text-xs font-mono text-text-muted">{metric.source}</p>
											</div>
										</NeonCard>
									</motion.div>
								))}
							</div>
						</section>

						{/* Formula */}
						<motion.section
							aria-label={labels.formulaEyebrow}
							className="rounded-2xl border border-accent-primary/40 bg-bg-card/80 p-6"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: shouldReduceMotion ? 0.01 : 0.6,
								delay: shouldReduceMotion ? 0 : 1.2,
								ease: MOTION_EASING,
							}}
						>
							<p className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.formulaEyebrow}
							</p>
							<p className="font-mono text-xl font-bold text-text-primary lg:text-2xl">
								{formula.text}
							</p>
							<div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
								<p className="text-xs text-text-muted">
									<span className="font-mono font-semibold text-text-secondary">Velocidade</span>{' '}
									— {formula.speedNote}
								</p>
								<p className="text-xs text-text-muted">
									<span className="font-mono font-semibold text-accent-primary">Verificação</span>{' '}
									— {formula.verificationNote}
								</p>
							</div>
						</motion.section>
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

export default Topic14;
