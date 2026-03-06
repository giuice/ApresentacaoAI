import { getTopicPlaceholderContent } from '@/data/topics';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';

interface PlaceholderTopicProps {
  topicIndex: number;
}

export const PlaceholderTopic = ({ topicIndex }: PlaceholderTopicProps) => {
  const topic = getTopicPlaceholderContent(topicIndex);

  return (
    <TopicReveal className="flex flex-col items-center justify-center min-h-full px-4 py-8 lg:px-8 lg:py-16 gap-6">
      <TopicRevealItem>
        <h2 className="text-3xl font-mono text-accent-primary">{topic.title}</h2>
      </TopicRevealItem>
      <TopicRevealItem>
        <p className="text-xl text-text-secondary font-mono">{topic.subtitle}</p>
      </TopicRevealItem>
      <TopicRevealItem>
        <p className="text-base text-text-muted">{topic.description}</p>
      </TopicRevealItem>
    </TopicReveal>
  );
};