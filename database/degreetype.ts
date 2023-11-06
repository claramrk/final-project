export const degreetype = [
  { id: 1, name: 'Bachelors/undergraduate' },
  {
    id: 2,
    name: 'Masters/postgraduate',
  },
  {
    id: 3,
    name: 'PhD/postgraduate',
  },
];

export const getDegreeTypeById = (id: number) => {
  const degreeRequest = degreetype.find((element) => id === element.id);
  return degreeRequest;
};
