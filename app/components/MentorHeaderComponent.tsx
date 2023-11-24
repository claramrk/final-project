type Props = {
  step: number[];
  titleBold: string | undefined | null;
  titleNormal: string | undefined | null;
  titleUnderlined: string | undefined | null;
};
export default function MentorHeaderComponent(props: Props) {
  return (
    <div className="card blurry">
      <h1 className="mt-10 mb-7 mx-2 border-custom-primary">
        <span className="lg:text-6xl font-bold tracking-tight text-900 text-accent sm:text-3xl ">
          {props.titleBold}
        </span>
        <span className="lg:text-3xl px-2 font-bold tracking-tight text-gray-900 sm:text-2xl ">
          {props.titleNormal}
        </span>
        <span className="lg:text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl decoration-accent decoration-4 underline underline-offset-4">
          {props.titleUnderlined}
        </span>
      </h1>

      <ul className="steps hidden sm:mb-1 sm:flex sm:justify-center">
        <li className={`step ${props.step.includes(1) ? 'step-accent' : '	'}`}>
          Enter personal information
        </li>
        <li className={`step ${props.step.includes(2) ? 'step-accent' : '	'}`}>
          Enter academic background{' '}
        </li>
        <li className={`step ${props.step.includes(3) ? 'step-accent' : '	'}`}>
          Submit registration{' '}
        </li>
        <li className={`step ${props.step.includes(4) ? 'step-accent' : '	'}`}>
          Join the mentor pool{' '}
        </li>

        <li className={`step ${props.step.includes(5) ? 'step-accent' : '	'}`}>
          Wait for match requests{' '}
        </li>
        <li className={`step ${props.step.includes(6) ? 'step-accent' : '	'}`}>
          Accept request within one week{' '}
        </li>
        <li className={`step ${props.step.includes(7) ? 'step-accent' : '	'}`}>
          Start your mentorship journey{' '}
        </li>
      </ul>
    </div>
  );
}
