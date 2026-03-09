import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { topic13Data } from '@/data/topic13Data';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { NeonCard } from '@/components/ui/NeonCard';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { useShouldReduceMotion } from '@/hooks/useShouldReduceMotion';

const MOTION_EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const Topic13 = () => {
	const [page, setPage] = useState<'content' | 'notes'>('content');
	const shouldReduceMotion = useShouldReduceMotion();

	const {
		title,
		subtitle,
		heroMetric,
		supportingMetrics,
		skills,
		matrix,
		closingQuote,
		narratorNotes,
		labels,
	} = topic13Data;

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
						{/* Hero Metric */}
						<section aria-label={labels.heroEyebrow}>
							<p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.heroEyebrow}
							</p>

							<NeonCard variant="success" className="p-6">
								<div className="flex flex-wrap items-center gap-6">
									<AnimatedCounter
										value={heroMetric.value}
										suffix={heroMetric.suffix}
										variant="success"
										className="text-[clamp(3.5rem,8vw,5rem)] font-bold shrink-0"
									/>
									<div className="flex-1 min-w-0 space-y-1">
										<p className="text-lg font-semibold text-text-primary leading-snug lg:text-xl">
											{heroMetric.label}
										</p>
										<p className="text-xs font-mono text-text-muted">{heroMetric.source}</p>
									</div>
								</div>
							</NeonCard>

							{/* Supporting metrics */}
							<div className="mt-3 flex flex-wrap gap-3">
								{supportingMetrics.map((m) => (
									<div
										key={m.source}
										className="flex-1 min-w-[220px] rounded-xl border border-border-subtle/40 bg-bg-card/60 px-3 py-2"
									>
										<p className="text-xs text-text-secondary leading-snug">{m.text}</p>
										<p className="mt-0.5 text-xs font-mono text-text-muted">{m.source}</p>
									</div>
								))}
							</div>
						</section>

						<GlowDivider />

						{/* Skills Timeline */}
						<section aria-label={labels.timelineEyebrow}>
							<p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.timelineEyebrow}
							</p>

							<div className="space-y-3">
								{skills.map((skill, index) => (
									<motion.div
										key={skill.name}
										className="flex gap-4"
										initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -16 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: shouldReduceMotion ? 0.01 : 0.45,
											delay: shouldReduceMotion ? 0 : 0.3 + index * 0.12,
											ease: MOTION_EASING,
										}}
									>
										{/* Timestamp column */}
										<div className="shrink-0 w-14 pt-3 text-right">
											<span className="text-xs font-mono font-bold text-accent-primary">
												{skill.time}
											</span>
										</div>

										{/* Skill card */}
										<div className="flex-1 min-w-0">
											<NeonCard variant="success" className="p-4">
												<div className="space-y-2">
													<div className="flex flex-wrap items-baseline gap-2">
														<h4 className="text-sm font-mono font-bold text-text-primary">
															{skill.name}
														</h4>
														<span className="text-xs font-mono text-text-muted">
															— {skill.tagline}
														</span>
													</div>
													<p className="text-sm text-text-secondary leading-relaxed">
														{skill.scene}
													</p>
												</div>
											</NeonCard>
										</div>
									</motion.div>
								))}
							</div>
						</section>

						<GlowDivider />

						{/* Skills × Tools Matrix */}
						<section aria-label={labels.matrixEyebrow}>
							<p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.matrixEyebrow}
							</p>

							<div className="rounded-2xl border border-border-subtle bg-bg-card/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] lg:p-6">
								<div className="overflow-x-auto">
									<table className="w-full text-sm" aria-label={labels.matrixEyebrow}>
										<thead>
											<tr className="border-b border-border-subtle/60">
												<th className="py-2 pr-4 text-left text-xs font-mono uppercase tracking-[0.15em] text-text-muted">
													Skill
												</th>
												<th className="py-2 pr-4 text-left text-xs font-mono uppercase tracking-[0.15em] text-text-muted">
													Spec-Kit
												</th>
												<th className="py-2 pr-4 text-left text-xs font-mono uppercase tracking-[0.15em] text-text-muted">
													GSD
												</th>
												<th className="py-2 text-left text-xs font-mono uppercase tracking-[0.15em] text-text-muted">
													BMAD
												</th>
											</tr>
										</thead>
										<tbody>
											{matrix.map((row, index) => (
												<motion.tr
													key={row.skill}
													className="border-b border-border-subtle/30"
													initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{
														duration: shouldReduceMotion ? 0.01 : 0.35,
														delay: shouldReduceMotion ? 0 : 0.6 + index * 0.08,
														ease: MOTION_EASING,
													}}
												>
													<td className="py-2.5 pr-4 font-mono text-sm font-semibold text-accent-primary">
														{row.skill}
													</td>
													<td className="py-2.5 pr-4 text-xs text-text-secondary">
														{row.specKit}
													</td>
													<td className="py-2.5 pr-4 text-xs text-text-secondary">{row.gsd}</td>
													<td className="py-2.5 text-xs text-text-secondary">{row.bmad}</td>
												</motion.tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</section>

						{/* Closing quote */}
						<motion.blockquote
							className="border-l-2 border-accent-primary/50 pl-4 text-base italic text-text-primary lg:text-lg"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: shouldReduceMotion ? 0.01 : 0.6,
								delay: shouldReduceMotion ? 0 : 1.4,
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

export default Topic13;
