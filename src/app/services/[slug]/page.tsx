import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";
import { allServiceSlugs, getServiceLanding } from "@/lib/serviceLandings";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getServiceLanding(slug);
  if (!data) return { title: "Service" };
  return { title: data.metaTitle, description: data.metaDesc };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const data = getServiceLanding(slug);
  if (!data) notFound();
  return <ServiceLanding data={data} />;
}
