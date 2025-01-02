import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import StyledFormRow from "../../ui/StyledFormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabins } from "./useEditCabins";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId } = cabinToEdit;

  const isEditMode = Boolean(editId);

  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: editId ? cabinToEdit : {},
  });

  // const{editId:id , ...cabinToEdit} = cabinToEdit
  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const {editcaib , isEditing} = useEditCabins();


  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    console.log("is editing model: ", isEditMode);

    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditMode) {
      editcaib(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: (data) => reset(),
        }
      );
      // console.log(data);
    } else {
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: (data) => reset(),
        }
      );
    }
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <StyledFormRow
        label={"cabin name"}
        id={"name"}
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
      </StyledFormRow>
      <StyledFormRow
        label={"Max Capacity"}
        id={"maxCapacity"}
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this field is required",
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label={"Regular Price"}
        id={"regularPrice"}
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required",
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label={"Discount"}
        id={"discount"}
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) => {
              // console.log("value we got is,,", getValues().regularPrice);
              // console.log("value we got is,,", value);
              return (
                value <= getValues().regularPrice ||
                "Discount should be less than regular price"
              );
            },
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label={"Description"}
        id={"description"}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </StyledFormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditMode ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>Submit Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
