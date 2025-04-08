import React from "react";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message?: string;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  message = "Are you sure you want to delete this item?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center seeThoughts">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          {message}
        </h3>
        <div className="flex justify-center gap-4">
          <button
            className="text-lg font-bold text-white bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="text-lg font-bold text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
