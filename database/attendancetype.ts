export const attendancetype = [
  { id: 1, name: 'Accepted' },
  {
    id: 2,

    name: 'Attending',
  },
  {
    id: 3,

    name: 'Completed',
  },
];

export const getAttendanceTypeById = (id: number) => {
  const attendanceRequest = attendancetype.find((element) => id === element.id);
  return attendanceRequest;
};
