import test, { expect } from '@playwright/test';
import { subjectlist } from '../migrations/00003-insertSubjects';
import { universitylist } from '../migrations/00005-insertUniversities';

function makeEmail(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function getRandomUni() {
  const universityarray = universitylist;
  const max = universityarray.length > 1 ? universityarray.length : 1;
  const randomUniId = Math.floor(Math.random() * (max - 1) + 1);

  return String(randomUniId);
}

function getRandomSubject() {
  const subjectarray = subjectlist;
  const max = subjectarray.length > 1 ? subjectarray.length : 1;
  const randomSubjectId = Math.floor(Math.random() * (max - 1) + 1);
  return String(randomSubjectId);
}

test('navigation test', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign Out' })).not.toBeVisible();

  await page.getByRole('link', { name: 'Sign Up' }).click();

  // navigate to Sign Up Page - test
  await page.waitForURL('/signUp');
  await expect(page).toHaveURL('/signUp');

  await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Main Page' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign Out' })).not.toBeVisible();

  // Sign up

  await expect(page.getByText('Sign up as:*')).toBeVisible();
  await page.getByRole('button', { name: 'image-select-2 Mentee' }).click();

  await expect(page.getByText('Your email: *')).toBeVisible();
  await page
    .getByPlaceholder('mail@example.com')
    .fill(makeEmail(5) + '@example.com');
  await expect(page.getByText('Your password: *')).toBeVisible();
  await page.getByPlaceholder('**********').fill('3j309j4o9jf3jriue!aojkopq');
  await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();

  await page.getByRole('button', { name: 'Sign up' }).click();

  // navigate to Personal Data Page & fill in data
  await page.waitForURL('/personaldata');
  await expect(page).toHaveURL('/personaldata');

  await page.getByPlaceholder('Jane').fill('Testfirstname');
  await page.getByRole('textbox', { name: 'Doe' }).fill('Testlastname');
  await page.getByPlaceholder('00436645829837').fill('219289182');
  await page
    .locator('select[name="pronounsInput"]')
    .selectOption('she/her/hers');
  await page.locator('input[name="birthdateInput"]').fill('1998-01-12');
  await page.locator('select[name="countryOriginInput"]').selectOption('CAN');
  await page.mouse.wheel(0, 150);
  await page.locator('[data-test-id="upload-button"]').click();
  await expect(
    page
      .frameLocator('[data-test="uw-iframe"]')
      .locator('[data-test="url-btn"]'),
  ).toBeVisible();
  await page
    .frameLocator('[data-test="uw-iframe"]')
    .locator('[data-test="url-btn"]')
    .click();
  await page
    .frameLocator('[data-test="uw-iframe"]')
    .locator('[data-test="search-input-box"]')
    .fill('https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg');
  await page
    .frameLocator('[data-test="uw-iframe"]')
    .locator('[data-test="upload-from-link-btn"]')
    .click();
  await page.frameLocator('[data-test="uw-iframe"]').getByText('Done').click();
  await page.getByRole('button', { name: 'Continue →' }).click();

  // navigate to Matching Data Page & fill in data
  await page.waitForURL('/mentee/matchingdata');
  await expect(page).toHaveURL('/mentee/matchingdata');

  await page.locator('select[name="selectDegreetype"]').selectOption('1');
  await page
    .locator('select[name="targetUniversityOneInput"]')
    .selectOption(getRandomUni());
  await page
    .locator('select[name="targetUniversityTwoInput"]')
    .selectOption(getRandomUni());
  await page
    .locator('select[name="targetUniversityThreeInput"]')
    .selectOption(getRandomUni());
  await page
    .locator('select[name="selectSubjectOne"]')
    .selectOption(getRandomSubject());
  await page
    .locator('select[name="selectSubjectTwo"]')
    .selectOption(getRandomSubject());
  await page
    .locator('select[name="selectSubjectThree"]')
    .selectOption(getRandomSubject());
  await expect(
    page.getByRole('button', { name: 'Register as a mentee' }),
  ).not.toBeVisible();
  await page.getByRole('button', { name: 'Next ↓' }).click();
  await expect(
    page.getByRole('button', { name: 'Register as a mentee' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Register as a mentee' }).click();

  // navigate to MatchingOverview, select mentor & send request
  await page.waitForURL('/mentee/loadingPage', { timeout: 20000 });
  await expect(page).toHaveURL('/mentee/loadingPage');

  // navigate to MatchingOverview, select mentor & send request
  await page.waitForURL('/mentee/matchingoverview');

  await expect(page.getByTestId('uniqueID-0').locator('summary')).toBeVisible();

  await page.getByTestId('uniqueID-0').locator('summary').click();
  await expect(page.getByTestId('uniqueID-0-collapse-content')).toBeVisible();

  await page.getByTestId('uniqueID-1-radio').click();
  await page.getByPlaceholder('Your message').fill(makeEmail(30));
  await page.getByRole('button', { name: 'Send →' }).click();

  // navigate to MenteeDashboard & check if mentor requested
  await page.waitForURL('/mentee/dashboard', { timeout: 20000 });
  await expect(page).toHaveURL('/mentee/dashboard');

  await expect(page.getByTestId('requested-match')).toBeVisible();

  await page.getByTestId('requested-match').click();

  // signOut
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.waitForURL('/signIn');
  await expect(page).toHaveURL('/signIn');
});
