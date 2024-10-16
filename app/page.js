
import Link from "next/link";


export default function Home() {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Make your contents with Ai
            <strong className="font-extrabold text-primary
                 sm:block"> Create your Ai Shorts </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Start Creating your Ai Short Videos and Make your contents faster.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-primary px-12 
                    py-3 text-sm font-medium text-white shadow
                     hover:bg-gray-500 focus:outline-none focus:ring
                      active:bg-gray-500 sm:w-auto"
              href="/dashboard"
            >
              Get Started
            </Link>


          </div>
        </div>
      </div>
      {/* 
        <Image src='/dashboard.jpg'
        alt='dashboard-image'
        width={1000}
        height={600}
        className='-mt-20 rounded-xl border-2'
        /> 
      */}
    </section>
  );
}
