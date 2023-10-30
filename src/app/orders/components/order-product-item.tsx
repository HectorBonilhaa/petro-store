import computeProductTotalPrice from "@/helpers/product";
import { OrderProduct, Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);
  return (
    <div className=" flex items-center gap-4">
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="max-h-auto[80% h-auto w-auto max-w-[80%] object-contain"
          alt={orderProduct.product.name}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="mb-1 flex rounded-md bg-accent px-3 py-1 w-fit">
          <p className="text-[10px]">
            Entrega garantida por{" "}
            <span className="font-semibold text-yellow-300">
              {" "}
              CORREIOS SEDEX ©
            </span>
          </p>
        </div>

        <p className="text-xs">{orderProduct.product.name}</p>

        <div className="flex items-center justify-between gap-1">
         <div className="flex items-center gap-1">
         <p className="text-sm font-bold">
            R${productWithTotalPrice.totalPrice.toFixed(2)}
          </p>

          {productWithTotalPrice.discountPercentage > 0 && (
            <p className="text-xs line-through opacity-60">
              {Number(productWithTotalPrice.basePrice).toFixed(2)}
            </p>
          )}

         </div>

            <p className="text-xs opacity-60">Quantidade: <span className="text-white font-semibold opacity-100">{orderProduct.quantity}</span></p>

        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
