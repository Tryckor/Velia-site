import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Velia.",
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" updated="juin 2026">
      <p>
        Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
        l&apos;économie numérique, voici les informations légales relatives au
        site <strong>velia-digital.com</strong>.
      </p>

      <h2>Éditeur du site</h2>
      <ul>
        <li>
          Dénomination : <strong>Velia</strong>{" "}
          <span className="todo">[à compléter : nom légal / micro-entreprise]</span>
        </li>
        <li>
          Statut juridique :{" "}
          <span className="todo">[à compléter : ex. micro-entreprise / EI]</span>
        </li>
        <li>
          SIRET : <span className="todo">[à compléter une fois immatriculé]</span>
        </li>
        <li>
          Adresse :{" "}
          <span className="todo">[à compléter : adresse de l&apos;entreprise]</span>
        </li>
        <li>
          Email : <a href="mailto:veliadigital.fr@gmail.com">veliadigital.fr@gmail.com</a>
        </li>
        <li>
          Directeur de la publication :{" "}
          <span className="todo">[à compléter : nom du responsable]</span>
        </li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Netlify, Inc.</strong>, 512 2nd Street,
        Suite 200, San Francisco, CA 94107, États-Unis —{" "}
        <a href="https://www.netlify.com" rel="noopener noreferrer" target="_blank">
          netlify.com
        </a>
        .
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur ce site (textes, visuels,
        logo, code) est, sauf mention contraire, la propriété de Velia. Toute
        reproduction ou utilisation sans autorisation écrite préalable est
        interdite.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Les informations transmises via les formulaires sont traitées
        conformément à notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>. Vous
        disposez d&apos;un droit d&apos;accès, de rectification et de
        suppression de vos données en écrivant à{" "}
        <a href="mailto:veliadigital.fr@gmail.com">veliadigital.fr@gmail.com</a>.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Velia s&apos;efforce d&apos;assurer l&apos;exactitude des informations
        diffusées sur ce site, sans pouvoir en garantir l&apos;exhaustivité ni
        l&apos;absence d&apos;erreur. L&apos;utilisation des informations se fait
        sous la seule responsabilité de l&apos;utilisateur.
      </p>
    </LegalPage>
  );
}
