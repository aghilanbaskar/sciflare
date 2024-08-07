import { FormEvent, useEffect, useState, useCallback } from 'react';
import Card from './Card';
import Input from './forms/Input';
import organizationsService from '../services/organization.service';
import { IAuthState } from '../redux/Auth/auth.types';
import { useSelector } from 'react-redux';
import { isAxiosError } from 'axios';

interface OrganizationCardProps {
  onOrganizationSaved?: () => void;
}
const mapState = ({ auth }: { auth: IAuthState }) => ({
  currentUser: auth.user,
  organizationId: auth.organizationId,
});

const OrganizationCard = ({ onOrganizationSaved }: OrganizationCardProps) => {
  const { organizationId } = useSelector(mapState);
  const [companyName, setCompanyName] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      try {
        await organizationsService.update(organizationId, {
          companyName,
        });
        onOrganizationSaved && onOrganizationSaved();
      } catch (error: unknown) {
        console.log(error);
        if (isAxiosError(error)) {
          setErrors([error?.response?.data.message || error.message]);
        } else if (error instanceof Error) {
          setErrors([error.message]);
        }
      }
    },
    [organizationId, onOrganizationSaved]
  );

  const getOrganizationData = useCallback(async () => {
    if (organizationId) {
      const { data: organization } =
        await organizationsService.get(organizationId);
      setCompanyName(organization.name);
    }
  }, [organizationId]);

  useEffect(() => {
    getOrganizationData();
  }, [organizationId, getOrganizationData]);

  return (
    <>
      <Card
        title="Organization"
        description="View your organization here"
        onClick={() => {}}
        className="w-full flex justify-center"
      >
        <div>
          {errors.length > 0 &&
            errors.map((error: string, index: number) => (
              <p key={index} className="text-red-500">
                {error}
              </p>
            ))}
        </div>
        <form
          className="space-y-4 md:space-y-6"
          action="#"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              type="text"
              name="companyName"
              id="companyName"
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
              placeholder="Company name"
              required
              label="Company Name"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Save
          </button>
        </form>
      </Card>
    </>
  );
};

export default OrganizationCard;
