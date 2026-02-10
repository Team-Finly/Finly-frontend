interface Props {
  title: string;
  value: string;
}

const SummaryCard = ({ title, value }: Props) => {
  return (
    <div className="rounded-[12px] bg-gray-50 p-4">
      <div className="mb-2 text-[12px] font-medium text-gray-500">{title}</div>
      <div className="text-[18px] font-semibold text-gray-700">{value}</div>
    </div>
  );
};

export default SummaryCard;
