
export function filterSelect(options, filterValue) {
  const lowerFilterValue = filterValue.toLowerCase();
  let filteredOptions = options.filter(option => {
    const optionValue = String(option.value).toLowerCase();
    const optionLabel = String(option.label).toLowerCase();
    return (optionValue.indexOf(lowerFilterValue) > -1 || optionLabel.indexOf(lowerFilterValue) > -1);
  });
  // This is the important part
  if (filterValue.length > 0) {
    filteredOptions = filteredOptions.concat({ value: filterValue, label: `Ajouter ${filterValue} ?`, create: true });
  }
  return filteredOptions;
}
