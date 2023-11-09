import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import computeProductTotalPrice from "@/helpers/product";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: { product: true };
      };
    };
  }>;
}
const OrderItem = ({ order }: OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, product) => {
      const productWithTotalPrice = computeProductTotalPrice(product.product);

      return acc + productWithTotalPrice.totalPrice * product.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscount = subtotal - total;

  return (
    <Card className="px-3">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="text-bold">Pedido com {order.orderProducts.length} produto(s)</p>
              <p className="text-sm opacity-60">Feito em: <span className="text-xs lg:text-sm">{format(order.createdAt, "d/MM/yy 'ás' HH:mm")}</span> </p>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p className="lg:text-lg lg:font-bold">Status</p>
                  <p className="text-xs lg:text-sm text-[#8162FF]">{order.status}</p>
                </div>

                <div>
                  <p className="font-bold lg:text-lg">Data</p>
                  <p className="opacity-60 lg:font-bold lg:text-sm lg:text-[#8162FF] lg:opacity-100">
                    {format(order.createdAt, "d/MM/yy")}
                  </p>
                </div>

                <div>
                  <p className="font-bold lg:text-lg">Pagamento</p>
                  <p className="opacity-60 lg:text-sm lg:text-[#8162FF] lg:opacity-100 lg:font-bold"> Cartão</p>
                </div>
              </div>

              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}



              <div className="fex flex-col gap-1 text-xs lg:text-[16px] lg:mt-4">
                <Separator />

                <div className="flex justify-between py-3">
                  <p>Subtotal</p>
                  <p>R$ {subtotal.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex justify-between py-3">
                  <p>Entrega</p>
                  <p className="lg:text-[#8162FF] lg:font-bold">GRÁTIS</p>
                </div>

                <Separator />

                <div className="flex justify-between py-3">
                  <p>Descontos</p>
                  <p>-R$ {totalDiscount.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex justify-between py-3 text-sm font-bold lg:py-0 lg:text-[16px] lg:mt-2">
                  <p className="lg:text-[16px]">Total</p>
                  <p>R$ {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
