import ProductItem from "@/components/ui/Product-item";
import computeProductTotalPrice from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden lg:pb-12 lg:gap-5">
      {products.map((product) => (
        <div key={product.id} className=" w-[170px] max-w-[170px] lg:w-[11.25rem] lg:max-w-[11.25rem] lg:h-[11.875rem] lg:max-h-[11.875rem] lg:gap-5 lg:mb-5">
          <ProductItem product={computeProductTotalPrice(product)} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
