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
  const [universityIdInput, setUniversityIdInput] = useState('');
  const [subjectIdInput, setSubjectIdInput] = useState('');
  const [attendanceTypeIdInput, setAttendanceTypeIdInput] = useState('');
  const [studylevelIdInput, setStudylevelIdInput] = useState('');

  const router = useRouter();

  async function handleCreateMentorUniversityBackground() {
    const currentUserID = Number(props.userdata.id);

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
    router.refresh();
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateMentorUniversityBackground();
      }}
    >
      <div className=" mt-10 mb-5 grid gap-x-8 gap-y-8 lg:grid-cols-4 sm:auto-cols-auto">
        <div className="">
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
        </div>
        <div className="">
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
        </div>
        <div className="">
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
        </div>

        <div className="">
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
        </div>
      </div>
      <div className="flex justify-end	mb-5 ">
        <button className="btn-custom-third">Add degree</button>
      </div>
    </form>
  );
}
