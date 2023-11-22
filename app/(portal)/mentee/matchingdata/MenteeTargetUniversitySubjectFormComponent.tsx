'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

export default function MenteeTargetUniversitySubjectFormComponent(
  props: Props,
) {
  const [studylevelIdInput, setStudylevelIdInput] = useState(1);
  const [universityIdInputOne, setUniversityIdInputOne] = useState(1);
  const [universityIdInputTwo, setUniversityIdInputTwo] = useState(1);
  const [universityIdInputThree, setUniversityIdInputThree] = useState(1);
  const [subjectIdInputOne, setSubjectIdInputOne] = useState(1);
  const [subjectIdInputTwo, setSubjectIdInputTwo] = useState(1);
  const [subjectIdInputThree, setSubjectIdInputThree] = useState(1);

  const router = useRouter();

  async function handleCreateMenteeTargetUniversitySubject() {
    const currentUserID = Number(props.userdata.id);

    await fetch('/../../../api/matchingdata/menteeTargetUniversitySubject', {
      method: 'POST',
      body: JSON.stringify({
        userId: Number(currentUserID),
        studylevel: Number(studylevelIdInput),
        firstUniversityId: Number(universityIdInputOne),
        firstSubjectId: Number(subjectIdInputOne),
        secondUniversityId: Number(universityIdInputTwo),
        secondSubjectId: Number(subjectIdInputTwo),
        thirdUniversityId: Number(universityIdInputThree),
        thirdSubjectId: Number(subjectIdInputThree),
      }),
    });
    router.refresh();
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateMenteeTargetUniversitySubject();
      }}
      className="mt-10 mb-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4"
    >
      <LabelAndSelectComponent
        inputName="selectDegreetype"
        labeltext="Degree level of application:"
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
        inputName="targetUniversityOneInput"
        labeltext="Dream university 1:"
        required={true}
        // could be an issue that there is no (number) around this
        onChangeFunction={setUniversityIdInputOne}
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
        inputName="targetUniversityTwoInput"
        labeltext="Dream university 2:"
        required={true}
        // could be an issue that there is no (number) around this
        onChangeFunction={setUniversityIdInputTwo}
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
        inputName="targetUniversityThreeInput"
        labeltext="Dream university 3:"
        required={true}
        // could be an issue that there is no (number) around this
        onChangeFunction={setUniversityIdInputThree}
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
        inputName="selectSubjectOne"
        labeltext="Dream Subject 1:"
        required={true}
        // could be an issue that there is no (number) around this
        onChangeFunction={setSubjectIdInputOne}
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
        inputName="selectSubjectTwo"
        labeltext="Dream Subject 2:"
        required={true}
        // could be an issue that there is no (number) around this
        onChangeFunction={setSubjectIdInputTwo}
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
        inputName="selectSubjectThree"
        labeltext="Dream Subject 3:"
        required={true}
        // could be an issue that there is no (number) around this
        onChangeFunction={setSubjectIdInputThree}
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

      <button className="btn-custom-primary">
        Submit all University Information
      </button>
    </form>
  );
}
