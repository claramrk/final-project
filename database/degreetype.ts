export const degreetype = [
  { id: 1, name: 'Bachelors' },
  {
    id: 2,
    name: 'Masters',
  },
  {
    id: 3,
    name: 'PhD',
  },
];

export const getDegreeTypeById = (id: number) => {
  const degreeRequest = degreetype.find((element) => id === element.id);
  return degreeRequest;
};
