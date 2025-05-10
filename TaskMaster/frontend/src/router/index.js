import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TaskView from '../views/TaskView.vue'
import AIChat from '../components/AIChat.vue'
import Calendar from '../components/Calendar.vue'
import NotesSummaries from '../components/NotesSummaries.vue'
import Settings from '../components/Settings.vue'
import Profile from '../components/Profile.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/tasks', component: TaskView },
  { path: '/ai', component: AIChat },
  { path: '/calendar', component: Calendar },
  { path: '/notes', component: NotesSummaries },
  { path: '/settings', component: Settings },
  { path: '/profile', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
