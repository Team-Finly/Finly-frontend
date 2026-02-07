export const apiRenderGuard = (
  isLoading: boolean,
  isError: boolean,
  data: any,
) => {
  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-400">데이터 로딩 중...</div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-10 text-center text-gray-400">
        데이터를 가져오는 데 실패했습니다.
      </div>
    );
  }

  return undefined;
};
