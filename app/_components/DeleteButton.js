

export default function DeleteButton({ id, onDelete }) {
  function handleDelete(e) {
    e.preventDefault();
    onDelete(id);
  }
  return (
    <button
      className="h-4 aspect-[1/1] rounded-full bg-primary-800 cursor-pointer transition-all flex items-center justify-center hover:bg-primary-600"
      onClick={handleDelete}
    >
      &times;
    </button>
  );
}
