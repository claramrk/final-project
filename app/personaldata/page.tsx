import { getCountries } from '../../database/countries';
import PersonalDataFormComponent from './PersonalDataFormComponent';

export default async function personalData() {
  const countries = await getCountries();

  return (
    <main>
      <div className="pageHeaderSection">
        <h1>My Personal Data</h1>
      </div>
      <PersonalDataFormComponent countries={countries} />
    </main>
  );
}
