export const Select = ({
  items,
  selectName,
  isMultiple,
  optionsList: OptionList,
}) => {
  return (
    <>
      <select
        name={selectName}
        multiple={isMultiple}
        size={isMultiple ? 6 : 1}
        required
      >
        <OptionList items={items} />
      </select>
    </>
  );
};
