import { Spinner } from "./ui/spinner";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center gap-1">
        <Spinner className="w-4 h-4 text-primary" />
        <p className="text-primary">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
