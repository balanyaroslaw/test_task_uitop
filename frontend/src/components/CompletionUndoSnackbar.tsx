interface CompletionUndoSnackbarProps {
  text: string;
  onUndo: () => void;
}

function CompletionUndoSnackbar({ text, onUndo }: CompletionUndoSnackbarProps) {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,28rem)] -translate-x-1/2">
      <div className="flex items-center justify-between gap-4 border-2 border-black bg-black px-4 py-3 text-white shadow-[6px_6px_0_#ff69b4]">
        <div className="min-w-0">
          <p className="font-pixel text-[12px] tracking-wide text-pink-300">task completed</p>
          <p className="truncate font-vt323 text-xl text-white">{text}</p>
        </div>

        <button
          onClick={onUndo}
          className="shrink-0 border-2 border-pink-300 bg-pink-500 px-3 py-2 font-pixel text-[12px] text-white shadow-[3px_3px_0_#ff69b4] transition-all duration-100 hover:-translate-x-px hover:-translate-y-px"
        >
          Undo
        </button>
      </div>
    </div>
  );
}

export default CompletionUndoSnackbar;