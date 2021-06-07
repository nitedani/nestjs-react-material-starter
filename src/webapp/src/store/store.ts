import { createStore, action, Action, createTypedHooks } from 'easy-peasy';

export type ThemeId = 'light' | 'dark';
export interface CounterModel {
  count: number;
  increment: Action<any>;
  decrement: Action<any>;
  reset: Action<any>;
}

export interface ThemeModel {
  themeId: ThemeId;
  setTheme: Action<ThemeModel, ThemeId>;
}

export interface LayoutModel {
  drawerOpened: boolean;
  toggleDrawer: Action<LayoutModel, any>;
}

const theme: ThemeModel = {
  themeId: 'light',
  setTheme: action((state, payload) => {
    state.themeId = payload;
  }),
};

const layout: LayoutModel = {
  drawerOpened: true,
  toggleDrawer: action((state) => {
    state.drawerOpened = !state.drawerOpened;
  }),
};

const counter: CounterModel = {
  count: 1,
  increment: action((state) => {
    state.count++;
  }),
  decrement: action((state) => {
    state.count--;
  }),
  reset: action((state) => {
    state.count = 0;
  }),
};

export interface StoreModel {
  counter: CounterModel;
  theme: ThemeModel;
  layout: LayoutModel;
}

export const store = createStore<StoreModel>({
  counter,
  theme,
  layout,
});
export default store;

const typedHooks = createTypedHooks<StoreModel>();
// 👇 export the typed hooks
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
