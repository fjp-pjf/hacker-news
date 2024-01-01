import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="font-bold">
        Oops. You have ran into an accidental Bug.
      </div>
      <button
        className="px-6 py-3 ml-2 rounded-md bg-purple-700"
        onClick={handleRedirect}
      >
        Go Home
      </button>
    </div>
  );
};

export default Error;
