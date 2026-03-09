import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { topic12Data } from '@/data/topic12Data';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { NeonCard } from '@/components/ui/NeonCard';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { useShouldReduceMotion } from '@/hooks/useShouldReduceMotion';

const MOTION_EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const Topic12 = () => {
	const [page, setPage] = useState<'content' | 'notes'>('content');
	const shouldReduceMotion = useShouldReduceMotion();

	const {
		title,
		subtitle,
		heroMetric,
		roiMetrics,
		impactCases,
		narratorNotes,
		labels,
	} = topic12Data;

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
										<p className="text-sm text-text-secondary">{heroMetric.context}</p>
										<p className="text-xs font-mono text-text-muted">{heroMetric.source}</p>
									</div>
								</div>
							</NeonCard>
						</section>

						<GlowDivider />

						{/* ROI Metrics Grid */}
						<section aria-label={labels.metricsEyebrow}>
							<p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.metricsEyebrow}
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
												<p className="text-xs text-text-secondary leading-relaxed">
													{metric.context}
												</p>
												<p className="text-xs font-mono text-text-muted">{metric.source}</p>
											</div>
										</NeonCard>
									</motion.div>
								))}
							</div>

							<p className="mt-3 text-xs font-mono text-text-muted">{labels.roiTimelineNote}</p>
						</section>

						<GlowDivider />

						{/* Impact Cases */}
						<section aria-label={labels.casesEyebrow}>
							<p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
								{labels.casesEyebrow}
							</p>

							<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
								{impactCases.map((item, index) => (
									<motion.div
										key={item.company}
										initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: shouldReduceMotion ? 0.01 : 0.4,
											delay: shouldReduceMotion ? 0 : 0.8 + index * 0.12,
											ease: MOTION_EASING,
										}}
									>
										<NeonCard variant="success" className="h-full p-4">
											<div className="space-y-2">
												<div className="flex flex-wrap items-baseline gap-2">
													<h4 className="text-base font-mono font-bold text-accent-primary">
														{item.company}
													</h4>
													<span className="text-xs font-mono font-semibold text-text-secondary">
														{item.badge}
													</span>
												</div>
												<p className="text-sm text-text-secondary leading-relaxed">{item.detail}</p>
												<p className="text-xs font-mono text-text-muted">{item.source}</p>
											</div>
										</NeonCard>
									</motion.div>
								))}
							</div>
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

export default Topic12;
