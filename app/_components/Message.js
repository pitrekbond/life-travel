export default function Message({ message }) {
  return (
    <p className="text-center text-2xl w-4/5 font-semibold bg-primary-400 rounded-md p-2 border-4 border-accent-300">
      {message}
    </p>
  );
}
