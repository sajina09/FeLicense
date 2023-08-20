import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store'

// Use this hook instead of useSelector for typed state selection
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Use this hook to get a typed dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>();
