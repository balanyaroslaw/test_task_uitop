import type { TCategories } from "../dto/category.dto";
import type { GetTodoDTO } from "../dto/todo.dto";

interface TodoProps {
  todo: GetTodoDTO;
  category: TCategories;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedTodo: Partial<GetTodoDTO>) => void;
}

const CATEGORY_STYLES: Record<TCategories, string> = {
  Work:     "text-blue-800 border-blue-300 bg-blue-50",
  Personal: "text-pink-800 border-pink-300 bg-pink-50",
  Shopping: "text-green-800 border-green-300 bg-green-50",
  Health:   "text-purple-800 border-purple-300 bg-purple-50",
  Finance:  "text-yellow-800 border-yellow-300 bg-yellow-50",
};

const COLOR_BAR: Record<TCategories, string> = {
  Work:     "bg-blue-400",
  Personal: "bg-pink-400",
  Shopping: "bg-green-400",
  Health:   "bg-purple-400",
  Finance:  "bg-yellow-400",
};

function Todo({ todo, onDelete, onUpdate, category }: TodoProps) {
  const barColor  = COLOR_BAR[category]  ?? "bg-pink-400";
  const catStyles = CATEGORY_STYLES[category];

  return (
    <div
      className={`
        w-full
        flex flex-col font-pixel
        bg-white border-2 border-black
        shadow-[4px_4px_0_black]
        transition-all duration-100
        hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_black]
        ${todo.completed ? "opacity-70" : ""}
      `}
    >
      <div className="flex items-stretch border-b-2 border-black">
        <div className={`w-2.5 flex-shrink-0 ${barColor} ${todo.completed ? "!bg-gray-300" : ""}`} />

        <div className="flex-1 px-3.5 py-3">
          <h3
            className={`
              text-[10px] leading-relaxed tracking-tight mb-1.5
              ${todo.completed ? "line-through decoration-black" : ""}
            `}
          >
            {todo.text}
          </h3>
          <span
            className={`
              font-vt323 text-base uppercase tracking-widest
              px-2 py-0.5 border-[1.5px] ${catStyles}
            `}
          >
            {category}
          </span>
        </div>
      </div>

      <div className="flex border-t-0">
        <button
          className={`
            flex-1 px-3.5 py-2.5 text-[14px] text-left
            border-r-2 border-black font-pixel
            transition-colors duration-100
            ${todo.completed
              ? "bg-green-50 text-green-800 hover:bg-green-100"
              : "bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-800"}
          `}
          onClick={() => onUpdate(todo.id, { completed: !todo.completed })}
        >
          {todo.completed ? "■ Completed" : "▷ Mark as completed"}
        </button>

        <button
          className="
            px-4 py-2.5 text-[14px] font-pixel
            bg-gray-50 text-gray-600
            hover:bg-red-50 hover:text-red-800
            transition-colors duration-100
          "
          onClick={() => onDelete(todo.id)}
        >
          ✕ Delete
        </button>
      </div>
    </div>
  );
}

export default Todo;