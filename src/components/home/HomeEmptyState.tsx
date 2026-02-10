interface HomeEmptyStateProps {
  message?: string; 
  subMessage?: string; 
}

export const HomeEmptyState = ({
  message = '데이터를 로드하는 중 오류가 발생했습니다.',
  subMessage = '',
}: HomeEmptyStateProps) => {
  return (
    <div className="min-w-[100%] bg-white rounded-xl border border-[#F2F4F6] p-[12px] flex flex-col justify-center items-center text-center">
      <p className="text-[14px] text-[#8B95A1]">{message}</p>
      {subMessage && (
        <p className="mt-[4px] text-[12px] text-[#B0B8C1]">{subMessage}</p>
      )}
    </div>
  );
};