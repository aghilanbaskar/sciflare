import React from 'react';
import OrganizationCard from '../components/OrganizationCard';

const OrganizationPage = () => {
  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="w-1/3">
          <OrganizationCard></OrganizationCard>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;
