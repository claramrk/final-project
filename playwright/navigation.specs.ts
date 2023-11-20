import test, { expect } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign Out' })).not.toBeVisible();

  await page.getByRole('link', { name: 'Sign Up' }).click();

  // navigate to Sign Up Page
  await expect(page).toHaveURL('http://localhost:3000/signUp');

  await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Main Page' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign Out' })).not.toBeVisible();

  await expect(page.getByText('Sign up as:*')).toBeVisible();
  await expect(page.getByText('Your email: *')).toBeVisible();
  await page
    .getByPlaceholder('mail@example.com')
    .fill('playwright@example.com');
  await expect(page.getByText('Your password: *')).toBeVisible();
  await page.getByPlaceholder('**********').fill('3j309j4o9jf3jriue!aojkopq');
  await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();

  await page.getByRole('button', { name: 'Sign up' }).click();

  // navigate to Personal Data Page
  await page.waitForURL('http://localhost:3000/personaldata');
  await expect(page).toHaveURL('http://localhost:3000/personaldata');

  /*   await expect(page.getByRole('link', { name: 'Hermannshöhle' })).toBeVisible();
  await expect(page.getByTestId('products-link')).toBeVisible();

  await page.getByRole('link', { name: 'Tickets' }).click();
  await page.waitForURL('http://localhost:3000/products');
  await expect(page).toHaveURL('http://localhost:3000/products');

  await page.getByTestId('product-1').click();
  await page.waitForURL('http://localhost:3000/products/1');
  await expect(page).toHaveURL('http://localhost:3000/products/1');

  await page.getByTestId('product-add-to-cart').click();
  await expect(page.getByTestId('cart-count')).toHaveText('1');

  await page.getByRole('link', { name: 'Tickets' }).click();
  await page.waitForURL('http://localhost:3000/products');
  await expect(page).toHaveURL('http://localhost:3000/products');

  await page.getByTestId('product-2').click();
  await page.waitForURL('http://localhost:3000/products/2');
  await expect(page).toHaveURL('http://localhost:3000/products/2');

  await page.getByTestId('product-quantity').fill('2');
  await page.getByTestId('product-add-to-cart').click();
  await expect(page.getByTestId('cart-count')).toHaveText('3');

  await page.getByRole('banner').getByTestId('cart-link').click();
  await page.waitForURL('http://localhost:3000/cart');
  await expect(page).toHaveURL('http://localhost:3000/cart');

  await expect(
    page
      .getByTestId('cart-product-1')
      .locator('div')
      .filter({
        hasText:
          'TICKETTICKETTICKET#########WOCHENTAGDATUMJAHRHermannshöhleKinderKirchberg am Wec',
      })
      .nth(1),
  ).toBeVisible();

  await expect(
    page
      .getByTestId('cart-product-2')
      .locator('div')
      .filter({
        hasText:
          'TICKETTICKETTICKET#########WOCHENTAGDATUMJAHRHermannshöhleErmäßigtKirchberg am W',
      })
      .nth(1),
  ).toBeVisible();

  await expect(page.getByTestId('cart-product-remove-1')).toBeVisible();
  await page.getByTestId('cart-product-remove-1').click();
  await expect(page.getByTestId('cart-product-remove-1')).not.toBeVisible();

  await expect(
    page
      .getByTestId('cart-product-2')
      .locator('div')
      .filter({
        hasText:
          'TICKETTICKETTICKET#########WOCHENTAGDATUMJAHRHermannshöhleErmäßigtKirchberg am W',
      })
      .nth(1),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Tickets bestellen' }).click();
  await page.waitForURL('http://localhost:3000/checkout');
  await expect(page).toHaveURL('http://localhost:3000/checkout');

  await expect(page.getByTestId('checkout-first-name')).toBeVisible();
  await expect(page.getByTestId('checkout-first-name')).toBeEmpty();
  await page.getByTestId('checkout-first-name').fill('VornameTest');

  await page.getByTestId('checkout-confirm-order').click();

  await page.getByTestId('checkout-last-name').fill('NachnameTest');
  await page.getByTestId('checkout-email').fill('EmailTest');
  await page.getByTestId('checkout-address').fill('AddressTest');

  await page.getByTestId('checkout-city').fill('CityTest');
  await page.getByTestId('checkout-postal-code').fill('PostalcodeTest');
  await page.getByTestId('checkout-country').fill('CountryTest');
  await page.getByTestId('checkout-credit-card').fill('CreditCardTest');
  await page.getByTestId('checkout-expiration-date').fill('ExpirationdateTest');
  await page.getByTestId('checkout-security-code').fill('SecuritycodeTest');

  await page.getByTestId('checkout-confirm-order').click();
  await page.waitForURL('http://localhost:3000/thankYou');
  await expect(page).toHaveURL('http://localhost:3000/thankYou');
  await expect(
    page.getByRole('heading', { name: 'Danke für deine Bestellung!' }),
  ).toBeVisible(); */
});
