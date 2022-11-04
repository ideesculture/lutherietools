<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Accédez au mode d'emploi de LutherieTools.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Post-traitements</template>

    A partir des enregistrements réalisés sur votre mobile, lancez des post-traitements exécutés en local ou sur le serveur de LutherieTools.
	Stockez en local le résultat de vos post-traitements.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>PAFI</template>

    Le projet Pafi propose une démarche partenariale ambitieuse et totalement originale entre des laboratoires de recherche, un pôle national d’innovation des métiers de la musique et un collectif d’artisans-luthiers agissant au nom d’associations professionnelles de la facture instrumentale, représentatif du tissu des micro-entreprises françaises.

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Echanges</template>

    Besoin de remonter un problème ?
	
  </WelcomeItem>

</template>
