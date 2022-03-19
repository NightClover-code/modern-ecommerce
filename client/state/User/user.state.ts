import { UserInterface } from '../../interfaces';

export interface UserState {
  loading: boolean;
  error: string | null;
  data: UserInterface | null;
  success?: boolean;
}

export interface UsersState {
  loading: boolean;
  error: string | null;
  data: UserInterface[];
  success?: boolean;
}
