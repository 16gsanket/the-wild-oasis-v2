import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";
import StyledFormRow from "../../ui/StyledFormRow";

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

function CreateCabinForm1() {

  const{register , handleSubmit ,getValues , formState, reset} = useForm();
  const{errors} = formState

  const queryClient = useQueryClient()  

  const{mutate , isLoading} = useMutation({
    mutationFn: createCabins,
    onSuccess:()=>{
      toast.success('Cabin Created Successfully')
      queryClient.invalidateQueries(
        {
          queryKey:['cabin']
        }
      )
      reset()
    },
    onError:(err)=>{
      toast.error(err.message)
    }
  })

  function onSubmit(data){
    mutate({...data , image:data.image[0]});
    // console.log(data.image[0].name);
    
  }
  function onError(error){
    console.log(error);  
  }
    return (
    <Form onSubmit={handleSubmit(onSubmit , onError)}>

      <StyledFormRow label={'cabin name'} id={'name'} error={errors?.name?.message}>
        <Input type="text" id="name" {...register('name',{
          required:"this field is required"
        })}/>
      </StyledFormRow>
      <StyledFormRow label={'Max Capacity'} id={'maxCapacity'} error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register('maxCapacity',{
          required:"this field is required",
        })}/>
      </StyledFormRow>

      <StyledFormRow label={'Regular Price'} id={'regularPrice'} error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register('regularPrice',{
          required:"this field is required"          
        })}/>
      </StyledFormRow>

      <StyledFormRow label={'Discount'} id={'discount'} error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register('discount',{
          required:"this field is required",
          validate:(value) => {
            // console.log("value we got is,,", getValues().regularPrice);
            // console.log("value we got is,,", value);   
            return value <= getValues().regularPrice || "Discount should be less than regular price"
          }
        })}/>
      </StyledFormRow>

      <StyledFormRow label={'Description'} id={'description'} error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description',{
          required:"this field is required"
        })}/>
      </StyledFormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput 
          id="image" 
          accept="image/*"
          {...register('image',{
            required:"this field is required",
            
          })}
         />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Submit Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm1;
