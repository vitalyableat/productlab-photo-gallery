import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/store/services/auth';
import { RootState } from '@/store/store.ts';

type UserState = {
  user: User | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null } as UserState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload;
    },
  },
});

export const { setUser } = slice.actions;

export default slice.reducer;

export const selectUser = (state: RootState) => state.user.user;
