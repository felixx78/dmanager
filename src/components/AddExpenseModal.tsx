import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import IconSelect from "./IconSelect";
import { useState } from "react";
import ColorSelect from "./ColorSelect";
import { useDispatch } from "react-redux";
import { expensesActions } from "../redux/expensesReducer";
import { v4 as u4 } from "uuid";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function AddExpenseModal({ isOpen, onClose }: Props) {
  const dispatch = useDispatch();

  const [icon, setIcon] = useState("Plant");
  const [color, setColor] = useState("gray.500");
  const [title, setTitle] = useState("");

  const [isTitleInvalid, setIsTitleInvalid] = useState(false);

  const fields = [
    {
      title: "Icon",
      element: <IconSelect icon={icon} setIcon={setIcon} />,
    },
    {
      title: "Color",
      element: <ColorSelect color={color} setColor={setColor} />,
    },
    {
      title: "Title",
      element: (
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          isInvalid={isTitleInvalid}
          placeholder="Title"
        />
      ),
    },
  ];

  const handleSave = () => {
    if (title.length === 0) {
      setIsTitleInvalid(true);
      return;
    }

    setIsTitleInvalid(false);
    dispatch(
      expensesActions.add({
        id: title + "-" + u4(),
        icon,
        title,
        bgColor: color,
        total: 0,
        fields: [{ label: "", amount: null }],
      })
    );
    setTitle("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        width="400px"
        maxW="90vw"
        bgColor="gray.700"
        color="gray.200"
      >
        <ModalHeader>Add Expense</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing="20px" alignItems="flex-start">
            {fields.map((i) => (
              <Flex key={i.title} gap="20px" alignItems="center">
                <Text fontWeight={500} width="60px">
                  {i.title}
                </Text>
                {i.element}
              </Flex>
            ))}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default AddExpenseModal;
