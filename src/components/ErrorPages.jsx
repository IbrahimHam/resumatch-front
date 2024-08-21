import React from "react";
import { CircleAlert, MoveLeft, CircleOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section class="bg-slate-100 dark:bg-slate-900 ">
        <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div class="flex flex-col items-center max-w-sm mx-auto text-center">
            <p class="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
              <CircleAlert size={32} />
            </p>
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Page not found
            </h1>
            <p class="mt-4 text-gray-500 dark:text-gray-400">
              The page you are looking for doesn't exist. Here are some helpful
              links:
            </p>

            <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <button
                onClick={() => window.history.back()}
                class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
              >
                <MoveLeft size={20} />

                <span>Go back</span>
              </button>

              <button
                onClick={() => navigate("/")}
                class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                Take me home
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section class="bg-slate-100 dark:bg-slate-900 ">
        <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div class="flex flex-col items-center max-w-sm mx-auto text-center">
            <p class="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
              <CircleOff size={32} />
            </p>
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Unauthorized
            </h1>
            <p class="mt-4 text-gray-500 dark:text-gray-400">
              You don't have access to this page. Here are some helpful links:
            </p>

            <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <button
                onClick={() => window.history.back()}
                class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
              >
                <MoveLeft size={20} />

                <span>Go back</span>
              </button>

              <button
                onClick={() => navigate("/")}
                class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                Take me home
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { NotFoundPage, UnauthorizedPage };
