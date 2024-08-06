import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

interface FormButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const FormButtons: FC<FormButtonsProps> = ({ children, ...otherProps }) => {
  return (
    <button className="btn w-full" {...otherProps}>
      {children}
    </button>
  );
};

export default FormButtons;
