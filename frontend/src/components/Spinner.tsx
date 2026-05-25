function Spinner() {
  return (
    <div className="flex min-h-[240px] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-pink-200 border-t-pink-500 shadow-[0_0_24px_rgba(236,72,153,0.35)]" />
        <p className="font-pixel text-[10px] tracking-[0.35em] text-pink-500">
          LOADING
        </p>
      </div>
    </div>
  );
}

export default Spinner;