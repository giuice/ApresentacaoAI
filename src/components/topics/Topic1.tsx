import { topic1Data } from '@/data/topic1Data';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';

const Topic1 = () => {
  const { title, subtitle, metric, supportingItems } = topic1Data;

  return (
    <TopicReveal className="flex flex-col items-center justify-center h-full p-8 gap-8">
      <TopicRevealItem>
        <h2 className="text-5xl font-mono font-bold text-accent-danger text-center max-w-5xl leading-tight">
          {title}
        </h2>
      </TopicRevealItem>

      <TopicRevealItem>
        <p className="text-xl font-sans text-text-secondary text-center italic">
          {subtitle}
        </p>
      </TopicRevealItem>

      <TopicRevealItem className="flex flex-col items-center gap-2">
        <AnimatedCounter
          value={metric.value}
          variant="danger"
          suffix={metric.suffix}
          className="text-8xl font-bold"
        />
        <p className="text-lg font-sans text-text-secondary text-center max-w-2xl">
          {metric.context}
        </p>
      </TopicRevealItem>

      <TopicRevealItem className="flex flex-col gap-4 max-w-3xl">
        {supportingItems.map((item) => (
          <p
            key={item.text}
            className="text-base font-sans text-text-primary border-l-2 border-accent-danger/40 pl-4"
          >
            {item.text}
          </p>
        ))}
      </TopicRevealItem>
    </TopicReveal>
  );
};

export default Topic1;
