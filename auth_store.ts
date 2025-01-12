import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  userType: 'doctor' | null
  userId: string | null
  login: (userType: 'doctor', userId: string) => void
  logout: () => void
  isAuthenticated: boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userType: null,
      userId: null,
      isAuthenticated: false,
      login: (userType, userId) => set({ userType, userId, isAuthenticated: true }),
      logout: () => set({ userType: null, userId: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

