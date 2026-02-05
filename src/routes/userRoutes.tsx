import Profile from "@/pages/mypage/Profile";
import ProfileSettings from "@/pages/mypage/ProfileSettings";
import MyPersona from "@/pages/mypage/MyPersona";

const userRoutes = [
  {
    path: 'profile',
    element: <Profile />,
    handle: { showNav: true },
  },
  {
    path: 'profilesettings',
    element: <ProfileSettings />,
    handle: { showNav: false },
  },
  {
    path: 'mypersona',
    element: <MyPersona />,
    handle: { showNav: false },
  }
];

export default userRoutes;