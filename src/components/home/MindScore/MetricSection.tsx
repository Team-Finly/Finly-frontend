import MetricCard from "./MetricCard";

type Metric = {
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
    <section className="px-[32px] mt-[32px]">
      {metrics.map(metric => (
        <MetricCard
          key={metric.key}
          title={metric.title}
          score={metric.score}
          desc={metric.desc}
        />
      ))}
    </section>
  );
};

export default MetricSection;
