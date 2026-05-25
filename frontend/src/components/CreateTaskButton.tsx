interface CreateTaskButtonProps {
  onClick: () => void;
}

function CreateTaskButton({ onClick }: CreateTaskButtonProps) {
  return (
    <button
      className="
        font-pixel text-[14px] px-4 py-3
        bg-black text-white
        border-2 border-black
        shadow-[4px_4px_0_#6b7280]
        hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#6b7280]
        active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#6b7280]
        transition-all duration-100
      "
      onClick={onClick}
    >
      ＋ NEW TASK
    </button>
  );
}

export default CreateTaskButton;