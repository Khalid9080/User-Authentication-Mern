import React from 'react';

const Signup = () => {
    return (
        <div
            className="mx-auto w-full max-w-sm rounded-xl border border-zinc-200 bg-white ring-4 ring-zinc-300/25"
        >
            <div className="flex grow items-center px-6 py-10 sm:px-10 sm:py-14">
                <div className="grow">
                    <div className="text-center">
                        <svg
                            viewBox="0 0 78 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mb-6 inline-block w-10 text-zinc-400"
                        >
                            {/* SVG paths unchanged */}
                        </svg>
                        <h1 className="text-2xl font-extrabold">Create a new account</h1>
                        <h2 className="mt-1 text-sm leading-relaxed text-zinc-600">
                            Already have an account?
                            <a
                                href="javascript:void(0)"
                                className="text-zinc-800 underline decoration-slate-300 underline-offset-2 hover:text-zinc-900"
                            >Log in</a>
                        </h2>
                    </div>
                    <form className="mt-5 flex flex-col gap-5">
                        <div className="space-y-1">
                            <label htmlFor="name" className="inline-block text-sm font-medium">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                className="block w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm/6 font-medium placeholder-zinc-500 focus:border-zinc-500 focus:ring-3 focus:ring-zinc-500/50 focus:outline-hidden"
                            />
                        </div>
                        {/* other input fields similarly updated */}
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm leading-5 font-medium text-white hover:border-zinc-900 hover:bg-zinc-900 hover:text-white focus:ring-2 focus:ring-zinc-500/50 focus:outline-hidden active:border-zinc-700 active:bg-zinc-700"
                        >
                            Register
                        </button>
                        <div className="text-center text-xs font-medium text-zinc-500">
                            Amazing App &copy; 2024 and beyond
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
