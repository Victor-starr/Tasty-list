export const getErrorMessage = (err: any): string => {
  switch (err.name) {
    case "ValidationError":
      return (
        (Object.values(err.errors) as { message: string }[]).at(0)?.message ||
        "Unknown validation error"
      );
    default:
      return err.message;
  }
};
