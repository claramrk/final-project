type Props = {
  step: number;
  titleBold: string | undefined | null;
  titleNormal: string | undefined | null;
  titleUnderlined: string | undefined | null;
};
export default function MenteeHeaderComponent(props: Props) {
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
        <li className={`step ${props.step === 1 ? 'step-accent' : '	'}`}>
          Enter personal information
        </li>
        <li className={`step ${props.step === 2 ? 'step-accent' : '	'}`}>
          Enter target universities & subjects
        </li>
        <li className={`step ${props.step === 3 ? 'step-accent' : '	'}`}>
          Choose your best mentor match
        </li>
        <li className={`step ${props.step === 4 ? 'step-accent' : '	'}`}>
          Wait for mentor acceptance
        </li>
        <li className={`step ${props.step === 5 ? 'step-accent' : '	'}`}>
          Start your mentorship journey
        </li>
        <li className={`step ${props.step === 6 ? 'step-accent' : '	'}`}>
          Apply to your dream uni!
        </li>
      </ul>
    </div>
  );
}
