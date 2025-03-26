export const getErrorMessage = (err: any): string => {
  if (err.name === "ValidationError") {
    return (
      (Object.values(err.errors) as { message: string }[]).at(0)?.message ||
      "Unknown validation error"
    );
  }

  // Handle specific Mongoose errors
  if (err.message.includes("Cast to ObjectId failed")) {
    return "Invalid ID format. Please provide a valid recipe ID.";
  }

  return err.message || "An unknown error occurred";
};
