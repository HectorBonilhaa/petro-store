import { ProductsWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: ProductsWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}
    className="lg:w-[180px]">
      <div className="flex flex-col gap-4 lg:w-[180px]">
        <div className=" relative flex h-[170px] items-center justify-center rounded-lg bg-accent lg:h-[190px] lg:w-[180px]">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            style={{
              objectFit: "contain",
            }}
          />

          {product.discountPercentage > 0 && (
           <DiscountBadge className="absolute left-3 top-3">
            {product.discountPercentage}
           </DiscountBadge>
          )}
        </div>

        <div className="flex  flex-col gap-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>

          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {product.discountPercentage > 0 ? (
              <>
                <p className="font-semibold">
                  R$ {product.totalPrice.toFixed(2)}
                </p>

                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                  R$ {Number(product.basePrice).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
