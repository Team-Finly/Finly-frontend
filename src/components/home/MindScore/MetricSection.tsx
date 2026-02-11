import MetricCard from '@/components/home/MindScore/MetricCard';

export type Metric = {
  key: string;
  title: string;
  score: number;
  desc: string;
};

type MetricSectionProps = {
  metrics: Metric[];
};

const MetricSection = ({ metrics }: MetricSectionProps) => { 
  return (
    <section className="mt-[32px] px-[32px]">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.key}
          title={metric.title}
          score={metric.score}
          description={metric.desc}
        />
      ))}
    </section>
  );
};

export default MetricSection;
