import { topicNarrativesData } from '@/data/topicNarrativesData';
import { NeonCard } from '@/components/ui/NeonCard';
import { TopicWithNarratorNotes } from '@/components/topics/TopicWithNarratorNotes';

interface TopicNarrativeTopicProps {
  topicIndex: keyof typeof topicNarrativesData;
}

export const TopicNarrativeTopic = ({ topicIndex }: TopicNarrativeTopicProps) => {
  const data = topicNarrativesData[topicIndex];

  return (
    <TopicWithNarratorNotes
      title={data.title}
      subtitle={data.subtitle}
      accent={data.accent}
      notes={data.narratorNotes}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
        <p className="text-lg font-sans text-text-primary leading-relaxed max-w-3xl">
          {data.summary}
        </p>

        <div className="flex flex-col gap-4">
          {data.highlights.map((highlight) => (
            <NeonCard
              key={highlight}
              variant={data.accent}
            >
              <p className="text-base font-sans text-text-primary">{highlight}</p>
            </NeonCard>
          ))}
        </div>
      </div>
    </TopicWithNarratorNotes>
  );
};
