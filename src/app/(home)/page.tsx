import { useSession } from "next-auth/react";
import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import PromoBanner from "./components/promo-banner";
import SectionTitle from "@/components/ui/section-title";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 py-8 lg:p-0">
      <div className="sm: hidden lg:block">
        <PromoBanner
          className="h-[31,25rem] lg:w-full"
          src="/Banner-home-01-desktop.png"
          alt="Até 55% de desconto esse mês"
        />
      </div>

      <div className="sm:block lg:hidden">
        <PromoBanner
          src="/Banner-home-01.png"
          alt="Até 55% de desconto esse mês"
        />
      </div>

      <div className="px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle>
          <a href="/deals">Ofertas</a>
        </SectionTitle>
        <div>
        <ProductList  products={deals} />

        </div>
      </div>
      
      <div className="lg:flex lg:justify-center lg:w-[100%] lg:gap-5 lg:p-3">

      <a href="/category/mouses" className="lg:hidden sm:block sm:py-0">
      <PromoBanner
        src="/Banner-home-02.png"
        alt="até 55% de desconto em mouses"
      />
      </a>

      <a href="/category/mouses" className="">
      <PromoBanner className="lg:w-[35.625rem]"
        src="/Banner-home-02.png"
        alt="até 55% de desconto em mouses"
      />
      </a>

      <a href="/category/headphones" className="hidden lg:block">
      <PromoBanner className="lg:w-[35.625rem]"
        src="/Banner-home-03.png"
        alt="até 55% de desconto em mouses"
      />

      </a>

      </div>
      
      <div>

        <a href="/category/keyboards">
        <SectionTitle>Teclados</SectionTitle>
        </a>
        <ProductList products={keyboards} />
      </div>

      <div className="hidden lg:block">
      <PromoBanner className=" flex w-[100%] h-[30.75rem] object-cover"
          src="/Banner-home-04-desktop.png"
          alt="até 20% de desconto em fones"
          sizes="100vw"
          
        />
      </div>

      <div className="lg:hidden sm:block">

        <a href="/category/headphones">
        <PromoBanner
          src="/Banner-home-03.png"
          alt="até 20% de desconto em fones"
        />

        </a>
      </div>

      <div className="lg:mb-12">
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
