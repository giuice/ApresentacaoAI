import { useMemo, useState } from 'react';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { LiveTable } from '@/components/ui/LiveTable';
import { DecisionWizard } from '@/components/ui/DecisionWizard';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { topic10Data } from '@/data/topic10Data';

const Topic10 = () => {
	const [page, setPage] = useState<'content' | 'notes'>('content');
	const { title, subtitle, tagline, narratorNotes, liveTable, decisionWizard, adoptionFootnotes, labels } = topic10Data;

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
						<section className="space-y-4" aria-label={labels.liveTableEyebrow}>
							<div className="space-y-2">
								<p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
									{labels.liveTableEyebrow}
								</p>
								<p className="max-w-4xl text-base text-text-primary lg:text-lg">{tagline}</p>
							</div>

							<div className="rounded-2xl border border-border-subtle bg-bg-card/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] lg:p-6">
								<div className="overflow-x-auto">
									<LiveTable columns={liveTable.columns} rows={liveTable.rows} />
								</div>

								<div className="mt-4 border-t border-border-subtle/80 pt-4">
									<p className="text-xs font-mono uppercase tracking-[0.18em] text-text-muted">
										{labels.adoptionFootnote}
									</p>
									<div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
										{adoptionFootnotes.map((item) => (
											<div
												key={item.tool}
												className="rounded-xl border border-accent-primary/15 bg-bg-surface/70 px-4 py-3"
											>
												<p className="text-xs font-mono uppercase tracking-[0.18em] text-text-muted">
													{item.tool}
												</p>
												<p className="mt-1 text-base font-mono font-semibold text-accent-primary">{item.metric}</p>
												<p className="mt-1 text-xs text-text-secondary">{item.detail}</p>
											</div>
										))}
									</div>
								</div>
							</div>
						</section>

						<GlowDivider />

						<section className="space-y-4" aria-label={labels.wizardEyebrow}>
							<div className="space-y-2">
								<p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
									{labels.wizardEyebrow}
								</p>
								<h3 className="text-2xl font-mono font-semibold text-text-primary">{labels.wizardHeading}</h3>
								<p className="max-w-3xl text-sm text-text-muted lg:text-base">{labels.wizardSupport}</p>
							</div>

							<div className="flex rounded-2xl border border-border-subtle bg-bg-card/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] lg:p-6">
								<DecisionWizard config={decisionWizard} title={labels.wizardTerminalTitle} />
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

export default Topic10;
