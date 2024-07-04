import { useLogin } from "../hooks/useLogin";

function SignIn() {
  const login = useLogin()
  return (
    <div>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div>
          <div className="flex items-center flex-col space-y-3">
            <h1 className="text-4xl font-bold">Welcome to Zuchatbot.io</h1>
            <p className="text-lg">Create, manage, and deploy bots at scale</p>
          </div>
          <div className="flex items-center flex-col mt-5 space-y-2">
            <button className="text-xl border-1 py-2 px-4 bg-[#3A83FB] rounded-md text-white" onClick={login}>
              Sign in with google
            </button>
            <p className="text-xs text-gray-500">
              By signing up, you agree to our terms of service and privacy
              policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
