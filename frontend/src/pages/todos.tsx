import { useEffect, useRef, useState } from "react";
import type { GetTodoDTO } from "../dto/todo.dto";
import { todosService } from "../services/todos.service";
import Todo from "../components/Todo";
import { categoriesService } from "../services/categories.service";
import type { GetCategoryDTO } from "../dto/category.dto";
import Spinner from "../components/Spinner";
import CreateTodoModal from "../components/CreateModalWindow";
import CreateTaskButton from "../components/CreateTaskButton";
import CategoryDropdown from "../components/CategoryDropdown.tsx";
import CompletionUndoSnackbar from "../components/CompletionUndoSnackbar";

function TodosPage() {
  const [todos, setTodos] = useState<GetTodoDTO[]>([]);
  const [categories, setCategories] = useState<GetCategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [undoTodo, setUndoTodo] = useState<GetTodoDTO | null>(null);
  const pendingCompletionTimers = useRef<Record<number, number>>({});
  const pendingCompletionSnapshots = useRef<Record<number, GetTodoDTO>>({});

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await todosService.getTodos();
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesResponse = await categoriesService.getCategories();
        setCategories(categoriesResponse.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchTodos()]);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleCreate = async (data: { text: string; categoryId: number; status: boolean }) => {
    await todosService.createTodo(data);

    const todosResponse = await todosService.getTodos();
    setTodos(todosResponse);
  };

  const handleDelete = async (id: number) => {
    await todosService.deleteTodo(id.toString());

    const todosResponse = await todosService.getTodos();
    setTodos(todosResponse);
  };

  const handleUndoComplete = async () => {
    if (!undoTodo) return;

    const timerId = pendingCompletionTimers.current[undoTodo.id];
    if (timerId) {
      clearTimeout(timerId);
      delete pendingCompletionTimers.current[undoTodo.id];
    }

    const snapshot = pendingCompletionSnapshots.current[undoTodo.id] ?? undoTodo;

    await todosService.updateTodo(undoTodo.id.toString(), { status: false });
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === undoTodo.id ? { ...snapshot, completed: false } : todo,
      ),
    );

    delete pendingCompletionSnapshots.current[undoTodo.id];
    setUndoTodo(null);
  };

  const handleUpdate = async (id: number, updatedTodo: Partial<GetTodoDTO>) => {
    const nextCompleted = updatedTodo.completed;

    if (typeof nextCompleted !== "boolean") return;

    const currentTodo = todos.find(todo => todo.id === id);
    if (!currentTodo) return;

    if (nextCompleted) {
      const snapshot = { ...currentTodo, completed: false };

      const existingTimer = pendingCompletionTimers.current[id];
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      pendingCompletionSnapshots.current[id] = snapshot;
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? { ...todo, completed: true } : todo)),
      );
      setUndoTodo({ ...currentTodo, completed: true });

      await todosService.updateTodo(id.toString(), { status: true });

      pendingCompletionTimers.current[id] = window.setTimeout(async () => {
        await todosService.deleteTodo(id.toString());
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        delete pendingCompletionTimers.current[id];
        delete pendingCompletionSnapshots.current[id];
        setUndoTodo(current => (current?.id === id ? null : current));
      }, 5000);

      return;
    }

    const existingTimer = pendingCompletionTimers.current[id];
    if (existingTimer) {
      clearTimeout(existingTimer);
      delete pendingCompletionTimers.current[id];
      const snapshot = pendingCompletionSnapshots.current[id];

      if (snapshot) {
        await todosService.updateTodo(id.toString(), { status: false });
        setTodos(prevTodos =>
          prevTodos.map(todo => (todo.id === id ? { ...snapshot, completed: false } : todo)),
        );
        delete pendingCompletionSnapshots.current[id];
        setUndoTodo(current => (current?.id === id ? null : current));
      }
      return;
    }

    await todosService.updateTodo(id.toString(), { status: false });
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, completed: false } : todo)),
    );
  };

  const filterTodos = async (selectedCategoryId: string) => {
    console.log("Filtering todos by category ID:", selectedCategoryId);
    setSelectedCategoryId(selectedCategoryId);
    if (!selectedCategoryId) {
      const todosResponse = await todosService.getTodos();
      setTodos(todosResponse);
      return;
    }
    const filteredTodos = await todosService.getTodosByCategory(Number(selectedCategoryId));
    setTodos(filteredTodos);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
    <div className="flex w-full p-4 justify-center">
      <div className="flex flex-col w-full lg:w-1/2 gap-2 p-4">

        <div className="flex justify-end mb-2">
          <CreateTaskButton onClick={() => setOpenCreateModal(true)} />
        </div>

        <CategoryDropdown
          categories={categories}
          value={selectedCategoryId}
          onChange={filterTodos}
          label="filter by category"
          includeAllOption
          allLabel="all categories"
        />

        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 border-2 border-black bg-white px-6 py-12 shadow-[4px_4px_0_#000]">
            <div className="text-4xl">(•̀ᴗ•́)و</div>
            <h2 className="font-pixel text-[14px] text-black tracking-wide text-center">
              {selectedCategoryId ? "no todos in this category" : "no todos yet"}
            </h2>
            <p className="max-w-sm text-center font-vt323 text-xl text-gray-600">
              {selectedCategoryId
                ? "try another category or clear the filter to see all tasks."
                : "create your first task to start building the list."}
            </p>
          </div>
        ) : (
          todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              category={categories.find(cat => cat.id === todo.categoryId)?.name ?? "Personal"}
            />
          ))
        )}
      </div>
    </div>
    {openCreateModal && (
      <CreateTodoModal
        isOpen={openCreateModal}
        categories={categories}
        onClose={() => setOpenCreateModal(false)}
        onCreate={handleCreate}
      />
    )}
    {undoTodo && (
      <CompletionUndoSnackbar text={undoTodo.text} onUndo={handleUndoComplete} />
    )}
    </>
  );
}

export default TodosPage