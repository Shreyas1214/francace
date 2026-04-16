/* ============================================================
   FrançAce — Exercises Data
   Grammar exercises, reading passages, listening scripts, 
   writing prompts for TEF/TCF practice
   ============================================================ */

export const EXERCISES_DATA = {
    grammar: {
        lessons: [
            {
                id: 'articles',
                title: 'Les articles',
                titleEn: 'Articles',
                level: 'A1',
                icon: '📝',
                theory: 'French has three types of articles:\n• **Definite**: le (m), la (f), les (pl) — "the"\n• **Indefinite**: un (m), une (f), des (pl) — "a/an/some"\n• **Partitive**: du (m), de la (f), de l\' (vowel), des (pl) — "some/any"\n\n**Key rules:**\n- Use the definite article for general concepts: *J\'aime le chocolat* (I like chocolate)\n- Use the partitive for unspecified quantities: *Je veux du pain* (I want some bread)\n- After negation, un/une/du/de la → de: *Je n\'ai pas de voiture* (I don\'t have a car)',
                exercises: [
                    { type: 'fill', question: '__ garçon mange __ pomme.', options: ['Le / une', 'Un / la', 'La / un', 'Les / des'], answer: 0, explanation: '"Le garçon" (the boy, specific) + "une pomme" (an apple, indefinite)' },
                    { type: 'fill', question: 'Je voudrais __ eau, s\'il vous plaît.', options: ['de l\'', 'la', 'un', 'le'], answer: 0, explanation: 'Partitive article before a vowel: de l\'eau (some water)' },
                    { type: 'fill', question: 'Il n\'y a pas __ lait.', options: ['de', 'du', 'le', 'la'], answer: 0, explanation: 'After negation, partitive becomes "de": pas de lait' },
                    { type: 'fill', question: '__ enfants jouent dans __ parc.', options: ['Les / le', 'Des / un', 'Le / la', 'Un / des'], answer: 0, explanation: 'Les enfants (the children, specific) + le parc (the park, specific)' },
                    { type: 'fill', question: 'Elle est __ professeure excellente.', options: ['une', 'la', 'de', 'le'], answer: 0, explanation: '"Une professeure" — indefinite article with a profession' }
                ]
            },
            {
                id: 'present-tense',
                title: 'Le présent de l\'indicatif',
                titleEn: 'Present Tense',
                level: 'A1',
                icon: '⏰',
                theory: 'French verbs are grouped into three families by their infinitive endings:\n\n**-ER verbs** (parler): je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent\n**-IR verbs** (finir): je finis, tu finis, il/elle finit, nous finissons, vous finissez, ils/elles finissent\n**-RE verbs** (vendre): je vends, tu vends, il/elle vend, nous vendons, vous vendez, ils/elles vendent\n\n**Important irregulars:** être, avoir, aller, faire, vouloir, pouvoir, devoir',
                conjugationTable: {
                    'parler': { je: 'parle', tu: 'parles', 'il/elle': 'parle', nous: 'parlons', vous: 'parlez', 'ils/elles': 'parlent' },
                    'finir': { je: 'finis', tu: 'finis', 'il/elle': 'finit', nous: 'finissons', vous: 'finissez', 'ils/elles': 'finissent' },
                    'être': { je: 'suis', tu: 'es', 'il/elle': 'est', nous: 'sommes', vous: 'êtes', 'ils/elles': 'sont' },
                    'avoir': { je: 'ai', tu: 'as', 'il/elle': 'a', nous: 'avons', vous: 'avez', 'ils/elles': 'ont' },
                    'aller': { je: 'vais', tu: 'vas', 'il/elle': 'va', nous: 'allons', vous: 'allez', 'ils/elles': 'vont' }
                },
                exercises: [
                    { type: 'fill', question: 'Nous __ (parler) français.', options: ['parlons', 'parlent', 'parlez', 'parle'], answer: 0, explanation: 'Nous parlons — first person plural of parler' },
                    { type: 'fill', question: 'Ils __ (être) canadiens.', options: ['sont', 'sommes', 'es', 'êtes'], answer: 0, explanation: 'Ils sont — third person plural of être' },
                    { type: 'fill', question: 'Je __ (aller) au marché.', options: ['vais', 'vas', 'va', 'allons'], answer: 0, explanation: 'Je vais — first person singular of aller' },
                    { type: 'fill', question: 'Vous __ (avoir) un rendez-vous.', options: ['avez', 'avons', 'ont', 'as'], answer: 0, explanation: 'Vous avez — second person plural of avoir' },
                    { type: 'fill', question: 'Elle __ (finir) ses devoirs.', options: ['finit', 'finis', 'finissons', 'finissent'], answer: 0, explanation: 'Elle finit — third person singular of finir (-IR verb)' }
                ]
            },
            {
                id: 'passe-compose',
                title: 'Le passé composé',
                titleEn: 'Past Tense (Passé Composé)',
                level: 'A2',
                icon: '⏪',
                theory: 'The passé composé is the most common past tense. It\'s formed with:\n**avoir/être (present) + past participle**\n\n**With avoir** (most verbs): J\'ai mangé, Tu as parlé, Il a fini\n**With être** (movement/reflexive verbs): Je suis allé(e), Elle est venue, Nous sommes partis\n\n**DR & MRS VAN DER TRAMP** — verbs that use être:\nDevenir, Revenir, Monter, Rester, Sortir, Venir, Aller, Naître, Descendre, Entrer, Retourner, Tomber, Rentrer, Arriver, Mourir, Partir\n\n**Past participle agreement with être:** Add -e (fem), -s (pl), -es (fem pl)',
                exercises: [
                    { type: 'fill', question: 'J\' __ (manger) une pizza hier.', options: ['ai mangé', 'suis mangé', 'avons mangé', 'mange'], answer: 0, explanation: 'Manger uses avoir: J\'ai mangé' },
                    { type: 'fill', question: 'Elle __ (aller) au Canada.', options: ['est allée', 'a allé', 'est allé', 'a allée'], answer: 0, explanation: 'Aller uses être, and agrees with feminine subject: est allée' },
                    { type: 'fill', question: 'Nous __ (partir) à huit heures.', options: ['sommes partis', 'avons parti', 'sommes parti', 'avons partis'], answer: 0, explanation: 'Partir uses être, plural agreement: sommes partis' },
                    { type: 'fill', question: 'Ils __ (finir) le travail.', options: ['ont fini', 'sont finis', 'ont finir', 'sont fini'], answer: 0, explanation: 'Finir uses avoir: ont fini' },
                    { type: 'fill', question: 'Tu __ (venir) avec nous ?', options: ['es venu(e)', 'as venu', 'es venir', 'as venu(e)'], answer: 0, explanation: 'Venir uses être: es venu(e)' }
                ]
            },
            {
                id: 'negation',
                title: 'La négation',
                titleEn: 'Negation',
                level: 'A2',
                icon: '🚫',
                theory: 'French negation wraps around the verb:\n\n**ne...pas** (not): Je **ne** parle **pas** anglais\n**ne...plus** (no longer): Il **ne** travaille **plus**\n**ne...jamais** (never): Elle **ne** fume **jamais**\n**ne...rien** (nothing): Je **ne** comprends **rien**\n**ne...personne** (nobody): Il **n**\'y a **personne**\n\n**In passé composé:** ne + avoir/être + pas + participle\n*Je **n**\'ai **pas** compris* (I didn\'t understand)\n\n**In spoken French:** "ne" is often dropped: *Je parle pas* = *Je ne parle pas*',
                exercises: [
                    { type: 'fill', question: 'Je __ parle __ espagnol.', options: ['ne...pas', 'ne...plus', 'ne...jamais', 'ne...rien'], answer: 0, explanation: 'Basic negation: Je ne parle pas espagnol' },
                    { type: 'fill', question: 'Elle __ mange __ de viande.', options: ['ne...plus', 'ne...pas', 'ne...jamais', 'ne...rien'], answer: 0, explanation: 'Ne...plus = no longer: She no longer eats meat' },
                    { type: 'fill', question: 'Il n\'y a __ dans le réfrigérateur.', options: ['rien', 'pas', 'plus', 'jamais'], answer: 0, explanation: 'Ne...rien = nothing: There is nothing in the fridge' },
                    { type: 'fill', question: 'Je n\'ai __ visité Paris.', options: ['jamais', 'pas', 'rien', 'personne'], answer: 0, explanation: 'Ne...jamais = never: I have never visited Paris' },
                    { type: 'fill', question: 'Il n\'y a __ à la maison.', options: ['personne', 'rien', 'pas', 'jamais'], answer: 0, explanation: 'Ne...personne = nobody: There is nobody at home' }
                ]
            },
            {
                id: 'futur-simple',
                title: 'Le futur simple',
                titleEn: 'Simple Future',
                level: 'B1',
                icon: '🔮',
                theory: 'The futur simple is formed with the infinitive + endings:\n\n**Endings:** -ai, -as, -a, -ons, -ez, -ont\n\n**Regular:** parler → je parlerai, finir → je finirai\n**-RE verbs:** drop the final -e: vendre → je vendrai\n\n**Irregular stems (memorize these!):**\n- être → ser- (je serai)\n- avoir → aur- (j\'aurai)\n- aller → ir- (j\'irai)\n- faire → fer- (je ferai)\n- vouloir → voudr- (je voudrai)\n- pouvoir → pourr- (je pourrai)\n- devoir → devr- (je devrai)\n- venir → viendr- (je viendrai)',
                exercises: [
                    { type: 'fill', question: 'Demain, je __ (être) à Montréal.', options: ['serai', 'suis', 'étais', 'serais'], answer: 0, explanation: 'Futur simple of être: je serai' },
                    { type: 'fill', question: 'Nous __ (aller) au Canada l\'année prochaine.', options: ['irons', 'allons', 'iront', 'allions'], answer: 0, explanation: 'Futur simple of aller: nous irons' },
                    { type: 'fill', question: 'Elle __ (avoir) son diplôme en juin.', options: ['aura', 'a', 'avait', 'aurait'], answer: 0, explanation: 'Futur simple of avoir: elle aura' },
                    { type: 'fill', question: 'Ils __ (pouvoir) venir demain.', options: ['pourront', 'peuvent', 'pouvaient', 'pourraient'], answer: 0, explanation: 'Futur simple of pouvoir: ils pourront' },
                    { type: 'fill', question: 'Tu __ (parler) français couramment.', options: ['parleras', 'parles', 'parlais', 'parlerais'], answer: 0, explanation: 'Regular futur simple: tu parleras' }
                ]
            },
            {
                id: 'pronouns',
                title: 'Les pronoms',
                titleEn: 'Pronouns',
                level: 'B1',
                icon: '👤',
                theory: 'French pronouns replace nouns to avoid repetition:\n\n**Subject:** je, tu, il/elle/on, nous, vous, ils/elles\n**Direct object (COD):** me, te, le/la, nous, vous, les\n**Indirect object (COI):** me, te, lui, nous, vous, leur\n**Stressed/Tonic:** moi, toi, lui/elle, nous, vous, eux/elles\n**Y:** replaces "à + place/thing" — *J\'y vais* (I\'m going there)\n**EN:** replaces "de + thing/quantity" — *J\'en veux* (I want some)\n\n**Order before verb:** me/te/se/nous/vous + le/la/les + lui/leur + y + en',
                exercises: [
                    { type: 'fill', question: 'Je vois Marie. → Je __ vois.', options: ['la', 'lui', 'le', 'les'], answer: 0, explanation: 'Marie is feminine direct object: la' },
                    { type: 'fill', question: 'Je parle à Pierre. → Je __ parle.', options: ['lui', 'le', 'la', 'leur'], answer: 0, explanation: 'Pierre is indirect object (parler à): lui' },
                    { type: 'fill', question: 'Tu vas à l\'école ? → Oui, j\' __ vais.', options: ['y', 'en', 'le', 'lui'], answer: 0, explanation: 'Y replaces "à l\'école": j\'y vais' },
                    { type: 'fill', question: 'Tu veux du café ? → Oui, j\' __ veux.', options: ['en', 'y', 'le', 'la'], answer: 0, explanation: 'En replaces "du café": j\'en veux' },
                    { type: 'fill', question: 'Il donne le livre à ses amis. → Il __ __ donne.', options: ['le leur', 'leur le', 'les lui', 'lui les'], answer: 0, explanation: 'COD (le) before COI (leur): Il le leur donne' }
                ]
            }
        ],
        tips: [
            { title: 'Gender Traps', content: 'Remember: nouns ending in -tion are almost always feminine (la nation, la solution). Nouns ending in -ment are usually masculine (le gouvernement).', level: 'A1' },
            { title: 'False Friends', content: 'Watch out! "Actuellement" means "currently" (NOT "actually"). "Librairie" means "bookstore" (NOT "library" = la bibliothèque).', level: 'A2' },
            { title: 'Preposition Traps', content: 'In French: "penser à" (think about), "jouer à" (play a sport), "jouer de" (play an instrument). Getting these wrong is a common TEF/TCF error.', level: 'B1' },
            { title: 'Formal vs Informal', content: 'TEF/TCF writing: ALWAYS use "vous" in formal letters. Use "tu" only in informal messages to friends. Mixing registers loses points!', level: 'B1' }
        ]
    },

    reading: {
        passages: [
            {
                id: 'r1',
                title: 'Annonce — Appartement à louer',
                titleEn: 'Ad — Apartment for Rent',
                level: 'A1',
                type: 'advertisement',
                text: 'À LOUER — Bel appartement 4½ au cœur du Plateau Mont-Royal, Montréal. 2 chambres, salon lumineux, cuisine moderne avec lave-vaisselle. Planchers de bois franc. Chauffage et eau chaude inclus. Proche du métro Mont-Royal (5 min à pied). Disponible le 1er juillet. Loyer : 1 450 $/mois. Animaux acceptés (petits). Contact : Mme Tremblay, 514-555-0142.',
                questions: [
                    { question: 'Combien de chambres a l\'appartement ?', options: ['1', '2', '3', '4'], answer: 1, answerText: '2 chambres' },
                    { question: 'Qu\'est-ce qui est inclus dans le loyer ?', options: ['L\'électricité', 'Le chauffage et l\'eau chaude', 'Le stationnement', 'Internet'], answer: 1, answerText: 'Chauffage et eau chaude inclus' },
                    { question: 'Où se trouve l\'appartement ?', options: ['Vieux-Montréal', 'Plateau Mont-Royal', 'Laval', 'Québec'], answer: 1, answerText: 'Au cœur du Plateau Mont-Royal' },
                    { question: 'Peut-on avoir des animaux ?', options: ['Non', 'Oui, tous les animaux', 'Oui, les petits animaux', 'Ce n\'est pas mentionné'], answer: 2, answerText: 'Animaux acceptés (petits)' }
                ]
            },
            {
                id: 'r2',
                title: 'Lettre formelle — Demande d\'information',
                titleEn: 'Formal Letter — Information Request',
                level: 'A2',
                type: 'letter',
                text: 'Montréal, le 15 mars 2025\n\nMadame, Monsieur,\n\nJe me permets de vous écrire afin d\'obtenir des renseignements sur vos cours de français pour immigrants. Je suis arrivé au Canada il y a trois mois et je souhaite améliorer mon niveau de français pour pouvoir travailler dans mon domaine.\n\nJe suis ingénieur de formation et mon niveau actuel est intermédiaire (B1). Je suis disponible en soirée, du lundi au jeudi.\n\nPourriez-vous m\'indiquer les horaires des cours, les frais d\'inscription et les modalités d\'inscription ?\n\nDans l\'attente de votre réponse, je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.\n\nAhmed Benali',
                questions: [
                    { question: 'Pourquoi Ahmed écrit-il cette lettre ?', options: ['Pour se plaindre', 'Pour demander des informations sur des cours', 'Pour postuler à un emploi', 'Pour résilier un abonnement'], answer: 1, answerText: 'Pour obtenir des renseignements sur des cours de français' },
                    { question: 'Depuis combien de temps Ahmed est-il au Canada ?', options: ['Un mois', 'Trois mois', 'Six mois', 'Un an'], answer: 1, answerText: 'Arrivé il y a trois mois' },
                    { question: 'Quel est le métier d\'Ahmed ?', options: ['Médecin', 'Professeur', 'Ingénieur', 'Avocat'], answer: 2, answerText: 'Ingénieur de formation' },
                    { question: 'Quand Ahmed est-il disponible ?', options: ['Le matin', 'L\'après-midi', 'En soirée', 'Le week-end'], answer: 2, answerText: 'Disponible en soirée, du lundi au jeudi' }
                ]
            },
            {
                id: 'r3',
                title: 'Article — Le bilinguisme au Canada',
                titleEn: 'Article — Bilingualism in Canada',
                level: 'B1',
                type: 'article',
                text: 'Le bilinguisme est au cœur de l\'identité canadienne. Depuis la Loi sur les langues officielles de 1969, le français et l\'anglais ont un statut égal dans les institutions fédérales. Aujourd\'hui, environ 18% des Canadiens se déclarent bilingues.\n\nAu Québec, le français est la langue officielle. La Charte de la langue française (loi 101) protège l\'usage du français dans la vie publique, le commerce et l\'éducation. Cependant, la situation linguistique évolue avec l\'immigration croissante et la mondialisation.\n\nPour les immigrants, la maîtrise du français est souvent essentielle, surtout au Québec. Les programmes comme Francisation Québec offrent des cours gratuits pour aider les nouveaux arrivants à s\'intégrer. Le TEF et le TCF sont les examens reconnus par IRCC pour prouver sa compétence en français.\n\nLes experts soulignent que le bilinguisme offre des avantages cognitifs, professionnels et culturels. Les employés bilingues gagnent en moyenne 10 à 15% de plus que leurs collègues unilingues dans la fonction publique fédérale.',
                questions: [
                    { question: 'Depuis quand le français et l\'anglais ont-ils un statut égal au niveau fédéral ?', options: ['1960', '1969', '1977', '1982'], answer: 1, answerText: 'Depuis la Loi sur les langues officielles de 1969' },
                    { question: 'Quel pourcentage de Canadiens se déclarent bilingues ?', options: ['10%', '15%', '18%', '25%'], answer: 2, answerText: 'Environ 18%' },
                    { question: 'Que fait Francisation Québec ?', options: ['Organise des examens', 'Offre des cours gratuits aux immigrants', 'Traduit des documents', 'Publie des livres'], answer: 1, answerText: 'Offre des cours gratuits pour aider les nouveaux arrivants' },
                    { question: 'Quel avantage salarial le bilinguisme offre-t-il dans la fonction publique ?', options: ['5-8%', '10-15%', '20-25%', '30%'], answer: 1, answerText: '10 à 15% de plus' }
                ]
            }
        ]
    },

    listening: {
        scripts: [
            {
                id: 'l1',
                title: 'Annonce à la gare',
                titleEn: 'Train Station Announcement',
                level: 'A2',
                type: 'announcement',
                text: 'Mesdames et messieurs, votre attention s\'il vous plaît. Le train numéro 645 à destination de Québec partira du quai numéro 3 dans dix minutes. Les passagers sont priés de se rendre sur le quai. N\'oubliez pas vos bagages. Merci et bon voyage.',
                speed: 1.0,
                questions: [
                    { question: 'Quel est le numéro du train ?', options: ['345', '546', '645', '654'], answer: 2 },
                    { question: 'Quelle est la destination ?', options: ['Montréal', 'Ottawa', 'Québec', 'Toronto'], answer: 2 },
                    { question: 'De quel quai part le train ?', options: ['Quai 1', 'Quai 2', 'Quai 3', 'Quai 4'], answer: 2 },
                    { question: 'Dans combien de minutes part le train ?', options: ['5', '10', '15', '20'], answer: 1 }
                ]
            },
            {
                id: 'l2',
                title: 'Conversation — Chez le médecin',
                titleEn: 'Conversation — At the Doctor\'s',
                level: 'B1',
                type: 'conversation',
                text: 'Médecin : Bonjour madame. Qu\'est-ce qui vous amène aujourd\'hui ?\nPatiente : Bonjour docteur. J\'ai très mal à la tête depuis trois jours. J\'ai aussi un peu de fièvre et je me sens très fatiguée.\nMédecin : Je vois. Avez-vous pris des médicaments ?\nPatiente : Oui, j\'ai pris du paracétamol, mais ça ne fait pas beaucoup d\'effet.\nMédecin : D\'accord. Je vais vous examiner. Ouvrez la bouche, s\'il vous plaît. Hmm, votre gorge est un peu rouge. Je pense que c\'est une grippe. Je vais vous prescrire un antibiotique et du repos.\nPatiente : Combien de temps est-ce que ça va durer ?\nMédecin : Environ une semaine. Restez au chaud et buvez beaucoup d\'eau. Si les symptômes persistent après 5 jours, revenez me voir.',
                speed: 0.9,
                questions: [
                    { question: 'Depuis combien de temps la patiente a-t-elle mal à la tête ?', options: ['Un jour', 'Deux jours', 'Trois jours', 'Une semaine'], answer: 2 },
                    { question: 'Qu\'a-t-elle pris comme médicament ?', options: ['De l\'aspirine', 'Du paracétamol', 'Un antibiotique', 'Rien'], answer: 1 },
                    { question: 'Quel est le diagnostic du médecin ?', options: ['Un rhume', 'Une grippe', 'Une allergie', 'Un mal de dos'], answer: 1 },
                    { question: 'Combien de temps la guérison devrait-elle prendre ?', options: ['3 jours', '5 jours', 'Une semaine', 'Deux semaines'], answer: 2 }
                ]
            },
            {
                id: 'l3',
                title: 'Message téléphonique',
                titleEn: 'Phone Message',
                level: 'A2',
                type: 'message',
                text: 'Bonjour, ici Marie Dupont de l\'agence immobilière Québec Logis. Je vous appelle au sujet de l\'appartement que vous avez visité samedi dernier, le 4 et demi sur la rue Saint-Denis. Le propriétaire a accepté votre offre ! Vous pouvez passer à notre bureau demain entre 9 heures et 17 heures pour signer le bail. N\'oubliez pas d\'apporter une pièce d\'identité et un chèque pour le premier mois de loyer. Mon numéro direct est le 514-555-0198. À demain, j\'espère !',
                speed: 1.0,
                questions: [
                    { question: 'Qui appelle ?', options: ['Un propriétaire', 'Une agente immobilière', 'Une amie', 'Un avocat'], answer: 1 },
                    { question: 'Qu\'est-ce que le propriétaire a fait ?', options: ['Refusé l\'offre', 'Accepté l\'offre', 'Augmenté le loyer', 'Vendu l\'appartement'], answer: 1 },
                    { question: 'Que faut-il apporter demain ?', options: ['Un CV', 'Une pièce d\'identité et un chèque', 'Des références', 'Un contrat'], answer: 1 },
                    { question: 'Quelles sont les heures d\'ouverture du bureau ?', options: ['8h-16h', '9h-17h', '10h-18h', '8h-17h'], answer: 1 }
                ]
            }
        ]
    },

    writing: {
        prompts: [
            {
                id: 'w1',
                title: 'Lettre formelle — Demande d\'information',
                titleEn: 'Formal Letter — Information Request',
                level: 'A2',
                type: 'TEF_task1',
                instruction: 'Vous venez d\'arriver au Canada et vous cherchez un cours de français. Écrivez une lettre formelle au centre de langues pour demander des informations sur les cours disponibles, les horaires et les frais.',
                instructionEn: 'You just arrived in Canada and are looking for a French course. Write a formal letter to the language center asking for information about available courses, schedules, and fees.',
                wordCount: { min: 80, max: 120 },
                tips: [
                    'Start with "Madame, Monsieur,"',
                    'Use "vous" throughout (formal register)',
                    'Close with "Veuillez agréer... mes salutations distinguées"',
                    'Mention your situation, what you need, and ask specific questions'
                ],
                phraseBankIds: ['formal_opening', 'formal_closing', 'asking_info', 'describing_situation'],
                modelAnswer: 'Montréal, le 15 octobre 2025\n\nMadame, Monsieur,\n\nJe me permets de vous écrire afin de me renseigner sur vos cours de français. Je suis récemment arrivé(e) au Canada et je souhaite améliorer mon niveau de français pour m\'intégrer dans la vie professionnelle.\n\nMon niveau actuel est A2 et je suis disponible les soirs de semaine. Pourriez-vous m\'indiquer quels cours sont offerts, les horaires disponibles ainsi que les frais d\'inscription ?\n\nJe vous remercie par avance de votre réponse et vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.\n\n[Votre nom]',
                checklist: [
                    'Used formal greeting (Madame, Monsieur)',
                    'Explained reason for writing',
                    'Asked clear questions',
                    'Used polite language (vous, pourriez-vous)',
                    'Included formal closing',
                    'Word count met (80-120 words)'
                ]
            },
            {
                id: 'w2',
                title: 'Message amical — Invitation',
                titleEn: 'Friendly Message — Invitation',
                level: 'A2',
                type: 'TEF_task2',
                instruction: 'Votre ami(e) francophone vous a invité(e) à sa fête d\'anniversaire. Écrivez un message pour accepter l\'invitation, demander des détails et proposer d\'apporter quelque chose.',
                instructionEn: 'Your French-speaking friend invited you to their birthday party. Write a message to accept the invitation, ask for details, and offer to bring something.',
                wordCount: { min: 60, max: 80 },
                tips: [
                    'Use informal register (tu)',
                    'Express enthusiasm',
                    'Ask practical questions (where, when)',
                    'Offer to bring food/drinks'
                ],
                phraseBankIds: ['informal_greeting', 'accepting', 'asking_details', 'offering_help'],
                modelAnswer: 'Salut Marie !\n\nMerci pour l\'invitation, c\'est super ! Je suis vraiment content(e) de venir à ta fête ! 🎉\n\nEst-ce que tu peux me dire l\'heure exacte et l\'adresse ? C\'est chez toi ou dans un restaurant ?\n\nJe voudrais apporter quelque chose — tu préfères un gâteau ou une bouteille de vin ?\n\nÀ samedi !\nBises',
                checklist: [
                    'Used informal greeting (Salut, Coucou)',
                    'Accepted enthusiastically',
                    'Asked relevant questions',
                    'Offered to contribute',
                    'Used informal closing (Bises, À bientôt)',
                    'Word count met (60-80 words)'
                ]
            },
            {
                id: 'w3',
                title: 'Essai d\'opinion',
                titleEn: 'Opinion Essay',
                level: 'B2',
                type: 'TCF_task3',
                instruction: 'Certaines personnes pensent que le télétravail est l\'avenir du monde professionnel. D\'autres estiment que le travail en bureau reste essentiel. Donnez votre opinion argumentée sur ce sujet.',
                instructionEn: 'Some people think remote work is the future of the professional world. Others believe office work remains essential. Give your argued opinion on this topic.',
                wordCount: { min: 200, max: 300 },
                tips: [
                    'State your opinion clearly in the introduction',
                    'Use connectors: d\'abord, ensuite, de plus, en revanche, cependant',
                    'Give examples to support your arguments',
                    'Address  counterarguments',
                    'Conclude with a nuanced position'
                ],
                phraseBankIds: ['opinion_expressions', 'connectors', 'argumentation', 'conclusion'],
                modelAnswer: '',
                checklist: [
                    'Clear introduction with thesis statement',
                    'Used opinion markers (à mon avis, je pense que)',
                    'Logical organization with connectors',
                    'At least 2 supporting arguments',
                    'Addressed opposing viewpoint',
                    'Strong conclusion',
                    'Appropriate formal register',
                    'Word count met (200-300 words)'
                ]
            }
        ],
        phraseBank: {
            formal_opening: [
                'Madame, Monsieur,',
                'Je me permets de vous écrire afin de...',
                'Suite à votre annonce, je souhaite...',
                'Par la présente, je vous contacte pour...'
            ],
            formal_closing: [
                'Veuillez agréer mes salutations distinguées.',
                'Je vous prie d\'agréer l\'expression de mes sentiments respectueux.',
                'Dans l\'attente de votre réponse, veuillez recevoir mes sincères salutations.',
                'Cordialement,'
            ],
            asking_info: [
                'Pourriez-vous m\'indiquer...',
                'Je souhaiterais savoir...',
                'Serait-il possible de...',
                'Je vous serais reconnaissant(e) de bien vouloir...'
            ],
            describing_situation: [
                'Je suis récemment arrivé(e) au Canada.',
                'Je suis actuellement à la recherche de...',
                'Mon objectif est de...',
                'Je souhaite améliorer mon niveau de...'
            ],
            informal_greeting: ['Salut !', 'Coucou !', 'Cher/Chère...', 'Hey !'],
            accepting: ['Avec plaisir !', 'C\'est super !', 'J\'adorerais !', 'Bien sûr, je viens !'],
            asking_details: ['Tu peux me dire...?', 'C\'est à quelle heure ?', 'Où est-ce que c\'est ?', 'Il faut apporter quelque chose ?'],
            offering_help: ['Je peux apporter...', 'Tu veux que j\'amène...?', 'Est-ce que je peux aider pour...?'],
            opinion_expressions: ['À mon avis,', 'Je pense que...', 'Selon moi,', 'Il me semble que...', 'Je suis convaincu(e) que...'],
            connectors: ['D\'abord,', 'Ensuite,', 'De plus,', 'En revanche,', 'Cependant,', 'Par conséquent,', 'En conclusion,'],
            argumentation: ['Un premier argument est que...', 'On peut également souligner que...', 'Il est important de noter que...', 'Les chiffres montrent que...'],
            conclusion: ['En conclusion,', 'Pour résumer,', 'En définitive,', 'Tout compte fait,']
        }
    },

    mockExam: {
        TEF: {
            name: 'TEF Canada',
            sections: {
                listening: { name: 'Compréhension orale', duration: 40, questions: 40 },
                reading: { name: 'Compréhension écrite', duration: 60, questions: 40 },
                writing: { name: 'Expression écrite', duration: 60, tasks: 2 },
                speaking: { name: 'Expression orale', duration: 15, tasks: 2 }
            },
            scoring: [
                { clb: 1, listening: '0-16', reading: '0-16', writing: '0-16', speaking: '0-16' },
                { clb: 4, listening: '145-180', reading: '121-150', writing: '181-225', speaking: '181-225' },
                { clb: 5, listening: '181-216', reading: '151-180', writing: '226-270', speaking: '226-270' },
                { clb: 7, listening: '249-279', reading: '207-232', writing: '310-348', speaking: '310-348' },
                { clb: 9, listening: '298-333', reading: '248-279', writing: '393-415', speaking: '393-415' },
                { clb: 10, listening: '334-360', reading: '280-300', writing: '416-450', speaking: '416-450' }
            ]
        },
        TCF: {
            name: 'TCF Canada',
            sections: {
                listening: { name: 'Compréhension orale', duration: 35, questions: 39 },
                reading: { name: 'Compréhension écrite', duration: 60, questions: 39 },
                writing: { name: 'Expression écrite', duration: 60, tasks: 3 },
                speaking: { name: 'Expression orale', duration: 12, tasks: 3 }
            }
        },
        clbDescriptions: {
            1: { label: 'CLB 1 — Beginner', description: 'Very basic communication ability' },
            2: { label: 'CLB 2 — Elementary', description: 'Can handle simple social situations' },
            3: { label: 'CLB 3 — Elementary+', description: 'Can handle familiar routine tasks' },
            4: { label: 'CLB 4 — Low Intermediate', description: 'Can handle basic everyday situations' },
            5: { label: 'CLB 5 — Intermediate', description: 'Can communicate with some confidence' },
            6: { label: 'CLB 6 — Intermediate+', description: 'Can participate in conversations on familiar topics' },
            7: { label: 'CLB 7 — High Intermediate', description: 'Required for many immigration programs' },
            8: { label: 'CLB 8 — Upper Intermediate', description: 'Can handle most professional situations' },
            9: { label: 'CLB 9 — Advanced', description: 'Can communicate effectively in complex situations' },
            10: { label: 'CLB 10+ — Proficient', description: 'Near-native proficiency in most situations' }
        },
        strategies: [
            { section: 'listening', tip: 'Read the questions BEFORE listening to the audio. This helps you know what information to focus on.' },
            { section: 'listening', tip: 'Don\'t panic if you miss something. Move on and focus on the next question.' },
            { section: 'reading', tip: 'Read the questions first, then scan the text for answers. Don\'t read every word — look for keywords.' },
            { section: 'reading', tip: 'Pay attention to negation words (ne...pas, ne...jamais) — they often change the meaning completely.' },
            { section: 'writing', tip: 'Plan your writing for 5 minutes before starting. An organized text scores much higher than a long, disorganized one.' },
            { section: 'writing', tip: 'Use linking words (d\'abord, ensuite, cependant, en conclusion) to show logical progression.' },
            { section: 'speaking', tip: 'It\'s okay to pause briefly to think, but avoid long silences. Use fillers: "Alors...", "C\'est-à-dire...", "En fait..."' },
            { section: 'speaking', tip: 'Speak clearly and at a natural pace. Speaking too fast causes more errors.' }
        ]
    }
};

