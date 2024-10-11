
import PHFileUploader from "@/app/components/Forms/PHFileUploader";
import PHForm from "@/app/components/Forms/PHForm";
import PHInputs from "@/app/components/Forms/PHInputs";
import PHModal from "@/app/components/shared/PHModal/PHModal";
import { useCreateSpecialtyMutation } from "@/redux/api/speacialityApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid2 } from "@mui/material";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyModal = ({ open, setOpen }: TProps) => {
const [createSpecialty]= useCreateSpecialtyMutation()

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await createSpecialty(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Specialty created successfully!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <PHModal open={open} setOpen={setOpen} title="Create A New Specialty">
      <PHForm onSubmit={handleFormSubmit}>
        <Grid2 container spacing={2}>
          <Grid2 size={{md:6}}>
            <PHInputs name="title" label="Title" />
          </Grid2>
          <Grid2 size={{md:6}}>
            <PHFileUploader name="file" label="Upload File" />
          </Grid2>
        </Grid2>
        <Button sx={{ mt: 1 }} type="submit">
          Create
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default SpecialtyModal;