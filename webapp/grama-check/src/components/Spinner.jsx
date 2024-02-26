import HashLoader from "react-spinners/HashLoader";

export default function Spinner({ isLoading }) {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full flex items-center justify-center ${
        isLoading ? "visible" : "invisible"
      }`}
    >
      <HashLoader color="#7d8cdd" size={50} loading={isLoading} />
    </div>
  );
}
