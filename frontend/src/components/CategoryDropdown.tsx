import type { GetCategoryDTO } from "../dto/category.dto";

interface CategoryDropdownProps {
  categories: GetCategoryDTO[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  includeAllOption?: boolean;
  allLabel?: string;
}

function CategoryDropdown({
  categories,
  value,
  onChange,
  label = "category",
  includeAllOption = false,
  allLabel = "all categories",
}: CategoryDropdownProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-pixel text-[14px] text-gray-500 tracking-wide">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="
            w-full
            font-vt323 text-lg px-3 py-2 pr-10
            bg-gray-50 border-2 border-black
            text-gray-900
            outline-none focus:shadow-[3px_3px_0_#000]
            transition-shadow duration-100
            appearance-none cursor-pointer
          "
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='black' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
          }}
        >
          {includeAllOption ? (
            <option value="">{allLabel}</option>
          ) : (
            <option value="">— pick one —</option>
          )}
          {categories.map(cat => (
            <option key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CategoryDropdown;