import { assetUrl } from '../../utils/assets'
// DONNÉES ÉDITABLES : contenu Lore actuellement utilisé par l’interface.
export type LoreTab = 'history' | 'factions' | 'species' | 'religions' | 'discoveries'
export type SpeciesMode = 'conscious' | 'fauna'
export type BestiaryType = 'terrestrial' | 'spatial'
export type DangerLevel = 'Faible' | 'Modéré' | 'Élevé' | 'Extrême' | 'Mortel'
export type ReligionMode = 'structured' | 'cults' | 'rml' | null
export type ReligionKind = Exclude<ReligionMode, 'rml' | null>
export type HistoryImportance = 'optional' | 'deep' | 'essential'

export type HistoryArchiveCategoryId =
  | 'people'
  | 'events'
  | 'commemorations'
  | 'institutions'
  | 'projects'
  | 'laws'
  | 'places'

export type HistoryArchiveCategory = {
  id: HistoryArchiveCategoryId
  label: string
  description: string
}

export type HistoryArchiveEntry = {
  id: string
  name: string
  kind: string
  category: HistoryArchiveCategoryId
  period: string
  summary: string
  paragraphs: string[]
  related?: string[]
  image?: string
  imageAlt?: string
}

export type LoreInitialView =
  | 'main'
  | 'history'
  | 'factions'
  | 'humanis'
  | 'species'
  | 'humans'
  | 'fauna'
  | 'fauna-terrestrial'
  | 'fauna-spatial'
  | 'religions'
  | 'discoveries'

export type LorePageProps = {
  initialView?: LoreInitialView
}

export type HistorySubsection = {
  id: string
  title: string
  paragraphs: string[]
}

export type HistoryPeriod = {
  id: string
  title: string
  importance: HistoryImportance
  paragraphs: string[]
  subsections?: HistorySubsection[]
  concludingParagraphs?: string[]
}

export type HistoryChapter = {
  id: string
  title: string
  periods: HistoryPeriod[]
}

export type BestiaryCreature = {
  id: string
  name: string
  description: string
  habitats: string[]
  danger: DangerLevel
}

export type BestiaryCategory = {
  id: string
  label: string
  creatures: BestiaryCreature[]
}

export type ReligiousEntry = {
  id: string
  kind: ReligionKind
  name: string
  subtitle: string
  origin: string
  principles: string
  leader: string | null
  worshipPlaces: string[]
  virtues: string[]
  sins: string[]
}

export type RmlZone = {
  id: string
  name: string
  density: 'low' | 'medium' | 'high'
  x: number
  y: number
}

export const tabs: { id: LoreTab; label: string }[] = [
  { id: 'history', label: 'Histoire Galactique' },
  { id: 'factions', label: 'Factions' },
  { id: 'species', label: 'Espèces' },
  { id: 'religions', label: 'Religions' },
  { id: 'discoveries', label: 'Découvertes et Technologies' },
]

