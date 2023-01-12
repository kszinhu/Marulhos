import { Box, Button, Modal } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { FormModelInterface } from "../../config/forms";
import { handleFieldTypes } from "../../pages/Manager";

interface IModalSchema {
  modelSchema: FormModelInterface;
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  form: UseFormReturnType<any>;
}

const ModalSchema = ({ modelSchema, state, form }: IModalSchema) => {
  const [open, setOpen] = state;

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title={`Formulário de ${modelSchema.title}`}
    >
      {modelSchema.fields.map((field) => handleFieldTypes(field, form))}
      <Box mt='md'>
        <Button fullWidth variant='outline' onClick={() => setOpen(false)}>
          Concluído
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalSchema;
