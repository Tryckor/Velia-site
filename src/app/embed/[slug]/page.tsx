import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { QuoteBotArtisan } from "@/components/QuoteBotArtisan";
import { allClientSlugs, getClient } from "@/lib/artisanConfigs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allClientSlugs().map((slug) => ({ slug }));
}

export const metadata: Metadata = { robots: { index: false } };

/**
 * Page « nue » destinée à être affichée dans l'iframe de la bulle flottante
 * (embed.js). Aucun habillage : juste le chatbot, sur fond transparent.
 */
export default async function EmbedPage({ params }: Props) {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) notFound();

  return (
    <>
      {/* Fond transparent pour que les coins arrondis du bot s'intègrent à l'iframe */}
      <style>{`html,body{background:transparent !important;margin:0}`}</style>
      <div className="flex min-h-screen items-end justify-center p-2 sm:items-center">
        <QuoteBotArtisan config={client.config} />
      </div>
    </>
  );
}
