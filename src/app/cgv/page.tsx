import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente des prestations Velia.",
  robots: { index: false, follow: true },
};

export default function CGV() {
  return (
    <LegalPage title="Conditions générales de vente" updated="juillet 2026">
      <p>
        Les présentes conditions générales de vente (« CGV ») régissent les
        relations entre <strong>Velia</strong>, entreprise individuelle exploitée
        par Balzola Tao (SIREN 106 956 097, 23 rue Barada, 64360 Monein), ci-après
        « le Prestataire », et tout client professionnel, ci-après « le Client ».
        Toute commande implique l&apos;acceptation sans réserve des présentes CGV.
      </p>

      <h2>1. Objet et prestations</h2>
      <p>
        Le Prestataire propose des services de création de sites internet, de
        visibilité en ligne (fiche Google, référencement), d&apos;automatisation
        et d&apos;assistants de devis en ligne. Le détail précis de la prestation,
        son périmètre et son prix sont définis dans le devis accepté par le Client,
        qui prévaut sur les présentes en cas de contradiction.
      </p>

      <h2>2. Devis et commande</h2>
      <p>
        Chaque prestation fait l&apos;objet d&apos;un devis gratuit. La commande est
        ferme dès la validation écrite du devis par le Client (signature, email ou
        accord électronique). Le premier échange (audit) est gratuit et sans
        engagement.
      </p>

      <h2>3. Prix et paiement</h2>
      <ul>
        <li>
          Les prix sont indiqués en euros. TVA non applicable, article 293 B du
          Code général des impôts (franchise en base de TVA).
        </li>
        <li>
          Prestation ponctuelle (ex. création de site) : selon les modalités du
          devis (acompte éventuel à la commande, solde à la livraison).
        </li>
        <li>
          Abonnement (visibilité, maintenance, assistant de devis) : facturé
          mensuellement,{" "}
          <span className="todo">
            [à confirmer : d&apos;avance, par virement / carte]
          </span>
          .
        </li>
        <li>
          En cas de retard de paiement, des pénalités au taux légal en vigueur
          ainsi qu&apos;une indemnité forfaitaire de 40 € pour frais de
          recouvrement (art. L441-10 du Code de commerce) pourront être appliquées.
        </li>
      </ul>

      <h2>4. Durée, résiliation et sans engagement</h2>
      <p>
        Les abonnements sont conclus <strong>sans engagement de durée</strong>. Le
        Client peut y mettre fin à tout moment, la résiliation prenant effet à la
        fin de la période mensuelle en cours{" "}
        <span className="todo">[à confirmer : préavis éventuel]</span>. Les sommes
        déjà réglées au titre du mois entamé restent acquises au Prestataire.
      </p>
      <p>
        À la fin de l&apos;abonnement :{" "}
        <span className="todo">
          [à définir : sort du site et de l&apos;assistant — conservation, transfert
          ou interruption d&apos;accès]
        </span>
        .
      </p>

      <h2>5. Délais et livraison</h2>
      <p>
        Les délais de réalisation sont indiqués à titre indicatif dans le devis.
        Le Prestataire s&apos;engage à mettre en œuvre les moyens nécessaires au
        respect de ces délais. La collaboration du Client (fourniture des textes,
        visuels, accès et validations) conditionne la tenue des délais.
      </p>

      <h2>6. Obligations du Client</h2>
      <p>
        Le Client s&apos;engage à fournir des informations exactes et les éléments
        nécessaires à la prestation, et à disposer des droits sur les contenus
        qu&apos;il transmet (textes, images, logos). Il reste responsable du contenu
        publié et de sa conformité à la réglementation applicable à son activité.
      </p>

      <h2>7. Propriété intellectuelle</h2>
      <p>
        Sauf mention contraire au devis, le Client dispose d&apos;un droit
        d&apos;usage sur le site et les livrables pendant la durée de la relation
        contractuelle. Les composants, outils et savoir-faire propres au
        Prestataire restent sa propriété. Le transfert de propriété d&apos;un
        livrable ne devient effectif qu&apos;après paiement intégral.
      </p>

      <h2>8. Responsabilité</h2>
      <p>
        Le Prestataire est tenu à une obligation de moyens. Sa responsabilité ne
        saurait être engagée en cas d&apos;indisponibilité imputable à
        l&apos;hébergeur ou à des services tiers, de force majeure, ou d&apos;une
        mauvaise utilisation par le Client. Les estimations produites par
        l&apos;assistant de devis sont indicatives et ne constituent pas un
        engagement de prix ; seul le devis validé par le Client fait foi.
      </p>

      <h2>9. Données personnelles</h2>
      <p>
        Les données collectées sont traitées conformément à notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>. Le Client
        reste responsable de traitement des données de ses propres clients
        recueillies via les outils fournis.
      </p>

      <h2>10. Droit applicable et litiges</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige, les
        parties s&apos;efforceront de trouver une solution amiable avant toute
        action judiciaire. À défaut, les tribunaux compétents seront ceux du
        ressort du siège du Prestataire.
      </p>

      <p className="todo">
        Modèle de base fourni à titre indicatif — à faire relire/adapter avant
        diffusion à un premier client payant.
      </p>
    </LegalPage>
  );
}
