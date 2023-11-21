export const categoryToOption = (category) => {
  return {
    value: category._id,
    label: category.title,
  };
};

export const filterCategories = (inputValue, categoriesData) => {
  const filteredOptions = categoriesData
    .map(categoryToOption)
    .filter((category) => {
      return category.label.toLowerCase().includes(inputValue.toLowerCase());
    });

  return filteredOptions;
};
