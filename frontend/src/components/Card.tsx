import React from 'react';

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  title: string;
  description?: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  onClick,
  ...props
}) => {
  return (
    <div
      className="cursor-pointer"
      {...props}
      onClick={() => onClick && onClick()}
    >
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description || ''}
        </p>
        {children ? children : null}
      </div>
    </div>
  );
};

export default Card;
