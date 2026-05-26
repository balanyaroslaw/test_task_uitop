import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { GetCategoryDTO } from "../dto/category.dto";
import type { CreateTodoDTO } from "../dto/todo.dto";
import CategoryDropdown from "./CategoryDropdown.tsx";

interface CreateTodoModalProps {
  isOpen: boolean;
  categories: GetCategoryDTO[];
  onClose: () => void;
  onCreate: (dto: CreateTodoDTO) => Promise<void>;
}

interface FormValues {
  text: string;
  categoryId: string;
}

function CreateTodoModal({ isOpen, categories, onClose, onCreate }: CreateTodoModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { text: "", categoryId: "" },
  });

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: FormValues) => {
    try {
      await onCreate({ text: data.text.trim(), categoryId: Number(data.categoryId), status: false });
      reset();
      onClose();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to create task";
      setError("root", { message });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm bg-white border-2 border-black shadow-[6px_6px_0_#000]">

        <div className="flex items-center justify-between bg-black px-4 py-2.5">
          <span className="font-pixel text-[14px] text-white tracking-wide">new task</span>
          <button
            className="font-pixel text-[14px] text-white hover:text-red-300 transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-pixel text-[14px] text-gray-500 tracking-wide">task *</label>
            <input
              {...register("text", {
                required: "Task is required",
                maxLength: { value: 80, message: "Max 80 characters" },
              })}
              type="text"
              placeholder="What needs to be done?"
              autoFocus
              onKeyDown={e => e.key === "Enter" && handleSubmit(onSubmit)()}
              className="
                font-vt323 text-lg px-3 py-2
                bg-gray-50 border-2 border-black
                text-gray-900 placeholder:text-gray-400
                outline-none focus:shadow-[3px_3px_0_#000]
                transition-shadow duration-100
              "
            />
            {errors.text && (
              <span className="font-pixel text-[11px] text-red-600">{errors.text.message}</span>
            )}
          </div>

          <Controller
            name="categoryId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CategoryDropdown
                categories={categories}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {errors.root && (
            <div className="border-2 border-red-500 bg-red-50 px-3 py-2 text-[12px] font-pixel text-red-700">
              {errors.root.message}
            </div>
          )}
        </div>

        <div className="flex gap-2.5 px-5 pb-5">
          <button
            onClick={onClose}
            className="
              flex-1 font-pixel text-[14px] py-3
              bg-gray-100 text-gray-600
              border-2 border-black shadow-[3px_3px_0_#888]
              hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_#888]
              active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_#888]
              transition-all duration-100
            "
          >
            ✕ cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="
              flex-[2] font-pixel text-[14px] py-3
              bg-black text-white
              border-2 border-black shadow-[3px_3px_0_#444]
              hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_#444]
              active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_#444]
              disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0
              transition-all duration-100
            "
          >
            {isSubmitting ? "..." : "＋ create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTodoModal;