import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  useToast
} from "@chakra-ui/react";
import useAlert from "app/core/hooks/useAlert";
import { useMutation } from "blitz";
import dayjs from "dayjs";
import logProgress from "../mutations/logProgress";

export type LogProgressModalProps = {
  groupId: string;
}

const LogProgressModal : React.FC<LogProgressModalProps> = ({ groupId }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { showError } = useAlert();
  const [logProgressMutation] = useMutation(logProgress, { onError: (e: Error) => showError(e.message) });

  return (
    <>
      <Button mt={4} alignSelf="flex-end" onClick={onOpen}>Log progress</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log progress</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text><Text as="span" fontWeight="bold">Date:</Text> {dayjs().format('YYYY MMM DD')}</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" colorScheme="red" onClick={onClose}>Cancel</Button>
            <Button onClick={() => { logProgressMutation({ groupId }); }}>Log</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogProgressModal;
