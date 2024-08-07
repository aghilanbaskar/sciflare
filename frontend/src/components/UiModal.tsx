import React from 'react';

interface UIModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const UIModal: React.FC<UIModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="ui-modal-overlay z-100 w-full" onClick={onClose}>
      <div className="ui-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ui-modal-header">
          {title && <h2>{title}</h2>}
          <button className="ui-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="ui-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default UIModal;
