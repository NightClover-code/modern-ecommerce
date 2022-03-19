import Link from 'next/link';
import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAdmin, useTypedSelector, useUserActions } from '../../hooks';
import Loader from '../Loader';
import Message from '../Message';

const UsersList = () => {
  useAdmin();

  const { loading, error, data } = useTypedSelector(state => state.users);
  const user = useTypedSelector(state => state.user);
  const { fetchUsers } = useUserActions();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, user.data]);

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(_user => (
              <tr key={_user._id}>
                <td>{_user._id}</td>
                <td>{_user.name}</td>
                <td>
                  <a href={`mailto:${_user.email}`}>{_user.email}</a>
                </td>
                <td>
                  {_user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link href={`/admin/edit/${_user._id}`} passHref>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    // onClick={() => deleteHandler(_user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersList;
