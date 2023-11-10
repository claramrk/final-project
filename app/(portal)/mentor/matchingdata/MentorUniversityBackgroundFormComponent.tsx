'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { attendancetype } from '../../../../database/attendancetype';
import { degreetype } from '../../../../database/degreetype';
import { Subject } from '../../../../migrations/00002-createTableSubjects';
import { University } from '../../../../migrations/00004-createTableUniversities';
import { UserAll } from '../../../../migrations/00008-createTableUsers';
import LabelAndSelectComponent from '../../../components/LabelandSelectInput';

type Props = {
  universities: University[];
  subjects: Subject[];
  userdata: UserAll;
};

export default function MentorUniversityBackgroundFormComponent(props: Props) {
  const [universityIdInput, setUniversityIdInput] = useState(1);
  const [subjectIdInput, setSubjectIdInput] = useState(1);
  const [attendanceTypeIdInput, setAttendanceTypeIdInput] = useState(1);
  const [studylevelIdInput, setStudylevelIdInput] = useState(1);

  const router = useRouter();

  async function handleCreateMentorUniversityBackground() {
    const currentUserID = await Number(props.userdata.id);

    await fetch('/../../../api/matchingdata/mentorUniversityBackground', {
      method: 'POST',
      body: JSON.stringify({
        userId: Number(currentUserID),
        studylevel: Number(studylevelIdInput),
        attendanceType: Number(attendanceTypeIdInput),
        universityId: Number(universityIdInput),
        subjectId: Number(subjectIdInput),
      }),
    });
    await router.refresh();
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateMentorUniversityBackground();
      }}
      className="mt-10 mb-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5"
    >
      <LabelAndSelectComponent
        inputName="selectUniversity"
        labeltext=" Name of the university:"
        required={true}
        // could be an issue that there is no (number) around this
        onChangeFunction={setUniversityIdInput}
      >
        <option key="dataID-default-select" value="default-select">
          --Choose university--
        </option>
        {props.universities.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </LabelAndSelectComponent>
      <LabelAndSelectComponent
        inputName="selectSubject"
        labeltext=" Name of the subject:"
        required={true}
        // could be an issue that there is no (number) around this
        onChangeFunction={setSubjectIdInput}
      >
        <option key="dataID-default-select" value="default-select">
          --Choose subject--
        </option>

        {props.subjects.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </LabelAndSelectComponent>
      <LabelAndSelectComponent
        inputName="selectDegreetype"
        labeltext="Select the type of degree:"
        required={true}
        // could be an issue that there is no (number) around this
        onChangeFunction={setStudylevelIdInput}
      >
        <option key="dataID-default-select" value="default-select">
          --Choose degreetype--
        </option>

        {degreetype.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </LabelAndSelectComponent>
      <LabelAndSelectComponent
        inputName="selectAttendancetype"
        labeltext="Select type of attendance:"
        required={true}
        // could be an issue that there is no (number) around this
        onChangeFunction={setAttendanceTypeIdInput}
      >
        <option key="dataID-default-select" value="default-select">
          --Choose attendancetype--
        </option>

        {attendancetype.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </LabelAndSelectComponent>

      <button className="btn-custom-primary" id="submitPersonalDetails">
        Add degree to my submitted Background
      </button>
    </form>
  );
}
