import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSetting } from "./useEditSetting";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();

  const {isUpdating , updateSetting} = useEditSetting();

  if (isLoading || !settings) {
    return <Spinner />;
  }

  const {
    breakFastPrice = "", // Default value in case the property is undefined
    maxBookingLength = "",
    maxGuestsPerBooking = "",
    minBookingLength = "",
  } = settings;

  function handleupdate(e,field){
    updateSetting({[field]:e.target.value})
    console.log(e.target.value , field);
    
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" defaultValue={minBookingLength} 
        disabled={isUpdating}
        onBlur={e => handleupdate(e,'minBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={maxBookingLength}
        disabled={isUpdating}
        onBlur={e => handleupdate(e,'maxBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="max-guests" defaultValue={maxGuestsPerBooking}
        disabled={isUpdating}
        onBlur={e => handleupdate(e,'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input type="number" id="breakfast-price" defaultValue={breakFastPrice}
        disabled={isUpdating}
        onBlur={e => handleupdate(e,'breakFastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
