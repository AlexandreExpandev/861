export interface CreateTaskFormProps {
  /**
   * Callback function to be executed on successful task creation.
   */
  onSuccess?: () => void;
  /**
   * Callback function to be executed when the form is cancelled.
   */
  onCancel?: () => void;
}
