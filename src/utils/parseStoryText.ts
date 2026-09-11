export interface ParsedAuthorInfo {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  grade: string;
  school: string;
}

export interface ParsedStory {
  authorInfo: ParsedAuthorInfo;
  title: string;
  content: string;
  category: string;
}

const categoryMap: { [key: string]: string } = {
  courage: 'Courage',
  honesty: 'Honesty',
  'honnêteté': 'Honesty',
  leadership: 'Leadership',
  family: 'Family',
  famille: 'Family',
  culture: 'Culture',
  environment: 'Environment',
  environnement: 'Environment',
};

export function parseExtractedText(text: string): ParsedStory {
  const nameMatch = text.match(/(?:Nom|Name)[\s:]+([^\n]+)/i);
  const firstNameMatch = text.match(/(?:Prénom|First\s*Name|Prenom)[\s:]+([^\n]+)/i);
  const ageMatch = text.match(/(?:Âge|Age|âge)[\s:]+(\d+)/i);
  const genderMatch = text.match(/(?:Genre|Gender|Sexe)[\s:]+([MF]|Masculin|Féminin|Male|Female|Garçon|Fille)/i);
  const gradeMatch = text.match(/(?:Classe|Grade|Class)[\s:]+([^\n]+)/i);
  const schoolMatch = text.match(/(?:École|School|Ecole)[\s:]+([^\n]+)/i);
  const titleMatch = text.match(/(?:Titre|Title)[\s:]+([^\n]+)/i);
  const categoryMatch = text.match(/(?:Catégorie|Category|Categorie|Valeur)[\s:]+([^\n]+)/i);

  let storyContent = '';
  const storyMatch = text.match(/(?:Histoire|Story|Conte|Récit)[\s:]+([^]+?)(?:\n\n|Fin|FIN|Catégorie|Category|$)/is);

  if (storyMatch) {
    storyContent = storyMatch[1].trim();
  } else {
    const lines = text.split('\n');
    const contentLines = lines.filter((line) => {
      const trimmedLine = line.trim();
      return (
        !line.match(/(?:Nom|Prénom|Âge|Genre|Classe|École|Titre|Name|Age|Gender|Grade|School|Title|Catégorie|Category|TrustFolioKids|Template)/i) &&
        trimmedLine.length > 20
      );
    });
    storyContent = contentLines.join('\n').trim();
  }

  const authorInfo: ParsedAuthorInfo = {
    firstName: firstNameMatch?.[1]?.trim().replace(/[_\-:]/g, '') || '',
    lastName: nameMatch?.[1]?.trim().replace(/[_\-:]/g, '') || '',
    age: ageMatch?.[1]?.trim() || '',
    gender: genderMatch?.[1]?.trim() || '',
    grade: gradeMatch?.[1]?.trim().replace(/[_\-:]/g, '') || '',
    school: schoolMatch?.[1]?.trim().replace(/[_\-:]/g, '') || '',
  };

  const title = titleMatch ? titleMatch[1].trim().replace(/[_\-:]/g, '') : '';

  let category = '';
  if (categoryMatch) {
    const detected = categoryMatch[1].trim();
    category = categoryMap[detected.toLowerCase()] || detected;
  } else {
    const contentLower = storyContent.toLowerCase();
    if (contentLower.includes('brave') || contentLower.includes('courag')) category = 'Courage';
    else if (contentLower.includes('honest') || contentLower.includes('vérité')) category = 'Honesty';
    else if (contentLower.includes('lead') || contentLower.includes('chef')) category = 'Leadership';
    else if (contentLower.includes('family') || contentLower.includes('famille') || contentLower.includes('maman') || contentLower.includes('papa'))
      category = 'Family';
    else if (contentLower.includes('culture') || contentLower.includes('tradition') || contentLower.includes('danse') || contentLower.includes('tambour'))
      category = 'Culture';
    else if (contentLower.includes('nature') || contentLower.includes('arbre') || contentLower.includes('forêt') || contentLower.includes('environnement'))
      category = 'Environment';
  }

  return { authorInfo, title, content: storyContent, category };
}
