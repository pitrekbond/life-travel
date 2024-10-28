import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-300 rounded-md py-2 px-2 cursor-pointer font-semibold w-1/3 mt-6 hover:bg-accent-500 active:bg-accent-500 transition-colors duration-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "Adding..." : "Add city"}
    </button>
  );
}

export default SubmitButton;
