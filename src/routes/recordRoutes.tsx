import DailyRecordDetailPage from "@/pages/record/DailyRecordDetailPage";
import DailyRecordPage from "@/pages/record/DailyRecordPage";
import FeedbackPage from "@/pages/record/FeedbackPage";
import FragmentDetailPage from "@/pages/record/FragmentDetailPage";
import FragmentPage from "@/pages/record/FragmentPage";
import RecordCreatePage from "@/pages/record/RecordCreatePage";
import RecordHomePage from "@/pages/record/RecordHomePage";
import SearchPage from "@/pages/record/SearchPage";
import SearchResultPage from "@/pages/record/SearchResultPage";
import StockSearchPage from "@/pages/record/StockSearchPage";
import type { RouteObject } from "react-router-dom";

const recordRoutes: RouteObject[] = [
  {
    path: 'record',
    element: <RecordHomePage />,
    handle: { showNav: true },
  },
  {
    path: 'record/:date',
    element: <DailyRecordPage />,
  },
  {
    path: 'record/:date/:recordId',
    element: <DailyRecordDetailPage />,
  },
  {
    path: 'record/create',
    element: <RecordCreatePage />,
    handle: { showNav: false },
  },
  {
        path: 'fragment',
        element: <FragmentPage />,
        handle: { showNav: false },
      },
      {
        path: 'fragment/detail',
        element: <FragmentDetailPage />,
        handle: { showNav: false },
  },
      {
        path: 'search',
        element: <SearchPage />,
        handle: { showNav: false },
      },
      {
        path: 'search/result',
        element: <SearchResultPage />,
        handle: { showNav: false },
  },
      {
        path: 'feedback',
        element: <FeedbackPage />,
        handle: { showNav: false },
      },
      {
        path: 'stock/search',
        element: <StockSearchPage />,
        handle: { showNav: false },
      },
];

export default recordRoutes;