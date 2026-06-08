import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Velia collecte, utilise et protège vos données personnelles (RGPD).",
  robots: { index: false, follow: true },
};

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité" updated="juin 2026">
      <p>
        Cette politique explique quelles données personnelles Velia collecte,
        pourquoi, et quels sont vos droits, conformément au Règlement Général sur
        la Protection des Données (RGPD).
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        Velia —{" "}
        <a href="mailto:contact@velia-digital.com">contact@velia-digital.com</a>. Pour toute
        question relative à vos données, c&apos;est cette adresse à contacter.
      </p>

      <h2>Données collectées</h2>
      <p>
        Nous collectons uniquement les données que vous nous transmettez
        volontairement via nos formulaires (contact et demande de devis) :
      </p>
      <ul>
        <li>Nom</li>
        <li>Adresse email</li>
        <li>Téléphone (facultatif)</li>
        <li>Entreprise (facultatif)</li>
        <li>Le contenu de votre message / les informations sur votre projet</li>
      </ul>
      <p>
        Aucun cookie de suivi publicitaire n&apos;est utilisé. Le site ne pose
        pas de traceur tiers nécessitant votre consentement.
      </p>

      <h2>Finalité</h2>
      <p>
        Ces données servent exclusivement à vous recontacter, à étudier votre
        demande et à établir un devis. Elles ne sont ni vendues, ni cédées à des
        tiers à des fins commerciales.
      </p>

      <h2>Base légale</h2>
      <p>
        Le traitement repose sur votre consentement (envoi volontaire du
        formulaire) et sur l&apos;intérêt légitime de Velia à répondre à votre
        demande.
      </p>

      <h2>Hébergement &amp; sous-traitants</h2>
      <p>
        Le site est hébergé par Netlify. Les demandes peuvent être stockées via
        Supabase et les notifications envoyées via Resend, prestataires
        respectant le RGPD. Vos données ne sont transmises qu&apos;à ces outils
        strictement nécessaires au fonctionnement du service.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Vos données sont conservées le temps nécessaire au traitement de votre
        demande puis, le cas échéant, pour la durée de notre relation
        commerciale, et au maximum 3 ans après le dernier contact.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification,
        d&apos;effacement, de limitation et d&apos;opposition au traitement de
        vos données. Pour les exercer, écrivez à{" "}
        <a href="mailto:contact@velia-digital.com">contact@velia-digital.com</a>. Vous pouvez
        également introduire une réclamation auprès de la CNIL (
        <a href="https://www.cnil.fr" rel="noopener noreferrer" target="_blank">
          cnil.fr
        </a>
        ).
      </p>
    </LegalPage>
  );
}
