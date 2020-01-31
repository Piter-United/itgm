import { WrappedActivityList } from './components/Activity/ActivityList'
import ActivityCreate from 'components/Activity/ActivityCreate'
import Activity from './components/Activity/Activity'
import CommunityList from './components/Community/CommunityList'
import NewCommunity from './components/Community/New'
import Community from './components/Community/Community'
import User from './components/User'
import UserEdit from './components/UserEdit'
import Login from './components/Login'
import ParticipantList from './components/Participants/ParticipantsList'
import PartnerList from './components/Partners/Partners'
import About from './components/About/About'

const routes = [
  {
    path: '/activity',
    inHeader: true,
    title: 'Программа',
    component: WrappedActivityList
  },
  {
    path: '/activity/new',
    component: ActivityCreate,
    private: true
  },
  {
    path: '/activity/:id',
    component: Activity
  },
  {
    path: '/activity/:id/edit',
    component: ActivityCreate,
    private: true
  },
  {
    path: '/community',
    inHeader: true,
    title: 'Сообщества',
    component: CommunityList
  },
  {
    path: '/community/new',
    component: NewCommunity,
    private: true
  },
  {
    path: '/community/:id',
    component: Community
  },
  {
    path: '/participants',
    inHeader: true,
    title: 'Участники',
    component: ParticipantList
  },
  {
    path: '/partners',
    inHeader: true,
    title: 'Партнеры',
    component: PartnerList
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/user',
    component: User,
    private: true
  },
  {
    path: '/user/edit',
    component: UserEdit,
    private: true
  },
  {
    path: '/login',
    component: Login
  }
]

export default routes
