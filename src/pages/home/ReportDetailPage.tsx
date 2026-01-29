import { useParams } from 'react-router-dom';

const ReportDetailPage = () => {
  const { yearMonth } = useParams<{ yearMonth: string }>();

  return (
    <div>
      ReportPage {yearMonth}
    </div>
  );
};

export default ReportDetailPage;
