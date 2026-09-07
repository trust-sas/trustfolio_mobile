export const mockOCRResponses = [
  `
TrustFolioKids - Template d'Histoire

Nom: Diallo
Prénom: Amina
Âge: 10
Genre: F
Classe: CE2
École: École Primaire de Dakar

Titre: Le Courage du Petit Éléphant

Histoire:

Il était une fois, dans la savane africaine, un petit éléphant nommé Koffi.
Koffi était différent des autres éléphanteaux car il avait très peur de l'eau.

Un jour, pendant la saison sèche, tous les animaux cherchaient de l'eau.
La seule source d'eau se trouvait de l'autre côté d'une grande rivière.

Koffi savait qu'il devait être courageux pour aider sa famille.
Malgré sa peur, il a décidé de traverser la rivière en premier.

Avec les encouragements de sa maman éléphante, Koffi a mis une patte
dans l'eau, puis une autre. Lentement mais sûrement, il a traversé la rivière.

Tous les animaux ont applaudi! Koffi a appris que le courage n'est pas
l'absence de peur, mais la capacité d'agir malgré la peur.

Fin

Catégorie: Courage
`,
  `
TRUSTFOLIOKIDS

NOM: MBAYE
PRENOM: FATOU
AGE: 9
GENRE: Féminin
CLASSE: CE1
ECOLE: Ecole Internationale de Lomé

TITRE: La Fête du Village

HISTOIRE:

Dans mon village, chaque année, nous organisons une grande fête.
Cette année, j'ai aidé ma grand-mère à préparer le repas traditionnel.

Nous avons fait du poulet yassa avec du riz parfumé.
Tous les enfants du village ont dansé au son des tambours.

J'ai porté ma plus belle robe africaine avec des motifs colorés.
Mon grand frère a joué du djembé et tout le monde a chanté.

C'était la plus belle fête de ma vie!
J'ai appris l'importance de préserver nos traditions.

FIN

Catégorie: Culture
`,
  `
Template d'Histoire - TrustFolioKids

Nom: KOUASSI
Prénom: Kwame
Âge: 11 ans
Genre: M
Classe: CM1
École: École Primaire d'Abidjan

Titre: Le Gardien de la Forêt

Il était une fois un jeune garçon appelé Kwame qui vivait près
d'une grande forêt. Cette forêt était l'habitat de nombreux animaux.

Un jour, Kwame a découvert que des hommes coupaient les arbres.
Les animaux perdaient leur maison et pleuraient.

Kwame a décidé d'agir. Il a parlé au chef du village et a organisé
une réunion avec tous les habitants.

Ensemble, ils ont créé une zone protégée pour les animaux.
Kwame a planté 100 arbres avec les enfants de son école.

Aujourd'hui, la forêt est sauvée et les animaux sont heureux.
Kwame est devenu le héros de son village.

Morale: Nous devons protéger notre environnement pour les générations futures.

Catégorie: Environnement
Date: 2026
`,
];

export async function simulateOCR(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const random = mockOCRResponses[Math.floor(Math.random() * mockOCRResponses.length)];
      resolve(random);
    }, 1800);
  });
}
