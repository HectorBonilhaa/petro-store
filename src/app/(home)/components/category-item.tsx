import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/category-icons";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`}>

      <div className="lg:w-full">
    <Badge
      variant="outline"
      className="flex items-center justify-center gap-2 rounded-lg py-3 lg:w-[9.5rem] lg:h-[3.06rem]"
    >
      {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
      <span className="text-xs font-bold lg:text-sm">{category.name}</span>
    </Badge>
    </div>
    </Link>
  );
};

export default CategoryItem;
