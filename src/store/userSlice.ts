import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User { email: string; token: string;
}

const loadUserFromLocalStorage = (): User | null => {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
};

const saveUserToLocalStorage = (user: User | null) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const userSlice = createSlice({
  name: 'user',
  initialState: loadUserFromLocalStorage(),
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      saveUserToLocalStorage(action.payload);
      return action.payload;
    },
    clearUser: (state) => {
      saveUserToLocalStorage(null);
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
