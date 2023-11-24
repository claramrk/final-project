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
  const [studylevelIdInput, setStudylevelIdInput] = useState('');
  const [universityIdInputOne, setUniversityIdInputOne] = useState('');
  const [universityIdInputTwo, setUniversityIdInputTwo] = useState('');
  const [universityIdInputThree, setUniversityIdInputThree] = useState('');
  const [subjectIdInputOne, setSubjectIdInputOne] = useState('');
  const [subjectIdInputTwo, setSubjectIdInputTwo] = useState('');
  const [subjectIdInputThree, setSubjectIdInputThree] = useState('');

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
    >
      <div className="my-10 grid gap-x-6 gap-y-12 lg:grid-cols-3 sm:auto-cols-auto">
        <div className="lg:col-span-2 sm:col-span-2">
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
        </div>
        <br />
        <div className="lg:col-span-1 sm:col-span-1">
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
        </div>
        <div className="lg:col-span-1 sm:col-span-1">
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
        </div>
        <div className="lg:col-span-1 sm:col-span-1">
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
        </div>
        <div className="lg:col-span-1 sm:col-span-1">
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
        </div>
        <div className="lg:col-span-1 sm:col-span-1">
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
        </div>
        <div className="lg:col-span-1 sm:col-span-1">
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
        </div>
      </div>
      <button className="btn-custom-third hover:animate-bounce">Next ↓ </button>
    </form>
  );
}
