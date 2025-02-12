import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

/**
 * A styled select component with a dropdown menu. The options should be
 * an array of objects with a `value` and `label` property.
 *
 * @param {object[]} options - The options to render in the dropdown menu.
 * @param {string|number} value - The value of the currently selected option.
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} onChange -
 *     A function that gets called when the user selects a new option.
 * @param {object} [props] - Additional props to pass to the underlying
 *     HTML element.
 */
function Select({ options, value ,onChange,...props }) {
  return (
    <StyledSelect value={value} {...props} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </StyledSelect>
  );
}

export default Select;
