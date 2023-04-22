import { Form } from 'bootstrap-4-react';

export const Select = ({
  items,
  selectName,
  isMultiple,
  optionsList: OptionList,
  label,
}) => {
  return (
    <>
      <label htmlFor={selectName}>{label}</label>
      <Form.Select
        name={selectName}
        multiple={isMultiple}
        required
        display="block"
        w="100"
        id={selectName}
      >
        <OptionList items={items} />
      </Form.Select>
    </>
  );
};