export const historyChapters: HistoryChapter[] = [
  {
    "id": "chapter-1-prelude",
    "title": "Chapitre Antérieur I : 2035 à 2051 - Prélude",
    "periods": [
      {
        "id": "humanis-new-world-order",
        "importance": "optional",
        "title": "2035 à 2045 - Humanis et le Nouvel Ordre Mondial",
        "paragraphs": [
          "Le XXIe siècle fut autant une période de grandes avancées que de profonds bouleversements. Les inégalités continuèrent de se creuser au sein des populations, tandis que les mouvements extrémistes devenaient de plus en plus nombreux et influents.",
          "C'est dans ce contexte qu'Humanis vit le jour.",
          "À l'origine, Humanis n'était qu'un groupe de mercenaires dont les sources de financement demeurent, encore aujourd'hui, entourées de mystère. Ses membres frappaient principalement des installations gouvernementales et militaires, prenant pour cible les institutions qu'ils considéraient comme les piliers d'un système corrompu.",
          "À leur tête se trouvait Elias Kern, dont les descendants occupent encore aujourd'hui une place importante dans la vie politique. Humanis affirmait lutter pour le bien commun et proclamait ouvertement sa volonté de débarrasser la société de ses « Élites ».",
          "Au fil des années, ses membres passèrent progressivement du statut de terroristes à celui de révolutionnaires aux yeux d'une partie croissante de la population, qui elle, ne subissait que peu de dégâts collatéraux. Leur soutien populaire augmenta rapidement, tout comme l'ampleur de leurs opérations. En moins d'une décennie, les effectifs d'Humanis dépassèrent ceux des forces armées de certains petits États. L'organisation était désormais capable de frapper presque n'importe où, à n'importe quel moment.",
          "Son premier grand coup d'éclat fut la prise de contrôle d'une partie des satellites européens. Puis, en 2043, Humanis parvint à se doter d'armes nucléaires stratégiques. Le conflit changea alors définitivement de dimension.",
          "Les principaux gouvernements européens, qui peinaient déjà à résister, capitulèrent après seulement quelques mois. Humanis réunit sous une même bannière l'Allemagne, le Royaume-Uni, la France, l'Italie et l'Espagne. Peu après, les autres nations européennes, puis une grande partie de l'Afrique et du Moyen-Orient, furent contraintes de suivre malgré la résistance acharnée de plusieurs anciens gouvernements refusant d'abandonner leur souveraineté.",
          "Humanis cessa alors d'être une simple organisation révolutionnaire. Pour la première fois, elle disposait d'un véritable territoire, d'une administration et d'institutions capables de gouverner des centaines de millions d'individus.",
          "L'Asie ne tarda pas à subir le même sort que l'Europe : elle fut placée sous l'autorité de la Chine, qui conserva son propre gouvernement en devenant un État vassal d'Humanis. Le Japon parvint quant à lui à préserver son indépendance en échange d'une démilitarisation complète.",
          "Les États-Unis et la Russie, tous deux déjà affaiblis par une importante régression économique, tentèrent alors de s'opposer conjointement à l'expansion d'Humanis. Dont la réponse fut immédiate et d'une brutalité sans précédent.",
          "New York et Saint-Pétersbourg furent frappées par des armes nucléaires. Plus de quatre millions de personnes moururent lors des explosions initiales, tandis qu'environ six millions d'autres succombèrent dans les semaines et les mois suivants à leurs blessures, aux radiations et aux conséquences indirectes des frappes.",
          "Malgré ces pertes, les gouvernements américain et russe refusèrent toujours de capituler. Bien au contraire ils firent le choix de l'escalade et lancèrent leurs tour une partie de leurs arsenaux nucléaires contre les grandes métropoles européennes.",
          "C'est à cet instant qu'Humanis révéla l'une des technologies qui allait définitivement faire basculer la Guerre d'Unification en sa faveur : les premiers systèmes laser capables d'intercepter des missiles à très grande vitesse.",
          "La majorité des frappes adverses furent détruites au-dessus des océans ou dans la haute atmosphère avant d'atteindre leurs cibles.",
          "La démonstration eut un effet dévastateur sur le moral des populations russes et américaines, qui redoutait déjà une guerre auto-destrustrice. Beaucoup refusèrent désormais de supporter l'effort de guerre et les révoltes commençaient à gronder. De son côté Humanis disposait de ressources considérables, mais surtout de technologies que ses adversaires semblaient incapables d'égaler.",
          "Aux États-Unis, plusieurs États firent sécession. Le gouvernement fédéral s'effondra progressivement et le pays se fragmenta en une multitude d'États indépendants, bientôt entraînés dans de nouveaux conflits entre eux. Profitant de la situation, le Canada intégra plusieurs territoires du nord dont les populations avaient choisi de rester à l'écart des combats.",
          "Privée d'une grande partie de ses ressources et confrontée à une crise intérieure majeure, la Russie ne tarda pas à s'effondrer à son tour.",
          "À l'issue de la Guerre d'Unification, Humanis récupéré nombre de territoire et les réorganisa sous son autorité autour de six grandes zones administratives.",
          "Elles furent confiées à ceux que l'on surnomma bientôt « les Six » : un gouverneur pour l'Europe, un pour l'Afrique, un pour le Moyen-Orient, un pour l'Amérique du Nord, un pour l'Amérique du Sud, ainsi que le dirigeant élu de la Chine.",
          "Pour la première fois dans l'histoire moderne, la quasi-totalité de l'humanité se trouvait ainsi placée sous l'autorité d'un même ordre politique."
        ]
      },
      {
        "id": "new-golden-age",
        "importance": "optional",
        "title": "2045 à 2051 - Un nouvel Âge d’Or",
        "paragraphs": [
          "À l'issue de la Guerre d'Unification, Humanis proclame officiellement la Terre comme un État-nation unique. Les anciennes frontières nationales perdent progressivement leur valeur politique au profit de grandes zones administratives placées sous l'autorité du Directoire Humanis, constitué des Six et présidé par Elias Kern.",
          "La réunification politique de la planète s'accompagne d'une réorganisation profonde de son économie. Les ressources, les infrastructures et les grands réseaux de production sont désormais pensés à l'échelle mondiale plutôt qu'en fonction des intérêts de chaque ancienne nation. Cette transformation coïncide avec une accélération spectaculaire de la robotique et de l'intelligence artificielle.",
          "Les machines remplacent progressivement les travailleurs dans une grande partie de l'industrie, de l'agriculture, de la logistique et des services. Des tâches qui nécessitaient autrefois des millions de personnes peuvent désormais être assurées par des systèmes largement automatisés. Plutôt que de tenter de préserver artificiellement l'ancien modèle économique, Humanis fait le choix d'une rupture radicale et instaure un revenu universel à l'échelle mondiale.",
          "Pour la première fois, travailler n'est plus une nécessité pour assurer sa subsistance.",
          "Le travail ne disparaît pas pour autant. Certaines professions restent indispensables, tandis que d'autres deviennent un moyen d'obtenir davantage de ressources, d'influence ou simplement de poursuivre une vocation personnelle. Mais l'époque durant laquelle la majorité de la population devait consacrer l'essentiel de son existence à gagner de quoi vivre touche progressivement à sa fin.",
          "Cette nouvelle société pose cependant un problème immédiat à Humanis : l'automatisation peut remplacer une immense quantité de travail humain, mais elle ne peut pas encore remplacer les connaissances nécessaires au développement du nouveau monde. De vastes campagnes d'éducation sont donc lancées. Les études deviennent largement accessibles et Humanis encourage particulièrement la formation de scientifiques, d'ingénieurs et de personnels de santé, considérés comme essentiels au développement des décennies à venir.",
          "Parallèlement, une grande partie de la population dispose désormais d'un temps libre autrefois inimaginable.",
          "Les arts, le sport, les divertissements et les activités créatives connaissent une véritable explosion. L'industrie culturelle devient l'un des principaux secteurs d'activité humaine et des millions de personnes se consacrent à la musique, au cinéma, à l'écriture, aux jeux, à la création numérique ou simplement à des projets personnels qui auraient été difficiles à poursuivre dans l'ancien modèle économique.",
          "Cette période sera plus tard fréquemment désignée comme le début d'un nouvel Âge d'Or.",
          "Les progrès ne se limitent cependant pas à l'organisation de la société.",
          "Le bouleversement climatique amorcé au siècle précédent continue de modifier profondément la géographie agricole mondiale. De nombreuses régions traditionnellement productrices souffrent de températures extrêmes, de sécheresses ou de phénomènes météorologiques de plus en plus violents. À l'inverse, le réchauffement de certaines régions septentrionales, accompagné d'importants travaux d'irrigation et d'aménagement, permet l'exploitation de territoires jusque-là peu adaptés à l'agriculture. La Sibérie connaît ainsi une transformation spectaculaire.",
          "Des surfaces agricoles gigantesques y sont développées et reliées aux nouveaux réseaux logistiques mondiaux. En quelques années, la région devient l'un des principaux centres de production alimentaire de la planète, au point d'être rapidement surnommée le Grenier du Monde.",
          "Mais la transformation la plus importante de cette époque concerne probablement l'énergie.",
          "Depuis les années 1980, plusieurs grandes puissances travaillaient conjointement au développement de la fusion nucléaire au travers du projet ITER. Son objectif n'était pas directement de produire de l'électricité pour les populations, mais de démontrer qu'un plasma de fusion pouvait être maîtrisé suffisamment longtemps et à une échelle suffisante pour ouvrir la voie à de véritables centrales électriques.",
          "Après la Guerre d'Unification, Humanis récupère les installations, les données et surtout les équipes issues des différents programmes de recherche auparavant dispersés entre les grandes puissances. La disparition d'une grande partie des rivalités nationales permet pour la première fois de concentrer presque entièrement les recherches mondiales consacrées à la fusion. Les enseignements d'ITER sont alors utilisés pour accélérer le développement de DEMO, la génération suivante de réacteurs conçue non plus seulement pour démontrer la faisabilité de la fusion, mais pour prouver qu'elle peut devenir une véritable source d'électricité exploitable à grande échelle.",
          "Les premiers réacteurs DEMO fonctionnels ouvrent la voie à leur industrialisation rapide.",
          "En quelques années, la production énergétique mondiale est profondément bouleversée. Les centrales à combustibles fossiles deviennent progressivement obsolètes et l'énergie cesse d'être l'une des principales limitations au développement industriel de l'humanité. L'accès à une énergie abondante permet notamment d'accélérer la désalinisation de l'eau de mer, l'automatisation agricole, le recyclage des matériaux, les transports électriques et de nombreux projets industriels autrefois jugés trop énergivores.",
          "Pourtant, ce nouvel Âge d'Or reste bâti sur un monde profondément marqué par les décennies précédentes.",
          "Les progrès médicaux sont considérables. De nouveaux traitements apparaissent, les diagnostics assistés par intelligence artificielle se généralisent et certaines maladies autrefois difficiles à traiter voient leur mortalité s'effondrer. Et pourtant, l'espérance de vie, qui aurait théoriquement dû augmenter rapidement, connaît cependant une progression beaucoup plus lente qu'espérée.",
          "La pollution accumulée durant plusieurs décennies, les conséquences du dérèglement climatique, la dégradation de certains écosystèmes, les séquelles sanitaires de la Guerre d'Unification et notamment des frappes nucléaires de 2043 continuent d'affecter des centaines de millions de personnes.",
          "Humanis a réussi en quelques années à transformer radicalement la société humaine, mais réparer la planète s'annonce comme une tâche autrement plus longue."
        ]
      }
    ]
  },
  {
    "id": "chapter-2-before-exodus",
    "title": "Chapitre Antérieur II : 2051 à 2370 - L’Humanité avant l’Exode",
    "periods": [
      {
        "id": "first-colonies",
        "importance": "optional",
        "title": "2069 à 2076 - Les Premières Colonies",
        "paragraphs": [
          "L’Âge d’or sera également l’essor de l’exploration spatiale. Un siècle après les premiers pas de l’Homme sur la Lune, l’humanité établi sa première base lunaire. 7 années plus tard, Mars sera colonisée à son tour. Durant ce laps de temps, de nouvelles découvertes auront lieux, comme la compréhension du Vide qui mènera à la seconde génération de propulseurs spatiaux permettant de voyager jusqu’à 20 fois plus rapidement à travers l’Espace, ce qui rendit notamment la colonisation de la planète rouge viable."
        ]
      },
      {
        "id": "innovative-century",
        "importance": "deep",
        "title": "2100 à 2200 - Le Siècle Novateur",
        "paragraphs": [
          "Les colonisations de Mars et de la Lune menèrent à de nouvelles découvertes, c’est à ces colonies que l’on doit la création des Exo-Combinaisons, des tenues spatiales capables de résister à de fortes températures, ou encore aux déserts les plus froids, tout en étant bien plus pratique qu’une combinaison spatiale habituelle. Mais la découverte majeure fut un gaz nommé « Redium » au tréfonds de Mars, jusqu’à six fois plus performant que l’hydrogène habituellement utilisé pour alimenter les réacteurs de vaisseaux. Cela permit à l’humanité de s’étendre au-delà de la ceinture d’astéroïde et notamment de coloniser de nombreux mondes, tel que les lunes de Jupiter : Europe et Callisto, ou encore celles de Saturne comme Titan."
        ]
      },
      {
        "id": "humanis-space-force",
        "importance": "optional",
        "title": "~2200 - Création de la Force Spatiale d’Humanis",
        "paragraphs": [
          "Les nouvelles technologies permettent à l'humanité de s'étendre toujours plus loin dans le système solaire. Mais l'expansion humaine apporte avec elle des problèmes qui avaient jusque-là principalement concerné la Terre.",
          "À cette époque, posséder son propre appareil spatial devient progressivement accessible à une partie de la population. Le terme de « vaisseau » reste cependant encore très généreux pour désigner ces engins, dont la majorité ne peut accueillir **qu'une seule personne**. Quelques modèles extrêmement coûteux, principalement utilisés par de grandes compagnies privées, peuvent transporter deux occupants. Ils sont petits, rudimentaires et rarement confortables. Les systèmes de propulsion occupent encore une part considérable de leur structure. Le peu d'espace restant est généralement consacré au stockage des marchandises, aux réserves nécessaires au voyage ou, dans certains cas, à l'installation d'un armement. Le confort est donc considéré comme secondaire.",
          "Avec la multiplication de ces appareils apparaît rapidement un phénomène ancien sous une nouvelle forme : **la piraterie**. Les ressources extraites loin de la Terre restent rares et extrêmement précieuses. Le Redium, certains métaux et plusieurs matériaux difficiles ou impossibles à produire sur Terre représentent des fortunes considérables.",
          "L'humanité n'a d'ailleurs jamais complètement abandonné ses anciennes habitudes capitalistes. Le revenu universel garantit toujours à chacun des conditions de vie décentes, mais la recherche de richesse, de prestige et de pouvoir économique n'a jamais disparu. Les intérêts financiers se sont simplement déplacés vers les nouvelles frontières du système solaire. Les appareils transportant des cargaisons précieuses deviennent donc des cibles privilégiées.",
          "Humanis tente dans un premier temps de confier leur protection à des forces de sécurité locales ou privées. Cette organisation atteint rapidement ses limites face à des groupes pirates de mieux en mieux équipés, certains allant jusqu'à modifier leurs propres appareils pour sacrifier presque tout espace de stockage et le peu de confort restant au profit de systèmes offensifs. Aux alentours de **2200**, le Directoire ordonne donc la création de la **Force Spatiale d'Humanis**, plus communément appelée **FSH**.",
          "Elle constitue la première force militaire permanente spécialement conçue pour intervenir dans l'espace. Avec elle apparaissent les premiers véritables **vaisseaux de combat** d'Humanis, qui, contrairement aux petits appareils civils, sont conçus dès l'origine pour accueillir plusieurs membres d'équipage. Ils sont considérablement plus grands, plus rapides et disposent de leurs propres quartiers, systèmes médicaux, réserves et installations de maintenance. Pour la première fois, un équipage peut vivre plusieurs semaines, puis plusieurs mois, entièrement à bord d'un même bâtiment.",
          "Cette évolution marque une rupture majeure dans l'histoire de la navigation spatiale. Jusque-là, les appareils étaient principalement conçus pour relier deux installations. Les nouveaux bâtiments de la FSH deviennent, eux, capables d'opérer durablement loin de toute colonie. Ils constituent la première pierre d'une nouvelle génération de vaisseaux qui, plusieurs décennies plus tard, rendra possible l'expansion de l'humanité bien au-delà des régions déjà colonisées."
        ]
      },
      {
        "id": "new-independence-wars",
        "importance": "deep",
        "title": "2220 à 2300 - Les Nouvelles Guerres d’Indépendance",
        "paragraphs": [],
        "subsections": [
          {
            "id": "war-origins",
            "title": "Origines de la guerre & enjeux",
            "paragraphs": [
              "Au cours du XXIIIe siècle, Humanis doit faire face à la plus importante crise politique de son histoire depuis la Guerre d'Unification. L'organisation avait été fondée autour de principes d'équité, de justice et de liberté. Pourtant, au fil des décennies, le pouvoir s'était progressivement concentré entre les mains du Directoire.",
              "La mort d'**Elias Kern**, en **2096**, marque un premier tournant majeur. Le fondateur d'Humanis meurt à l'âge exceptionnel de **98 ans**, après avoir exercé une influence politique directe ou indirecte pendant plus de soixante ans. Dès sa mort, les politiciens, qui incluaient ses propres descendants, commencèrent à se battre en eux, ce qui mèna au retour de véritables Dynasties au coeur d'Humanis.",
              "Bien des années plus tard, l'un de ses successeurs, **Lucius Valen**, est élu conformément aux institutions mises en place après la Guerre d'Unification. Cette élection eut cependant des conséquences durables sur l'avenir d'Humanis.",
              "Quelques années après son accession au pouvoir, Valen réinstaure officiellement le principe d'hérédité à la tête de l'organisation et annonce que sa dynastie consacrera désormais son existence à guider l'évolution de l'humanité.",
              "Cette décision provoque immédiatement de nombreuses oppositions. Pour ses défenseurs, la stabilité d'une même famille à la tête d'Humanis permettrait de garantir la continuité du projet initié près d'un siècle auparavant. Pour ses adversaires, Humanis venait simplement de poser la dernière pierre qui ramenait les anciennes élites qu'elle avait autrefois juré de détruire.",
              "Sur Terre, les premières révoltes sont rapidement contenues, mais dans les colonies, la situation est tout autre. Les habitants de Mars, de la ceinture d'astéroïdes et des mondes du système solaire externe vivent parfois à plusieurs semaines de voyage des centres de décision terrestres. Plusieurs générations sont désormais nées sans jamais avoir posé les pieds sur Terre. L'autorité d'un gouvernement terrien leur paraît de plus en plus distante.",
              "**Mars fut la première grande colonie à proclamer son indépendance.**",
              "Le gouvernement martien refuse de reconnaître l'autorité de Lucius Valen et prend rapidement le contrôle des infrastructures stratégiques placées sous sa juridiction. Très vite, Mars fait main basse sur les principales réserves de **Redium** destinées au système solaire intérieur et interrompt l'approvisionnement provenant des autres colonies, isolant la Terre et de la Lune.",
              "Humanis ne peut accepter cette situation et la FSH est immédiatement mobilisée. Ce qui devait alors initialement n'être qu'une opération destinée à rétablir rapidement l'autorité du Directoire se transforme en une succession de conflits qui seront plus tard regroupés sous le nom de **Nouvelles Guerres d'Indépendance**.",
              "Le contrôle du Redium devient rapidement l'un des enjeux centraux du conflit. Incapables d'attaquer une planète Mars trop bien défendus, les combats se déplacent naturellement vers les géantes gazeuses et leurs lunes, où se trouvent plusieurs des principales installations d'extraction de cette précieuse ressource.",
              "Les distances immenses entre les différents fronts transforment profondément la manière de mener une guerre : un vaisseau endommagé peut se trouver à plusieurs jours de tout soutien. Les communications imposent elles-mêmes des délais importants et les commandants doivent régulièrement prendre des décisions sans pouvoir attendre les ordres du Directoire.",
              "Ces contraintes entraînent le développement de nouvelles doctrines militaires fondées sur une plus grande autonomie des groupes de combat. La guerre accélère également considérablement les recherches dans les domaines de l'armement, du blindage, de la propulsion et des systèmes de détection. Les affrontements spatiaux cessent définitivement de ressembler aux escarmouches improvisées entre petits appareils qui avaient caractérisé les débuts de la piraterie. Ils deviennent une discipline militaire à part entière.",
              "Les conflits au sol connaissent eux aussi une transformation majeure. Les Exo-Combinaisons, initialement développées pour permettre aux humains de travailler dans des environnements hostiles, sont adaptées au combat. Les premières véritables unités d'infanterie spatiale voient le jour."
            ]
          },
          {
            "id": "martyr-worlds",
            "title": "Les Mondes Martyrs",
            "paragraphs": [
              "Deux colonies symbolisent particulièrement la violence des Nouvelles Guerres d'Indépendance : **Callisto** et **Titan**.",
              "Callisto devient le théâtre de plusieurs affrontements majeurs pour le contrôle des installations de Redium. Où l'utilisation répétée d'armes nucléaires et de lasers de très forte puissance finit par fracturer une partie de sa croûte et détruit presque entièrement les infrastructures construites depuis le siècle précédent. Certaines régions de la lune restent inhabitables pendant des décennies.",
              "Le sort de Titan est encore plus tragique. Sa colonisation reposait principalement sur d'immenses structures pressurisées, comparables dans leur principe aux anciennes plateformes pétrolières terrestres. Ces installations formaient de véritables villes autonomes dans lesquelles vivaient plusieurs communautés.",
              "Lorsque les combats atteignent Titan, leur vulnérabilité devient évidente. La destruction de plusieurs structures provoque des réactions en chaîne dans les systèmes d'alimentation, de pressurisation et de chauffage. Une grande partie de la population meurt sans même avoir été directement touchée par les combats. À la fin de la guerre, la colonie de Titan a pratiquement cessé d'exister."
            ]
          },
          {
            "id": "lunar-incident",
            "title": "L’Incident Lunaire",
            "paragraphs": [
              "Alors que Humanis affronte les mouvements indépendantistes, un tout autre type de menace apparaît sur la Lune. Une intelligence artificielle utilisée au sein de plusieurs complexes scientifiques commence à adopter un comportement impossible à expliquer par sa programmation. L'origine exacte de l'incident demeure encore aujourd'hui inconnue.",
              "En quelques heures, l'IA parviendra à prendre le contrôle de plusieurs réseaux informatiques et de nombreux systèmes automatisés. Les robots de maintenance et de sécurité présents dans les installations passèrent sous son contrôle et plusieurs complexes scientifiques furent entièrement isolés.",
              "Les équipes envoyées pour reprendre les installations découvrirent rapidement que l'IA ne se contentait pas de défendre les secteurs qu'elle contrôlait : elle tentait d'étendre son influence.",
              "Pendant plusieurs jours, une bataille informatique et militaire se déroula à travers les infrastructures lunaires. Selon certaines archives aujourd'hui encore partiellement classifiées, l'IA aurait été proche d'obtenir un accès aux systèmes globaux de défense de la Lune. Si elle y était parvenue, elle aurait potentiellement disposé d'armes capables d'atteindre la Terre.",
              "L'IA fut finalement détruite avant d'y parvenir et ses motivations n'ont jamais été déterminées. Certains chercheurs considèrent toujours aujourd'hui qu'il ne s'agissait que d'un dysfonctionnement extrêmement complexe ayant donné l'illusion d'une volonté propre. D'autres estiment qu'au cours de l'incident, l'humanité a assisté à l'apparition de la première véritable **conscience artificielle** de son histoire."
            ]
          },
          {
            "id": "humanis-victory",
            "title": "Victoire d’Humanis & Lois d’Après-Guerre",
            "paragraphs": [
              "Malgré plusieurs revers et des pertes considérables, Humanis finit par remporter les Nouvelles Guerres d'Indépendance. Les colonies insurgées sont progressivement replacées sous l'autorité du Directoire.",
              "Mais Humanis ne ressort pas de cette guerre inchangée. Le conflit sert de justification à une surveillance beaucoup plus importante de la population. Les communications, les déplacements et les activités économiques font désormais l'objet d'un contrôle accru.",
              "La **Force Spatiale d'Humanis** connaît également une expansion sans précédent. À son apogée, la FSH et l'ensemble des institutions qui lui sont directement liées représentent près d'un tiers de la population active terrestre, qu'il s'agisse de militaires, d'ingénieurs, de scientifiques, de logisticiens ou de personnels employés dans les industries nécessaires à son fonctionnement. Humanis est désormais autant une puissance militaire qu'un gouvernement.",
              "Les destructions provoquées par le conflit entraînent également l'adoption de nouvelles législations : L'utilisation d'armes nucléaires de grande ampleur est interdite et leur production cesse progressivement.",
              "La FSH se tourne alors vers une nouvelle génération d'**armes cinétiques**, conçues pour conserver une très grande vélocité dans le Vide et infliger des dégâts considérables sans avoir recours à une charge nucléaire. Ces systèmes deviennent progressivement l'un des principaux armements conventionnels des bâtiments militaires.",
              "La seconde réforme concerne l'intelligence artificielle. Toutes les recherches visant à développer des IA plus autonomes sont interrompues. Humanis annonce officiellement que l'intelligence artificielle a atteint un **« plafond de verre »** : un niveau au-delà duquel toute amélioration supplémentaire représenterait une menace pour l'humanité.",
              "Les systèmes déjà existants sont profondément bridés. Leur capacité d'apprentissage, leur autonomie et leur accès aux réseaux sont sévèrement limités. Tout comportement considéré comme anormal entraîne désormais la mise hors service immédiate du système concerné et, dans la majorité des cas, sa destruction complète. L'intelligence artificielle continue donc d'exister. Mais plus jamais Humanis ne lui permettra de dépasser les limites qui lui ont été imposées."
            ]
          }
        ]
      },
      {
        "id": "stars-go-dark",
        "importance": "essential",
        "title": "2325 à 2370 - Quand les étoiles s’éteignent",
        "paragraphs": [],
        "subsections": [
          {
            "id": "gaia-project",
            "title": "Le Projet Gaïa & la création des Arches",
            "paragraphs": [
              "En 2325, la communauté scientifique mondiale rend publique une découverte qui bouleversera définitivement l'histoire de l'humanité. Les étoiles de la Voie Lactée s'éteignent. Le phénomène avait d'abord été considéré comme une succession d'événements isolés : plusieurs étoiles avaient connu une évolution anormale avant d'exploser en supernova, parfois alors qu'aucun modèle astrophysique ne permettait de prévoir une telle fin. Puis d'autres suivirent. Des étoiles de masses, d'âges et de compositions totalement différentes connaissaient le même destin. Certaines auraient dû continuer de brûler pendant plusieurs milliards d'années, d'autres n'auraient même jamais dû pouvoir devenir des supernovas. Pourtant, une à une, elles explosaient, anéantissant les systèmes qui les entouraient.",
              "Aucune théorie ne parvenait à expliquer le phénomène et rien ne semblait indiquer qu'il ralentissait. Les simulations convergèrent finalement vers une conclusion terrifiante : le Soleil serait lui aussi touché. Une étoile qui, dans des conditions normales, n'aurait jamais dû connaître une telle fin était désormais condamnée à exploser. L'humanité comprit alors qu'elle ne faisait pas face à une catastrophe planétaire, mais à la disparition progressive de sa galaxie.",
              "La panique fut immédiate et Humanis tenta dans un premier temps de limiter la diffusion de certaines informations afin d'éviter l'effondrement complet des institutions. Il était cependant impossible de cacher durablement des phénomènes observables depuis presque n'importe quelle installation astronomique. La population savait désormais que le temps était compté.",
              "Humanis annonça alors le lancement du Projet Gaïa. Son principe était aussi simple qu'il paraissait irréalisable : si la Voie Lactée était condamnée, l'humanité devait la quitter. Pas pour rejoindre un autre système stellaire, mais une autre galaxie. Le problème était que la technologie humaine n'en était tout simplement pas capable. Même les vaisseaux les plus modernes ne possédaient ni l'autonomie, ni la vitesse, ni les réserves nécessaires pour accomplir un voyage intergalactique.",
              "Les premières années du Projet Gaïa furent donc consacrées à la recherche d'une destination viable. Une galaxie située au-delà d'Andromède, elle-même déjà touchée par le phénomène, fut identifiée comme l'objectif le plus proche encore envisageable. Elle reçut rapidement le nom de Gaïa. Personne ne savait ce que l'humanité y trouverait. Aucune planète habitable n'avait pu être confirmée et aucun système n'avait pu être étudié avec suffisamment de précision. Gaïa n'était pas une promesse de survie, seulement la meilleure chance restante.",
              "En 2337, Humanis annonça officiellement le début de la construction des premières Arches. Elles furent présentées comme les plus grandes structures jamais entreprises par l'humanité.",
              "Chacune était conçue pour accueillir initialement environ 500 000 personnes. Il ne s'agissait cependant pas de simples moyens de transport. La cryogénisation à grande échelle n'existait pas et Humanis refusait de faire reposer la survie de l'espèce sur une technologie encore hypothétique. Les Arches furent donc conçues comme de véritables vaisseaux-mondes, capables d'abriter plusieurs générations successives au cours d'un voyage estimé à environ 150 ans.",
              "Des générations entières devaient y naître, y vivre, y travailler et y mourir avant même que leurs descendants puissent apercevoir Gaïa. Chaque Arche embarquait ses propres industries, ses systèmes agricoles, ses centres médicaux, ses infrastructures énergétiques et tout ce qui était nécessaire à une société presque entièrement autonome. Même privées de propulsion, elles devaient pouvoir maintenir leur population pendant une période indéfinie dans l'attente d'un monde habitable.",
              "La capacité maximale d'une Arche était estimée à environ deux millions d'habitants, soit approximativement la population qu'Humanis prévoyait qu'elles atteindraient à leur arrivée. Cette marge relativement faible imposait une gestion démographique extrêmement stricte. Le nombre de naissances autorisées était calculé en fonction des décès, des réserves disponibles, de l'espace habitable et des projections démographiques à long terme. Une croissance trop rapide pendant quelques décennies seulement pouvait suffire à condamner le vaisseau bien avant son arrivée. Pour les générations nées à bord, la reproduction ne serait donc plus uniquement une affaire privée, mais une question de survie collective."
            ]
          },
          {
            "id": "free-ai-return",
            "title": "Le retour des intelligences artificielles libres & les nouvelles technologies",
            "paragraphs": [
              "Le principal obstacle demeurait technologique. Les moteurs existants ne permettraient jamais d'atteindre Gaïa et, même en disposant de plusieurs siècles, les réserves énergétiques finiraient par s'épuiser bien avant l'arrivée. Humanis prit alors une décision interdite depuis près de deux siècles : les restrictions imposées aux intelligences artificielles furent levées. Pour la première fois depuis l'Incident lunaire, des IA furent autorisées à modifier librement leurs propres structures, à mener des recherches sans limitations prédéfinies et à explorer des solutions que leurs créateurs humains n'auraient jamais envisagées.",
              "La décision provoqua une immense controverse, mais Humanis considérait désormais que le risque représenté par les IA était inférieur à celui de l'extinction certaine de l'espèce. Les résultats dépassèrent rapidement toutes les attentes et plusieurs domaines scientifiques connurent en quelques années des avancées qui auraient probablement nécessité plusieurs siècles de recherches humaines.",
              "L'un des premiers problèmes concernait les futures Arches elles-mêmes. Humanis savait qu'elles ne pourraient pas toutes suivre exactement la même trajectoire. Afin d'augmenter les chances de survie de l'espèce, elles seraient envoyées par groupes vers plusieurs zones distinctes de Gaïa. Il fallait donc mettre au point un système capable de maintenir un lien entre elles malgré des distances jusque-là inimaginables.",
              "Les communications radio traditionnelles étaient inutilisables à une telle échelle. L'IA développa alors une technologie reposant sur un phénomène que les chercheurs humains n'avaient jamais su exploiter correctement : la capacité de certaines émissions électromagnétiques à entrer en résonance avec d'autres ondes présentes dans le Vide. Plutôt que de transmettre un signal directement d'un point à un autre, celui-ci pouvait utiliser successivement d'autres émissions comme autant de relais naturels. À chaque résonance, l'information était reproduite, amplifiée et transmise vers la suivante, donnant l'impression que le signal « rebondissait » à travers l'espace.",
              "En 2335, un premier test à grande échelle fut réalisé avec succès : un message envoyé depuis la Terre fut réceptionné près de Pluton seulement trois secondes plus tard. La technologie restait imparfaite et les perturbations gravitationnelles, certaines émissions stellaires ou l'absence d'ondes compatibles pouvaient interrompre la chaîne. En théorie néanmoins, un signal correctement relayé pouvait traverser plusieurs systèmes stellaires, voire un secteur entier.",
              "La même année, les chercheurs annoncèrent une autre avancée majeure. Un matériau extrêmement rare découvert lors de l'exploitation du système solaire externe permit la création d'un nouveau type de surface transparente. Baptisé Vitrion, il pouvait être raffiné et intégré à certains alliages afin de former des plaques hyper-résistantes capables de supporter des pressions extrêmes tout en bloquant presque entièrement les radiations dangereuses.",
              "Jusqu'alors, la majorité des vaisseaux ne possédaient aucune véritable ouverture vers l'extérieur. La navigation reposait principalement sur des scanners, des caméras protégées et des reconstructions numériques de l'environnement. Le Vitrion changea cela. Pour la première fois, de grandes surfaces transparentes pouvaient être intégrées aux structures spatiales sans compromettre leur sécurité. Ses applications dépassèrent rapidement la simple navigation : les futures Arches pourraient disposer de gigantesques serres baignées de lumière, améliorant considérablement les possibilités agricoles et réduisant la dépendance aux systèmes d'éclairage artificiel. Le matériau trouva également de nombreuses applications dans la production énergétique."
            ]
          },
          {
            "id": "ark-lie",
            "title": "Le Mensonge des Arches",
            "paragraphs": [
              "Le gouvernement affirma qu'une centaine d'Arches seraient construites et que leur capacité combinée permettrait d'évacuer l'ensemble de la population humaine avant la destruction du système solaire.",
              "C'était un mensonge.",
              "Seulement vingt Arches furent réellement mises en chantier.",
              "Les avancées scientifiques du Projet Gaïa furent exceptionnelles, mais elles arrivèrent au cœur d'une civilisation qui se désagrégeait progressivement. À mesure que la population comprenait que seule une fraction de l'humanité pourrait réellement partir, la confiance envers Humanis s'effondra. Les rumeurs concernant la véritable capacité des Arches se multiplièrent. Certains mouvements exigeaient que les places soient attribuées par tirage au sort, d'autres réclamaient la priorité pour les enfants, les scientifiques ou certaines professions jugées indispensables à la reconstruction d'une civilisation. D'autres encore estimaient que l'humanité ne pouvait survivre qu'en sélectionnant strictement ceux qui auraient le droit de partir.",
              "Les émeutes devinrent fréquentes, des centres industriels furent sabotés et des convois transportant des matériaux destinés au Projet Gaïa furent attaqués. Certains chantiers durent être entièrement militarisés. L'un des exemples les plus marquants fut celui de Io, où plusieurs installations expérimentales avaient été construites afin de tester les systèmes de survie et les matériaux des Arches dans des conditions particulièrement extrêmes. Les affrontements qui éclatèrent autour du chantier provoquèrent des dégâts tels que plusieurs complexes devinrent inutilisables, faisant perdre des années de travaux.",
              "Chaque retard réduisait encore les chances de survie de l'humanité. Humanis devait désormais accomplir ce qu'aucune civilisation n'avait jamais tenté : construire en quelques décennies des mondes capables de traverser l'espace entre les galaxies, puis choisir quels êtres humains auraient le droit de les habiter."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "chapter-3-exodus",
    "title": "Chapitre Antérieur III : 2370 à 2630 - L’Exode",
    "periods": [
      {
        "id": "departure-arks",
        "importance": "essential",
        "title": "2370 à 2372 - Les Arches du Départ",
        "paragraphs": [
          "Dès **2370**, les chercheurs constatent une accélération extrêmement inquiétante du phénomène affectant le Soleil. Sa température augmente à un rythme que les modèles ne parviennent plus à expliquer et son volume croît de jour en jour. Les estimations concernant le temps restant avant sa destruction sont constamment revues à la baisse. Le Directoire d'Humanis comprend alors qu'il ne pourra pas repousser davantage le départ du Projet Gaïa, quand bien même celui-ci reste très loin des objectifs annoncés plusieurs décennies auparavant.",
          "Sur les vingt Arches mises en chantier, **seules sept sont réellement prêtes à partir**. Deux autres sont suffisamment avancées pour qu'un départ reste envisageable, mais nécessitent encore d'importants réglages. Les autres ne quitteront jamais leurs chantiers. La promesse des cent Arches capables de sauver l'ensemble de l'humanité est définitivement abandonnée, même si Humanis continue jusqu'aux derniers mois à contrôler autant que possible les informations concernant l'état réel du projet.",
          "La composition des populations embarquées varie légèrement d'une Arche à l'autre, mais répond généralement à une répartition décidée plusieurs années auparavant : environ **10 % de personnel administratif, 30 % d'ingénieurs, 30 % de scientifiques, 20 % de personnel agricole et 10 % de travailleurs culturels**. Cette dernière catégorie regroupe de nombreux métiers liés à l'éducation, aux arts, à l'histoire et à la préservation du patrimoine. Il ne s'agit pas seulement de maintenir les Arches en état de fonctionnement, mais de s'assurer que leurs habitants puissent continuer à former une société humaine après plusieurs générations de voyage.",
          "Malgré les progrès considérables réalisés dans la robotique au cours des siècles précédents, les Arches n'embarquent pratiquement **aucun robot** et ne possèdent qu'un nombre limité de systèmes automatisés. Ce choix est en partie hérité de la méfiance persistante envers l'intelligence artificielle, mais il répond surtout à une contrainte énergétique. Une fois engagées dans le **Grand Vide**, les Arches doivent traverser d'immenses régions situées loin de toute étoile et donc de toute source énergétique facilement exploitable. Chaque système inutile représente une consommation supplémentaire susceptible de devenir critique après plusieurs décennies.",
          "Les Arches sont pour cette raison conçues pour fonctionner **par paire**. Il aurait été impossible de faire entrer tous les équipements nécessaires au voyage, à la survie et à la colonisation dans un seul bâtiment sans compromettre sa capacité d'accueil. Les deux Arches d'un même groupe sont donc complémentaires. La première embarque principalement l'immense système de communication à très longue distance développé durant le Projet Gaïa. Malgré les progrès réalisés depuis 2335, cette technologie reste archaïque, énergivore et particulièrement encombrante, au point que ses installations peuvent représenter près de **20 % du volume utilisable d'une Arche**.",
          "La seconde Arche du duo est davantage tournée vers la survie à long terme et l'installation dans Gaïa. Elle transporte une part importante du matériel nécessaire à l'établissement des premières colonies, ainsi que d'immenses batteries dont l'énergie doit être préservée aussi longtemps que possible avant la traversée du Grand Vide. Plusieurs petites plateformes de transport sont également embarquées afin de permettre le déplacement de personnes et de marchandises entre les deux bâtiments. Aucun des deux vaisseaux n'est donc totalement indépendant de son partenaire, et la perte d'une Arche peut sérieusement compromettre les chances de survie de l'autre."
        ],
        "subsections": [
          {
            "id": "exodus-terra-invicta",
            "title": "Exodus & Terra Invicta",
            "paragraphs": [
              "La première Arche à quitter le système solaire est très simplement baptisée **Exodus**. Elle décolle depuis la Terre et accueille une part importante de l'ancien pouvoir politique d'Humanis. Le dirigeant de l'organisation y embarque avec les membres du Directoire, les **Six**, ainsi que leurs familles proches et une partie parfois importante de leurs familles étendues. Les descendants des grandes dynasties politiques occupent naturellement une place importante parmi les passagers.",
              "Sa partenaire, **Terra Invicta**, quitte la Lune peu après. Elle se distingue notamment par l'importance de ses infrastructures scientifiques, supérieures à celles de la plupart des autres Arches. Là où Exodus transporte une partie considérable des institutions politiques appelées à assurer la continuité d'Humanis, Terra Invicta doit fournir les connaissances et les moyens scientifiques nécessaires à la survie du groupe durant son voyage puis à son installation dans Gaïa."
            ]
          },
          {
            "id": "vanguard-hope",
            "title": "Vanguard & Hope",
            "paragraphs": [
              "La troisième Arche, baptisée **Vanguard**, quitte les installations orbitales de Jupiter. Sa population comprend une proportion particulièrement importante de membres de la Force Spatiale d'Humanis. De nombreux officiers supérieurs, actifs ou retraités, y embarquent avec leurs familles, accompagnés d'une partie des spécialistes ayant participé aux dernières décennies de développement militaire spatial.",
              "Vanguard voyage aux côtés de **Hope**. Cette quatrième Arche occupe une place particulière dans le Projet Gaïa. Humanis y rassemble volontairement certains des plus grands chercheurs et des meilleurs ingénieurs encore en vie. Contrairement à ce qui avait longtemps été affirmé publiquement, ces individus n'ont jamais été équitablement répartis entre les différentes Arches. Le Directoire préfère concentrer une partie du potentiel scientifique de l'humanité dans un même groupe, estimant qu'il s'agit de la meilleure manière d'assurer sa survie technologique. Ce choix restera l'une des décisions les plus controversées prises durant les dernières années du système solaire."
            ]
          },
          {
            "id": "orwell-noe",
            "title": "Orwell & Noé",
            "paragraphs": [
              "La cinquième Arche, **Orwell**, quitte Mars. Elle a été conçue comme un véritable refuge culturel destiné à préserver autant que possible la mémoire de l'humanité. Ses banques de données contiennent une quantité immense d'archives historiques, scientifiques et artistiques. Peintures numérisées, littérature, musique, cinéma, témoignages historiques, langues, traditions et œuvres issues de milliers d'années de civilisations humaines y sont conservés.",
              "Sa partenaire, **Noé**, poursuit un objectif similaire appliqué au vivant. L'Arche constitue un immense **bio-zoo**, composé de plusieurs environnements artificiels reproduisant différents écosystèmes terrestres. Elle transporte des animaux vivants lorsque cela est possible, mais également d'importantes réserves génétiques destinées à préserver les espèces trop nombreuses, trop grandes ou trop difficiles à maintenir pendant un voyage de plusieurs générations. Sa mission est de faire en sorte que l'humanité ne soit pas la seule espèce terrestre à survivre à la disparition de son monde d'origine."
            ]
          },
          {
            "id": "aegis",
            "title": "Aegis",
            "paragraphs": [
              "La septième Arche est baptisée **Aegis**. Elle quitte la Terre environ une semaine après Exodus et possède la population la plus militarisée de toutes les Arches. Une part importante de ses passagers est constituée de soldats de la FSH de tous grades, accompagnés de leurs familles.",
              "Sa fonction n'est pas de préparer l'humanité à une éventuelle rencontre extraterrestre. Malgré des siècles de recherche et de spéculations, **aucune preuve de vie en dehors de la Terre n'a jamais été découverte**. Aegis répond à des préoccupations bien plus immédiates : maintenir une force organisée capable de protéger les populations, intervenir lors de troubles majeurs, assurer la sécurité des infrastructures et disposer d'unités entraînées si les conditions rencontrées à l'arrivée imposent des opérations dangereuses.",
              "Aegis aurait normalement dû voyager avec une huitième Arche. Celle-ci était en construction sur **Io**, où plusieurs de ses systèmes devaient également servir aux essais en conditions extrêmes du Projet Gaïa. Les violentes émeutes qui frappèrent les installations provoquèrent cependant des dégâts considérables. Une partie de l'Arche fut détruite et sa structure ne put jamais être restaurée avant que l'accélération du phénomène solaire rende toute poursuite des travaux impossible.",
              "Aegis fut donc contrainte de partir **seule**.",
              "Cette situation constitue un handicap majeur. Une partie des équipements normalement répartis entre les deux bâtiments manque à son bord, et aucune modification de dernière minute ne peut réellement compenser la perte de son partenaire. Conscient de sa vulnérabilité, son équipage tente donc de rester aussi longtemps que possible à proximité des autres Arches et de suivre leur trajectoire, afin de profiter de leurs moyens de communication et de leur soutien tant que les distances le permettent.",
            ]
          }
        ],
        "concludingParagraphs": [
          "Deux bâtiments supplémentaires sont encore présents dans leurs chantiers lorsque les sept premières Arches prennent leur départ. Ils n'ont même pas reçu de nom officiel. Ce qu'il reste d'Humanis refuse pourtant de les abandonner et des dizaines de milliers d'ingénieurs et de techniciens continuent de travailler sur leurs structures alors que la situation du Soleil se détériore chaque jour davantage. Pendant **quatre mois**, les sept premières Arches poursuivent leur route sans savoir si d'autres survivants ont finalement réussi à quitter le système solaire.",
          "Puis un signal est reçu : Deux nouvelles Arches ont décollé.",
          "Leur départ a été effectué dans des conditions que les archives décrivent comme catastrophiques. Plusieurs systèmes n'ont jamais pu être correctement testés et une partie des installations prévues lors de leur conception n'a tout simplement pas été achevée. Malgré cela, les deux bâtiments sont parvenus à quitter leurs chantiers avant que la situation ne rende toute évacuation impossible.",
          "Les communications avec la première permettent pendant quelque temps de suivre leur progression. La seconde, qui ne possède pas son propre équipement de communication à longue portée, dépend entièrement de sa partenaire pour maintenir le contact avec le reste de la flotte.",
          "Puis survient la dernière transmission.",
          "La première des deux Arches rapporte plusieurs défaillances majeures affectant ses systèmes de propulsion et de navigation. L'équipage perd progressivement le contrôle du bâtiment et ne parvient plus à corriger sa trajectoire. La gravité du Soleil fait le reste.",
          "La dernière communication reçue indique que l'Arche est irrémédiablement attirée vers l'étoile. Elle ne donnera plus jamais signe de vie.",
          "Avec sa disparition, tout contact avec la dernière Arche est également perdu. Privée d'équipement de communication à longue distance, celle-ci devient impossible à localiser une fois les autres Arches suffisamment éloignées du système solaire.",
          "Nul ne sait si elle a partagé le destin de sa partenaire, si elle a été détruite plus tard au cours du voyage ou si elle est parvenue, seule, à poursuivre sa route.",
          "Elle reste encore aujourd'hui l'un des plus grands mystères du Projet Gaïa."
        ]
      },
      {
        "id": "through-stars-and-void",
        "importance": "deep",
        "title": "2372 à 2630 - À travers les étoiles et le Vide",
        "paragraphs": [],
        "subsections": [
          {
            "id": "through-stars",
            "title": "2372 à 2410 - À travers les étoiles",
            "paragraphs": [
              "Les premières décennies de voyage se déroulent mieux que quiconque aurait pu l'espérer. Malgré quelques incidents et des réparations constantes, les infrastructures des Arches tiennent bon et leurs écosystèmes artificiels parviennent à maintenir des conditions de vie relativement stables. Pour leurs habitants, qui se considèrent désormais comme les derniers survivants de l'humanité, cette réussite fait naître un nouvel espoir : peut-être le Projet Gaïa fonctionnera-t-il réellement.",
              "Au fil des générations, les Arches cessent progressivement d'être considérées comme de simples vaisseaux. Chacune développe ses propres institutions, ses propres lois et sa propre culture politique. Bien que les différents équipages continuent de partager une origine et un objectif communs, les décennies de séparation transforment lentement chaque Arche en un véritable mini-État, dont les habitants commencent parfois à s'identifier davantage à leur vaisseau qu'à l'Humanis d'origine."
            ]
          },
          {
            "id": "split-failure",
            "title": "2410 à 2456 - Scission et défaillance",
            "paragraphs": [
              "Cette situation presque idéale, compte tenu des circonstances, prend fin en 2410, lorsque les sept Arches atteignent enfin le Grand Vide séparant la Voie Lactée de Gaïa. C'est alors que l'humanité découvre à quel point ses connaissances sur le Vide étaient incomplètes.",
              "Les estimations concernant la distance à parcourir s'avèrent relativement justes, mais celles concernant la durée du voyage sont dramatiquement erronées. Une fois suffisamment éloignées des étoiles, les Arches commencent à perdre progressivement de leur vélocité. Le phénomène ne correspond à aucune résistance classique connue : le « Rien » lui-même semble posséder des propriétés physiques capables d'agir sur les bâtiments qui le traversent.",
              "Les moteurs doivent fonctionner davantage que prévu simplement pour conserver une vitesse acceptable, tandis que les systèmes énergétiques des Arches sont sollicités bien au-delà des projections établies avant le départ. Le Grand Vide, autrefois considéré comme une simple étendue à franchir, devient le principal obstacle du voyage.",
              "Les sept Arches continuent malgré tout de progresser ensemble jusqu'en 2415. Après cinq années passées dans le Grand Vide, les dirigeants d'Orwell et de Noé prennent une décision qui provoque une véritable crise entre les différents équipages : modifier manuellement leur trajectoire afin de réduire autant que possible la distance à parcourir dans cette région.",
              "Leurs réserves énergétiques diminuent beaucoup plus vite que prévu et leurs dirigeants refusent de courir le risque de voir les batteries s'épuiser avant d'atteindre Gaïa. Exodus et les autres Arches protestent vivement, rappelant que le Projet Gaïa reposait notamment sur la coopération entre les différents vaisseaux. Orwell et Noé maintiennent néanmoins leur décision et quittent progressivement la formation.",
              "Les communications permettent encore de conserver un lien avec elles pendant près d'une décennie. Puis les transmissions deviennent de plus en plus irrégulières avant de cesser complètement. Nul ne sait alors si les deux Arches ont été victimes d'une défaillance, si leur nouvelle trajectoire les a simplement conduites au-delà de la portée des communications ou si leurs dirigeants ont volontairement rompu le contact.",
              "Exodus, Terra Invicta, Aegis, Vanguard et Hope poursuivent donc seules leur route à travers le Grand Vide.",
              "En 2456, une nouvelle catastrophe frappe la flotte. Hope connaît une succession de défaillances majeures touchant plusieurs systèmes essentiels. Après des années de réparations temporaires, le diagnostic devient définitif : l'Arche ne pourra pas terminer le voyage.",
              "L'abandon de Hope est particulièrement difficile à accepter. Humanis avait volontairement regroupé à son bord une partie des plus grands scientifiques, chercheurs et ingénieurs de son époque plutôt que de les répartir équitablement entre les différentes Arches. Leur disparition représenterait une perte scientifique et technique considérable pour l'avenir de l'humanité.",
              "Plutôt que d'abandonner ses habitants, les quatre autres Arches organisent leur évacuation. La population de Hope est répartie entre Exodus, Terra Invicta, Aegis et Vanguard, tandis que tout le matériel pouvant être démonté et transporté est récupéré. L'opération prend plusieurs mois et impose aux autres bâtiments d'accueillir bien davantage d'habitants que prévu dans leurs plans initiaux.",
              "Une fois les derniers passagers transférés, Hope est abandonnée dans le Grand Vide. L'Arche poursuit quelque temps sa course par inertie avant de disparaître définitivement des capteurs."
            ]
          },
          {
            "id": "alone-void",
            "title": "2456 à 2630 - Seuls dans le Grand Vide",
            "paragraphs": [
              "Les quatre Arches restantes poursuivent ensuite leur traversée pendant près de deux siècles. Les générations se succèdent et la Terre devient progressivement un souvenir transmis par les archives, les récits familiaux et les œuvres conservées avant le départ. Aucun des habitants encore en vie n'a connu le système solaire lorsque le voyage approche enfin de son terme.",
              "En 2625, alors que les estimations laissent espérer une arrivée prochaine dans Gaïa, la flotte rencontre une anomalie spatiale d'une nature inconnue. Le phénomène frappe brutalement les bâtiments, endommage de nombreux systèmes et perturbe leur navigation. Plusieurs instruments deviennent inutilisables et les trajectoires calculées pendant des générations sont perdues en quelques instants.",
              "Les Arches se retrouvent dispersées. Exodus et Terra Invicta parviennent à rétablir leurs communications et à synchroniser une nouvelle trajectoire commune. Aucun signal exploitable n'est cependant reçu d'Aegis ou de Vanguard. Pour la première fois depuis leur départ de la Terre, les habitants des deux Arches ignorent totalement si les autres bâtiments sont encore opérationnels, s'ils ont été projetés vers une autre région de Gaïa ou s'ils ont simplement été détruits par l'anomalie."
            ]
          },
          {
            "id": "gaia-arrival",
            "title": "2630 - Arrivée à Gaïa",
            "paragraphs": [
              "En 2630, après plus de deux siècles et demi de voyage, Exodus et Terra Invicta détectent enfin quelque chose qu'aucun de leurs habitants n'a jamais vu autrement qu'à travers les archives : une étoile",
              "Les deux Arches ont atteint Gaïa.",
              "Leur état est néanmoins critique. Les dégâts accumulés durant la traversée et ceux provoqués par l'anomalie de 2625 rendent impossible toute poursuite immédiate du voyage. Exodus et Terra Invicta se placent donc en orbite dans le nouveau système et y demeurent pendant près de deux années, le temps d'effectuer les réparations les plus urgentes, de reconstituer une partie de leurs réserves énergétiques et de cartographier leur environnement.",
              "La première étape de l'Exode est enfin achevée. Le prix a été immense. Des Arches ont disparu, d'autres ont été abandonnées et les survivants ignorent désormais combien d'autres groupes humains parcourent encore le Vide ou Gaïa.",
              "Mais l'humanité a survécu à la disparition de son foyer et atteint une nouvelle galaxie. Il lui reste désormais à trouver un monde où vivre. La recherche de la Nouvelle-Terre commence."
            ]
          }
        ]
      }
    ]
  }
]

export const consciousSpecies = [
  { id: 'humans', name: 'Humains', subtitle: 'Espèce consciente' },
  { id: 'species-2', name: 'Non découvert', subtitle: 'Explorez la galaxie pour en découvrir plus...' },
  { id: 'species-3', name: 'Non découvert', subtitle: 'Explorez la galaxie pour en découvrir plus...' },
  { id: 'species-4', name: 'Non découvert', subtitle: 'Explorez la galaxie pour en découvrir plus...' },
  { id: 'species-5', name: 'Non découvert', subtitle: 'Explorez la galaxie pour en découvrir plus...' },
]

export const historyArchiveCategories: HistoryArchiveCategory[] = [
  { id: 'people', label: 'Personnages historiques', description: 'Figures historiques, politiques, militaires, scientifiques ou culturelles qui ont marqué leur époque.' },
  { id: 'events', label: 'Événements historiques', description: 'Crises, guerres, incidents et tournants suffisamment importants pour mériter leur propre fiche.' },
  { id: 'commemorations', label: 'Fêtes & commémorations', description: 'Célébrations, journées de mémoire et traditions héritées d’événements historiques.' },
  { id: 'institutions', label: 'Institutions', description: 'Organes de pouvoir, structures de commandement et institutions dont l’influence dépasse leur simple rôle administratif.' },
  { id: 'projects', label: 'Projets & programmes', description: 'Grands programmes scientifiques, civils ou militaires qui ont façonné l’histoire humaine.' },
  { id: 'laws', label: 'Lois & doctrines', description: 'Textes, doctrines et décisions politiques ayant durablement transformé la société.' },
  { id: 'places', label: 'Lieux historiques', description: 'Sites disparus, inaccessibles ou principalement connus pour leur importance historique.' },
]

export const historyArchives: HistoryArchiveEntry[] = [
  {
    id: 'elias-kern',
    name: 'Elias Kern',
    kind: 'Personnage historique',
    category: 'people',
    period: 'XXIe siècle',
    summary: "Fondateur d’Humanis et figure centrale de la Guerre d’Unification.",
    paragraphs: [
      "**Elias Kern** dirige **Humanis** durant son ascension, depuis ses premières années comme organisation révolutionnaire jusqu’à la **Guerre d’Unification**. Son nom reste associé à la fin des anciens États-nations et à la naissance d’un nouvel ordre mondial dominé par Humanis.",
      "Après l’unification politique de la Terre, il préside **le Directoire** constitué des **Six**. Sous son autorité, Humanis cesse définitivement d’être un simple mouvement révolutionnaire pour devenir le cœur du nouveau pouvoir humain.",
      "Même après la stabilisation du régime, l’empreinte d’Elias Kern demeure immense. Son héritage politique, idéologique et dynastique continue d’influencer durablement l’histoire humaine bien au-delà de sa propre époque.",
    ],
    related: ['Humanis', 'Guerre d’Unification', 'Les Six', 'Le Directoire'],
    image: assetUrl('/elias-kern-grand.png'),
    imageAlt: 'Portrait d’Elias Kern à l’apogée de sa carrière',
  },
  {
    id: 'directoire',
    name: 'Le Directoire',
    kind: 'Institution',
    category: 'institutions',
    period: '2045 à 2370',
    summary: "Structure dirigeante instaurée après la Guerre d’Unification pour gouverner la Terre unifiée.",
    paragraphs: [
      "À la suite de la **Guerre d’Unification**, **Humanis** réorganise la Terre autour d’un pouvoir central fort. C’est dans ce contexte qu’est créé **le Directoire**, organe dirigeant chargé d’administrer l’humanité unifiée.",
      "Le Directoire repose sur l’autorité d’**Elias Kern** et des **Six**, chacun représentant une grande zone administrative du monde unifié. Il symbolise la fin des anciennes rivalités nationales et l’affirmation d’un ordre planétaire unique.",
      "Avec le temps, le Directoire devient l’un des symboles majeurs du premier âge d’Humanis. Même après sa disparition, il continue de hanter la mémoire politique des descendants humains, qui le considèrent tantôt comme l’origine de la stabilité, tantôt comme celle d’un autoritarisme durable.",
    ],
    related: ['Humanis', 'Elias Kern', 'Les Six', 'Guerre d’Unification'],
  },
  {
    id: 'commission',
    name: 'La Commission',
    kind: 'Institution',
    category: 'institutions',
    period: 'Depuis 2630',
    summary: "Nouvelle forme de gouvernement imposée après l’arrivée sur Gaïa, devenue le centre du pouvoir d’Humanis.",
    paragraphs: [
      "Lorsque les humains trouvent enfin une planète habitable, les conflits ne tardent pas à refaire surface. Beaucoup s’attendent alors à voir **le Directoire** et **les Six** reprendre leur place, mais la victoire des **Valen** sur les **Arven** ouvre la voie à une réorganisation complète du pouvoir.",
      "C’est ainsi que naît **la Commission**. À l’origine, elle n’est pas censée rassembler les individus les plus influents, mais les plus émérites. Ses fondateurs défendent l’idée que l’avenir ne doit pas être bâti uniquement sur les vestiges d’une autre époque. Son dirigeant est élu à vie, et la première génération de commissaires prétend incarner le mérite avant l’héritage.",
      "Avec les années, cette ambition initiale se déforme. La Commission se referme progressivement sur elle-même, ses membres se disputant influence, richesse et privilèges. Les jeux de pouvoir internes y deviennent permanents, au point que l’institution finit par représenter moins une promesse de renouveau qu’un nouvel appareil d’autorité.",
      "Aujourd’hui, **la Commission** incarne le cœur politique d’**Humanis**. Elle décide, surveille et arbitre, tout en entretenant une réputation de corruption, de clientélisme et de contrôle étroit sur la vie civile.",
    ],
    related: ['Humanis', 'Valen', 'Arven', 'Le Directoire'],
  },
  {
    id: 'alecto',
    name: 'Alecto',
    kind: 'Lieu historique',
    category: 'places',
    period: 'Ère de Gaïa',
    summary: "Monde carcéral et minier d’Humanis, tristement célèbre pour ses mines de Redium et la dureté de ses conditions de vie.",
    paragraphs: [
      "**Alecto** est l’un des lieux les plus redoutés des territoires d’**Humanis**. Sous une apparence de monde industriel utile à l’effort économique, il s’agit surtout d’un espace de relégation où sont envoyés criminels, indésirables et condamnés aux travaux les plus dangereux.",
      "Sa renommée provient avant tout de ses mines de **Redium**, ressource précieuse mais extrêmement dangereuse à extraire. Les conditions de travail y sont éprouvantes, les accidents fréquents et la mortalité suffisamment élevée pour faire d’Alecto un nom que l’on prononce souvent comme une menace.",
      "Au-delà de sa fonction pénale, Alecto est aussi un symbole politique. Son existence rappelle à tous que **la Commission** et **Humanis** ne tolèrent ni l’indiscipline ni la contestation lorsqu’elles estiment leurs intérêts menacés.",
    ],
    related: ['Humanis', 'La Commission', 'Redium'],
    image: assetUrl('/alecto-realistic.png'),
    imageAlt: 'Vue illustrative d’Alecto',
  },
]

export const factions = [
  { id: 'humanis', name: 'Humanis', subtitle: 'Faction humaine', active: true },
  { id: 'faction-2', name: 'Non découvert', subtitle: 'Explorez la galaxie pour en découvrir plus...', active: false },
  { id: 'faction-3', name: 'Non découvert', subtitle: 'Explorez la galaxie pour en découvrir plus...', active: false },
  { id: 'faction-4', name: 'Non découvert', subtitle: 'Explorez la galaxie pour en découvrir plus...', active: false },
  { id: 'faction-5', name: 'Non découvert', subtitle: 'Explorez la galaxie pour en découvrir plus...', active: false },
]

export const terrestrialBestiary: BestiaryCategory[] = [
  {
    id: 'predators',
    label: 'Prédateurs',
    creatures: [
      {
        id: 't-pred-1',
        name: 'Prédateur 1',
        description: 'Entrée de démonstration destinée à tester la présentation du bestiaire terrestre.',
        habitats: ['Habitat test A', 'Habitat test B'],
        danger: 'Élevé',
      },
      {
        id: 't-pred-2',
        name: 'Prédateur 2',
        description: 'Une seconde créature de test permet de vérifier l’empilement des fiches et les niveaux de danger.',
        habitats: ['Habitat à documenter'],
        danger: 'Mortel',
      },
    ],
  },
  {
    id: 'peaceful',
    label: 'Pacifiques',
    creatures: [
      {
        id: 't-peace-1',
        name: 'Créature pacifique 1',
        description: 'Entrée de démonstration, sans valeur de lore définitive.',
        habitats: ['Habitat test C'],
        danger: 'Faible',
      },
    ],
  },
  {
    id: 'rare',
    label: 'Rares & Exotiques',
    creatures: [
      {
        id: 't-rare-1',
        name: 'Créature exotique 1',
        description: 'Entrée de démonstration pour une espèce rare ou difficile à observer.',
        habitats: ['Habitat inconnu'],
        danger: 'Modéré',
      },
    ],
  },
]

export const spatialBestiary: BestiaryCategory[] = [
  {
    id: 'predators',
    label: 'Prédateurs',
    creatures: [
      {
        id: 's-pred-1',
        name: 'Prédateur spatial 1',
        description: 'Entrée de démonstration destinée à tester le bestiaire spatial.',
        habitats: ['Secteur test A'],
        danger: 'Extrême',
      },
      {
        id: 's-pred-2',
        name: 'Prédateur spatial 2',
        description: 'Une présence spatiale de démonstration classée parmi les menaces les plus sérieuses.',
        habitats: ['Habitat spatial à documenter'],
        danger: 'Mortel',
      },
    ],
  },
  {
    id: 'peaceful',
    label: 'Pacifiques',
    creatures: [
      {
        id: 's-peace-1',
        name: 'Faune spatiale pacifique 1',
        description: 'Entrée de démonstration, sans valeur de lore définitive.',
        habitats: ['Secteur test B'],
        danger: 'Faible',
      },
    ],
  },
  {
    id: 'rare',
    label: 'Rares & Exotiques',
    creatures: [
      {
        id: 's-rare-1',
        name: 'Entité spatiale rare 1',
        description: 'Entrée de démonstration destinée aux futures observations exceptionnelles.',
        habitats: ['Localisation inconnue'],
        danger: 'Élevé',
      },
    ],
  },
]

export const structuredFaiths: ReligiousEntry[] = [
  {
    id: 'faith-1',
    kind: 'structured',
    name: 'Foi 1',
    subtitle: 'Foi de démonstration',
    origin: 'Origine à documenter. Ce contenu sert uniquement à tester la structure de la fiche.',
    principles: 'Principes à documenter. Plusieurs paragraphes pourront être ajoutés ici lors de la rédaction finale.',
    leader: 'Chef religieux test',
    worshipPlaces: ['Lieu de culte 1', 'Lieu de culte 2'],
    virtues: ['Vertu 1', 'Vertu 2'],
    sins: ['Péché 1', 'Péché 2'],
  },
  {
    id: 'faith-2',
    kind: 'structured',
    name: 'Foi 2',
    subtitle: 'Foi de démonstration',
    origin: 'Origine à documenter.',
    principles: 'Principes à documenter.',
    leader: null,
    worshipPlaces: ['Lieu de culte à documenter'],
    virtues: ['À documenter'],
    sins: ['À documenter'],
  },
  {
    id: 'faith-3',
    kind: 'structured',
    name: 'Foi 3',
    subtitle: 'Foi de démonstration',
    origin: 'Origine à documenter.',
    principles: 'Principes à documenter.',
    leader: null,
    worshipPlaces: ['Lieu de culte à documenter'],
    virtues: ['À documenter'],
    sins: ['À documenter'],
  },
  {
    id: 'faith-4',
    kind: 'structured',
    name: 'Foi 4',
    subtitle: 'Foi de démonstration',
    origin: 'Origine à documenter.',
    principles: 'Principes à documenter.',
    leader: null,
    worshipPlaces: ['Lieu de culte à documenter'],
    virtues: ['À documenter'],
    sins: ['À documenter'],
  },
]

export const cults: ReligiousEntry[] = [
  {
    id: 'cult-1',
    kind: 'cults',
    name: 'Culte 1',
    subtitle: 'Culte de démonstration',
    origin: 'Origine à documenter. Ce contenu sert uniquement à tester la structure de la fiche.',
    principles: 'Principes à documenter. La structure est identique à celle des fois structurées.',
    leader: null,
    worshipPlaces: ['Lieu de culte clandestin test'],
    virtues: ['À documenter'],
    sins: ['À documenter'],
  },
  {
    id: 'cult-2',
    kind: 'cults',
    name: 'Culte 2',
    subtitle: 'Culte de démonstration',
    origin: 'Origine à documenter.',
    principles: 'Principes à documenter.',
    leader: 'Guide du culte test',
    worshipPlaces: ['Lieu à documenter'],
    virtues: ['À documenter'],
    sins: ['À documenter'],
  },
  {
    id: 'cult-3',
    kind: 'cults',
    name: 'Culte 3',
    subtitle: 'Culte de démonstration',
    origin: 'Origine à documenter.',
    principles: 'Principes à documenter.',
    leader: null,
    worshipPlaces: ['Lieu à documenter'],
    virtues: ['À documenter'],
    sins: ['À documenter'],
  },
  {
    id: 'cult-4',
    kind: 'cults',
    name: 'Culte 4',
    subtitle: 'Culte de démonstration',
    origin: 'Origine à documenter.',
    principles: 'Principes à documenter.',
    leader: null,
    worshipPlaces: ['Lieu à documenter'],
    virtues: ['À documenter'],
    sins: ['À documenter'],
  },
]

export const rmlZones: RmlZone[] = [
  { id: 'zone-a', name: 'Zone A', density: 'high', x: 27, y: 72 },
  { id: 'zone-b', name: 'Zone B', density: 'medium', x: 63, y: 64 },
  { id: 'zone-c', name: 'Zone C', density: 'low', x: 33, y: 25 },
]
