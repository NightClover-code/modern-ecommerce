import { useAdmin } from '../../hooks';

const UsersList = () => {
  useAdmin();

  return <div>UsersList</div>;
};

export default UsersList;
