import { useEffect, useState } from 'react';
import Table from '../components/Table';
import { isAxiosError } from 'axios';
import usersService from '../services/user.service';
import { useSelector } from 'react-redux';
import { IAuthState } from '../redux/Auth/auth.types';
import { IUser } from '../interfaces/User';
import FormButtons from '../components/forms/Buttons';
import UIModal from '../components/UiModal';
import ProfileCard from '../components/ProfileCard';

const LIMIT = 10;
const mapState = ({ auth }: { auth: IAuthState }) => ({
  organizationId: auth.organizationId,
});
const UsersPage = () => {
  const { organizationId } = useSelector(mapState);
  const [users, setUsers] = useState<IUser[]>([{}]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentUserToDelete, setCurrentUserToDelete] = useState<IUser | null>(
    null
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await usersService.search({
          organizationId,
          skip: LIMIT * (page - 1),
          limit: LIMIT,
        });
        setUsers([...data.users]);
        setCount(data.count);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      }
    };
    fetchUsers();
  }, [page, refresh]);

  const userSaved = () => {
    setOpenModal(false);
    setSelectedUserId('');
    setRefresh(!refresh);
  };

  const userEdit = (e: React.MouseEvent<HTMLButtonElement>, row: IUser) => {
    e.preventDefault();
    setSelectedUserId(row.id);
    setOpenModal(true);
  };

  const deleteUser = (e: React.MouseEvent<HTMLButtonElement>, row: IUser) => {
    e.preventDefault();
    setCurrentUserToDelete(row);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
        if (!currentUserToDelete) {
            console.log('No user to delete');
            return;
        }
      await usersService.delete(currentUserToDelete.id!);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data.message);
      }
    } finally {
      setShowConfirmationModal(false);
      userSaved();
    }
  };

  return (
    <div className="p-5">
      <div className="w-1/23">
        <FormButtons
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white"
        >
          Create User
        </FormButtons>
        <UIModal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <ProfileCard
            userId={selectedUserId}
            onUserSaved={() => userSaved()}
          />
        </UIModal>
        <UIModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
        >
          <div className="w-full">
            <h2 className="text-2xl font-bold">Confirm deletion</h2>
            <p className="text-lg">
              Are you sure you want to delete user{' '}
              {currentUserToDelete?.firstName} {currentUserToDelete?.lastName}?
            </p>
            <div className="flex justify-end">
              <FormButtons
                onClick={confirmDelete}
                className="bg-red-500 text-white mr-2"
              >
                Delete
              </FormButtons>
              <FormButtons
                onClick={() => setShowConfirmationModal(false)}
                className="bg-gray-500 text-white"
              >
                Cancel
              </FormButtons>
            </div>
          </div>
        </UIModal>
      </div>
      <Table
        headers={[
          { label: 'First Name', rowKey: 'firstName' },
          { label: 'Last Name', rowKey: 'lastName' },
          { label: 'Email', rowKey: 'email' },
          { label: 'Role', rowKey: 'role' },
        ]}
        data={users}
        count={count}
        pageSize={LIMIT}
        page={page}
        actionButtons={[
          {
            actionButton: (
              <FormButtons className="bg-blue-500 text-white">Edit</FormButtons>
            ),
            onClick: userEdit,
          },
          {
            actionButton: (
              <FormButtons className="bg-red-500 text-white">
                Delete
              </FormButtons>
            ),
            onClick: deleteUser,
          },
        ]}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default UsersPage;
