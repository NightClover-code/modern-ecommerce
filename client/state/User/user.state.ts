import { UserInterface } from '../../interfaces';

export interface UserState {
  loading: boolean;
  error: string | null;
  data: UserInterface | null;
}
