import { useParams } from 'react-router-dom';

const RecordDetailPage = () => {
  const { date } = useParams<{ date: string }>();

  return (
    <div>
      <h1>{date} 기록</h1>
    </div>
  );
};

export default RecordDetailPage;