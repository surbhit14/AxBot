import { ReactNode, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "./Footer";

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "The Problem", href: "/#problem" },
  { name: `Why ${process.env.NEXT_PUBLIC_APP_NAME}?`, href: "/#why" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <div className="min-h-full">
        <div className="bg-indigo-600">
          <Disclosure
            as="nav"
            className="border-b border-indigo-600 border-opacity-25 bg-gradient-to-r from-indigo-900 to-indigo-900 lg:border-none"
          >
            {() => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-24 items-center justify-between">
                    <div className="flex items-center px-2 lg:px-0">
                      <div className="flex-shrink-0 flex items-center gap-x-3">
                        <Image
                          className="block h-12 w-12"
                          height={1109}
                          width={1115}
                          src="/Logo/512x512_color.png"
                          alt=""
                        />
                        <span className="font-black text-white text-3xl">
                          {process.env.NEXT_PUBLIC_APP_NAME}
                        </span>
                      </div>
                      <div className="hidden lg:ml-10 lg:block">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.href === router.pathname
                                  ? "bg-white text-zinc-900"
                                  : "text-zinc-200 hover:text-zinc-900 hover:bg-zinc-100",
                                "rounded-md py-2 px-3 text-lg font-medium transition-all duration-200 ease-in-out"
                              )}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="rounded-md bg-white px-3.5 py-2.5 text-lg font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
        </div>

        <main>{children}</main>

        {/* <Footer /> */}
      </div>
    </>
  );
}
