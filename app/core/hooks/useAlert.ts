import { AlertStatus, useToast } from "@chakra-ui/react";

const useAlert = () => {
  const toast = useToast();

  const showAlert = (message: string, status: AlertStatus) => {
    toast({
      title: message,
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  const showSuccess = (message: string) => {
    showAlert(message, "success");
  };

  const showError = (message: string) => {
    showAlert(message, "error");
  };

  return {
    showSuccess,
    showError,
    showAlert,
  };
};

export default useAlert;
