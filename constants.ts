
import { Section, Diagnosis } from './types';

export const SECTIONS: Section[] = [
  {
    id: 1,
    title: '📍 Distribution des lésions',
    questions: [
      {
        id: 1,
        name: 'distribution',
        text: 'Quelle est la distribution principale des anomalies ?',
        options: [
          { value: 'subpleural-basal', label: 'Sous-pleurale et à prédominance basale' },
          { value: 'peribronchovascular', label: 'Péribroncho-vasculaire' },
          { value: 'upper-mid', label: 'Lobe supérieur ou moyen' },
          { value: 'diffuse', label: 'Diffuse' },
        ],
      },
      {
        id: 2,
        name: 'heterogeneity',
        text: 'La distribution est-elle hétérogène ?',
        options: [
          { value: 'yes', label: 'Oui, distribution hétérogène' },
          { value: 'no', label: 'Non, distribution homogène' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: '🔬 Lésions élémentaires',
    questions: [
      {
        id: 3,
        name: 'honeycombing',
        text: "Présence d'un aspect en rayons de miel ?",
        lesion: {
          title: 'Aspect en rayons de miel (Honeycombing)',
          details: "Description : Kystes clustérisés de diamètre typiquement constant (3-10mm, parfois plus grands) avec parois épaisses et bien définies. Habituellement accompagné d'un pattern réticulaire contenant des bronchectasies et bronchiolectasies de traction.",
          criteria: "Critères HRCT : Multiples couches de kystes sous-pleuraux superposés, ou couche unique. Distribution sous-pleurale et basale typique.",
        },
        options: [
          { value: 'present', label: 'Présent (kystes clustérisés, parois épaisses, 3-10mm)' },
          { value: 'absent', label: 'Absent' },
        ],
      },
      {
        id: 4,
        name: 'traction',
        text: 'Bronchectasies/bronchiolectasies de traction ?',
        lesion: {
            title: 'Bronchectasies/Bronchiolectasies de traction',
            details: "Description : Caractéristique clé de la fibrose pulmonaire allant d'une irrégularité subtile et absence d'effilement de la paroi bronchique/bronchiolaire jusqu'à une distorsion marquée des voies aériennes et varicosités. Typiquement périphérique/sous-pleurale dans la PII.",
            criteria: "Critères HRCT : Dilatation des bronches/bronchioles par traction fibreuse. Peuvent apparaître tubulaires ou kystiques selon orientation. Coexistent souvent avec kystes en rayons de miel.",
        },
        options: [
          { value: 'peripheral', label: 'Présentes en périphérie/sous-pleural' },
          { value: 'mild', label: 'Légères ou limitées' },
          { value: 'absent', label: 'Absentes' },
        ],
      },
      {
        id: 5,
        name: 'reticular',
        text: 'Pattern réticulaire ?',
        lesion: {
            title: 'Pattern réticulaire',
            details: "Description : Réseau de lignes fines constituant un pattern en filet ou en dentelle. Dans le contexte de la fibrose, il reflète l'épaississement des septa interlobulaires et intralobulaires. Composant essentiel des patterns PII et PII probable.",
            criteria: "Critères HRCT : Lignes courbes entrecroisées formant un réseau irrégulier. Distribution sous-pleurale et basale prédominante dans la PII.",
        },
        options: [
          { value: 'prominent', label: 'Proéminent' },
          { value: 'subtle', label: 'Subtil/fin' },
          { value: 'absent', label: 'Absent' },
        ],
      },
      {
        id: 6,
        name: 'groundglass',
        text: 'Opacités en verre dépoli ?',
        lesion: {
            title: 'Opacités en verre dépoli',
            details: "Description : Augmentation diffuse de l'opacité pulmonaire avec préservation des marges bronchiques et vasculaires. Important de distinguer : \"pur\" (non typique de PII) vs superposé à un pattern réticulaire fin (peut être vu dans PII et représente la fibrose).",
            criteria: "Critères HRCT : Opacité \"en verre dépoli\" pure extensive doit faire évoquer une exacerbation aiguë. Présence de bronchectasies de traction aide à distinguer les deux patterns.",
        },
        options: [
          { value: 'superimposed', label: 'Présentes, superposées au pattern réticulaire' },
          { value: 'pure', label: 'Pures, étendues' },
          { value: 'mild', label: 'Légères' },
          { value: 'absent', label: 'Absentes' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: '⚙️ Caractéristiques additionnelles',
    questions: [
      {
        id: 7,
        name: 'additional',
        text: 'Autres caractéristiques présentes ?',
        options: [
          { value: 'none', label: 'Aucune caractéristique particulière' },
          { value: 'cysts', label: 'Kystes' },
          { value: 'mosaic', label: 'Atténuation en mosaïque marquée' },
          { value: 'nodules', label: 'Micronodules profus/nodules centrilobulaires' },
          { value: 'consolidation', label: 'Consolidation' },
        ],
      },
      {
        id: 8,
        name: 'pleural',
        text: 'Signes pleuraux ?',
        options: [
          { value: 'none', label: 'Aucun' },
          { value: 'plaques', label: 'Plaques pleurales' },
          { value: 'effusion', label: 'Épanchement pleural' },
        ],
      },
    ],
  },
];

export const DIAGNOSIS_RESULTS: Record<string, Diagnosis> = {
  UIP_TYPICAL: {
    title: '✅ Pattern PII Typique (UIP)',
    description: "Les caractéristiques HRCT sont typiques de la pneumopathie interstitielle commune (PII). La présence de rayons de miel dans une distribution sous-pleurale et basale est le critère clé.",
    recommendations: [
      'Ce pattern a une valeur prédictive positive très élevée (>95%) pour une PII histologique.',
      'Si le contexte clinique est compatible avec une fibrose pulmonaire idiopathique (FPI), une biopsie pulmonaire n\'est généralement pas requise pour confirmer le diagnostic.',
      'Une discussion multidisciplinaire est essentielle pour intégrer les données cliniques, radiologiques et, si nécessaire, pathologiques.'
    ]
  },
  UIP_PROBABLE: {
    title: '🤔 Pattern PII Probable (Probable UIP)',
    description: "Les signes de fibrose (pattern réticulaire, bronchectasies de traction) sont présents dans une distribution typique, mais l'aspect en rayons de miel est absent.",
    recommendations: [
      'Ce pattern est très suggestif de PII mais avec une confiance moindre que le pattern PII typique.',
      'La décision de procéder à une biopsie pulmonaire chirurgicale doit être prise après une discussion multidisciplinaire.',
      'Il faut considérer les risques et bénéfices de la biopsie pour le patient.'
    ]
  },
  INDETERMINATE: {
    title: '❓ Pattern Indéterminé pour la PII',
    description: "Les signes de fibrose sont présents mais subtils, ou il existe des caractéristiques qui ne permettent pas de classer le pattern comme PII typique ou probable (par exemple, un verre dépoli important superposé).",
    recommendations: [
      'Ce pattern n\'est ni typique, ni suggestif d\'un diagnostic alternatif.',
      'Une discussion multidisciplinaire est cruciale.',
      'Une biopsie pulmonaire chirurgicale est souvent recommandée pour obtenir un diagnostic histopathologique précis.',
      'Des examens complémentaires (lavage broncho-alvéolaire, cryobiopsie) peuvent être discutés.'
    ]
  },
  ALTERNATIVE: {
    title: '⚠️ Pattern Incompatible avec PII / Suggestif d\'un Diagnostic Alternatif',
    description: "Les anomalies observées (kystes non en rayons de miel, nodules prédominants, consolidation, distribution non basale/sous-pleurale) suggèrent un diagnostic autre que la FPI.",
    recommendations: [
      'Orienter la recherche vers d\'autres pathologies interstitielles : pneumopathie d\'hypersensibilité, sarcoïdose, connectivite, etc.',
      'Une anamnèse détaillée (expositions, symptômes systémiques) et des tests sérologiques sont nécessaires.',
      'Une discussion multidisciplinaire est impérative pour guider les investigations futures, qui peuvent inclure une biopsie.'
    ]
  }
};

export const TOTAL_QUESTIONS = SECTIONS.reduce((acc, section) => acc + section.questions.length, 0);
