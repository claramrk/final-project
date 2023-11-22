import ButtonGoBack from '../components/ButtonGoBack';

export default function notFound() {
  return (
    <main className="grid p-custom-primary min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-secondary-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Sorry, there was an error!
        </h1>

        <ButtonGoBack />
      </div>
    </main>
  );
}
