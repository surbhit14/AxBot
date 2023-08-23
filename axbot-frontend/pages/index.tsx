import Head from "next/head";
import Layout from "@/components/Utilities/Layout";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Landing() {
  const supabase = createClientComponentClient();
  const [userData, setUserData] = useState<any>(null);

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });

    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    setUserData(data);
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <>
      <Head>
        <title></title>
        <meta name="title" content="" />
        <meta name="description" content="" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="/meta-image.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="" />
        <meta property="twitter:title" content="" />
        <meta property="twitter:description" content="" />
        <meta property="twitter:image" content="/meta-image.jpg" />
      </Head>

      <Layout>
        <div className="dark:bg-slate-900 bg-white dark:text-slate-200">
          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 dark:text-slate-200 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  For crypto payouts and emissary.
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight dark:text-slate-200 text-gray-900 sm:text-6xl">
                  Make multi-chain bulk payments with ease!
                </h1>
                <p className="mt-6 text-lg leading-8 dark:text-slate-200 text-gray-600">
                  Powered by Axelar
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button
                    onClick={signInWithDiscord}
                    className="rounded-md  bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </button>
                  <a
                    href="how-to-use"
                    className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
