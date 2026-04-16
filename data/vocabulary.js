/* ============================================================
   FrançAce — Vocabulary Data
   Curated vocabulary organized by TEF/TCF topic categories
   ============================================================ */

export const VOCABULARY_DATA = {
    categories: [
        {
            id: 'greetings',
            name: 'Greetings & Introductions',
            nameEn: 'Greetings',
            icon: '👋',
            level: 'A1',
            words: [
                { fr: 'Bonjour', en: 'Hello / Good day', phonetic: 'bohn-zhoor', example: 'Bonjour, comment allez-vous ?', exampleEn: 'Hello, how are you?' },
                { fr: 'Bonsoir', en: 'Good evening', phonetic: 'bohn-swahr', example: 'Bonsoir, madame.', exampleEn: 'Good evening, madam.' },
                { fr: 'Salut', en: 'Hi / Bye (informal)', phonetic: 'sah-lew', example: 'Salut, ça va ?', exampleEn: 'Hi, how are you?' },
                { fr: 'Au revoir', en: 'Goodbye', phonetic: 'oh ruh-vwahr', example: 'Au revoir et bonne journée !', exampleEn: 'Goodbye and have a good day!' },
                { fr: 'Merci', en: 'Thank you', phonetic: 'mair-see', example: 'Merci beaucoup !', exampleEn: 'Thank you very much!' },
                { fr: "S'il vous plaît", en: 'Please (formal)', phonetic: 'seel voo play', example: "Un café, s'il vous plaît.", exampleEn: 'A coffee, please.' },
                { fr: 'Excusez-moi', en: 'Excuse me', phonetic: 'ex-kew-zay-mwah', example: 'Excusez-moi, où est la gare ?', exampleEn: 'Excuse me, where is the station?' },
                { fr: 'Je suis', en: 'I am', phonetic: 'zhuh swee', example: 'Je suis canadien.', exampleEn: 'I am Canadian.' },
                { fr: 'Comment vous appelez-vous ?', en: 'What is your name?', phonetic: 'koh-mahn voo zah-play-voo', example: 'Comment vous appelez-vous ? — Je m\'appelle Marie.', exampleEn: 'What is your name? — My name is Marie.' },
                { fr: 'Enchanté(e)', en: 'Pleased to meet you', phonetic: 'ahn-shahn-tay', example: 'Enchanté, je suis Pierre.', exampleEn: 'Pleased to meet you, I am Pierre.' },
                { fr: 'Bienvenue', en: 'Welcome', phonetic: 'byahn-vuh-new', example: 'Bienvenue au Canada !', exampleEn: 'Welcome to Canada!' },
                { fr: 'Bonne journée', en: 'Have a good day', phonetic: 'bun zhoor-nay', example: 'Merci et bonne journée !', exampleEn: 'Thank you and have a good day!' }
            ]
        },
        {
            id: 'numbers',
            name: 'Nombres et chiffres',
            nameEn: 'Numbers',
            icon: '🔢',
            level: 'A1',
            words: [
                { fr: 'Un', en: 'One (1)', phonetic: 'uhn', example: 'J\'ai un frère.', exampleEn: 'I have one brother.' },
                { fr: 'Deux', en: 'Two (2)', phonetic: 'duh', example: 'Deux cafés, s\'il vous plaît.', exampleEn: 'Two coffees, please.' },
                { fr: 'Trois', en: 'Three (3)', phonetic: 'twah', example: 'Il y a trois chambres.', exampleEn: 'There are three rooms.' },
                { fr: 'Quatre', en: 'Four (4)', phonetic: 'katr', example: 'J\'ai quatre enfants.', exampleEn: 'I have four children.' },
                { fr: 'Cinq', en: 'Five (5)', phonetic: 'sank', example: 'Cinq minutes, s\'il vous plaît.', exampleEn: 'Five minutes, please.' },
                { fr: 'Dix', en: 'Ten (10)', phonetic: 'deess', example: 'J\'habite ici depuis dix ans.', exampleEn: 'I\'ve lived here for ten years.' },
                { fr: 'Vingt', en: 'Twenty (20)', phonetic: 'vahn', example: 'Elle a vingt ans.', exampleEn: 'She is twenty years old.' },
                { fr: 'Cinquante', en: 'Fifty (50)', phonetic: 'sahn-kahnt', example: 'Il y a cinquante employés.', exampleEn: 'There are fifty employees.' },
                { fr: 'Cent', en: 'One hundred (100)', phonetic: 'sahn', example: 'Ça coûte cent dollars.', exampleEn: 'It costs one hundred dollars.' },
                { fr: 'Mille', en: 'One thousand (1000)', phonetic: 'meel', example: 'Il y a mille personnes.', exampleEn: 'There are a thousand people.' },
                { fr: 'Premier / Première', en: 'First', phonetic: 'pruh-myay / pruh-myehr', example: 'C\'est ma première visite.', exampleEn: 'It\'s my first visit.' },
                { fr: 'Dernier / Dernière', en: 'Last', phonetic: 'dair-nyay / dair-nyehr', example: 'C\'est le dernier jour.', exampleEn: 'It\'s the last day.' }
            ]
        },
        {
            id: 'family',
            name: 'Famille et relations',
            nameEn: 'Family',
            icon: '👨‍👩‍👧‍👦',
            level: 'A1',
            words: [
                { fr: 'La famille', en: 'Family', phonetic: 'lah fah-mee', example: 'Ma famille habite au Canada.', exampleEn: 'My family lives in Canada.' },
                { fr: 'Le père', en: 'Father', phonetic: 'luh pair', example: 'Mon père est médecin.', exampleEn: 'My father is a doctor.' },
                { fr: 'La mère', en: 'Mother', phonetic: 'lah mair', example: 'Ma mère est professeure.', exampleEn: 'My mother is a teacher.' },
                { fr: 'Le frère', en: 'Brother', phonetic: 'luh frair', example: 'Mon frère a vingt ans.', exampleEn: 'My brother is twenty years old.' },
                { fr: 'La sœur', en: 'Sister', phonetic: 'lah sir', example: 'Ma sœur habite à Montréal.', exampleEn: 'My sister lives in Montreal.' },
                { fr: 'Le mari', en: 'Husband', phonetic: 'luh mah-ree', example: 'Mon mari travaille à Ottawa.', exampleEn: 'My husband works in Ottawa.' },
                { fr: 'La femme', en: 'Wife / Woman', phonetic: 'lah fahm', example: 'Ma femme est ingénieure.', exampleEn: 'My wife is an engineer.' },
                { fr: 'Les enfants', en: 'Children', phonetic: 'lay zahn-fahn', example: 'Nous avons deux enfants.', exampleEn: 'We have two children.' },
                { fr: 'Le fils', en: 'Son', phonetic: 'luh feess', example: 'Mon fils va à l\'école.', exampleEn: 'My son goes to school.' },
                { fr: 'La fille', en: 'Daughter / Girl', phonetic: 'lah fee', example: 'Ma fille aime la musique.', exampleEn: 'My daughter loves music.' },
                { fr: 'Les grands-parents', en: 'Grandparents', phonetic: 'lay grahn-pah-rahn', example: 'Mes grands-parents sont québécois.', exampleEn: 'My grandparents are from Quebec.' },
                { fr: 'L\'ami(e)', en: 'Friend', phonetic: 'lah-mee', example: 'C\'est mon meilleur ami.', exampleEn: 'He\'s my best friend.' }
            ]
        },
        {
            id: 'work',
            name: 'Travail et profession',
            nameEn: 'Work',
            icon: '💼',
            level: 'A2',
            words: [
                { fr: 'Le travail', en: 'Work / Job', phonetic: 'luh trah-vahy', example: 'Je cherche du travail.', exampleEn: 'I am looking for work.' },
                { fr: 'L\'emploi', en: 'Employment', phonetic: 'lahm-plwah', example: 'Il a trouvé un emploi.', exampleEn: 'He found a job.' },
                { fr: 'Le bureau', en: 'Office', phonetic: 'luh bew-roh', example: 'Je travaille dans un bureau.', exampleEn: 'I work in an office.' },
                { fr: 'Le salaire', en: 'Salary', phonetic: 'luh sah-lehr', example: 'Le salaire est bon.', exampleEn: 'The salary is good.' },
                { fr: 'Le patron', en: 'Boss', phonetic: 'luh pah-trohn', example: 'Mon patron est gentil.', exampleEn: 'My boss is nice.' },
                { fr: 'Le collègue', en: 'Colleague', phonetic: 'luh koh-leg', example: 'Mes collègues sont sympathiques.', exampleEn: 'My colleagues are friendly.' },
                { fr: 'L\'entrevue', en: 'Interview', phonetic: 'lahn-truh-vew', example: 'J\'ai une entrevue demain.', exampleEn: 'I have an interview tomorrow.' },
                { fr: 'Le CV / Le curriculum vitae', en: 'Resume / CV', phonetic: 'luh say-vay', example: 'J\'ai envoyé mon CV.', exampleEn: 'I sent my resume.' },
                { fr: 'Travailler', en: 'To work', phonetic: 'trah-vah-yay', example: 'Elle travaille à temps plein.', exampleEn: 'She works full-time.' },
                { fr: 'Embaucher', en: 'To hire', phonetic: 'ahm-boh-shay', example: 'L\'entreprise va embaucher.', exampleEn: 'The company is going to hire.' },
                { fr: 'La formation', en: 'Training', phonetic: 'lah for-mah-syohn', example: 'J\'ai suivi une formation.', exampleEn: 'I completed a training program.' },
                { fr: 'L\'expérience', en: 'Experience', phonetic: 'lex-pay-ree-ahnss', example: 'J\'ai cinq ans d\'expérience.', exampleEn: 'I have five years of experience.' }
            ]
        },
        {
            id: 'housing',
            name: 'Logement',
            nameEn: 'Housing',
            icon: '🏠',
            level: 'A2',
            words: [
                { fr: 'La maison', en: 'House', phonetic: 'lah may-zohn', example: 'Nous avons une grande maison.', exampleEn: 'We have a big house.' },
                { fr: 'L\'appartement', en: 'Apartment', phonetic: 'lah-par-tuh-mahn', example: 'Je loue un appartement.', exampleEn: 'I rent an apartment.' },
                { fr: 'Le loyer', en: 'Rent', phonetic: 'luh lwah-yay', example: 'Le loyer est de 1200 dollars.', exampleEn: 'The rent is 1200 dollars.' },
                { fr: 'La chambre', en: 'Bedroom', phonetic: 'lah shahmb-ruh', example: 'Il y a trois chambres.', exampleEn: 'There are three bedrooms.' },
                { fr: 'La cuisine', en: 'Kitchen', phonetic: 'lah kwee-zeen', example: 'La cuisine est moderne.', exampleEn: 'The kitchen is modern.' },
                { fr: 'La salle de bain', en: 'Bathroom', phonetic: 'lah sal duh bahn', example: 'La salle de bain est grande.', exampleEn: 'The bathroom is large.' },
                { fr: 'Déménager', en: 'To move (house)', phonetic: 'day-may-nah-zhay', example: 'Nous allons déménager.', exampleEn: 'We are going to move.' },
                { fr: 'Le propriétaire', en: 'Landlord / Owner', phonetic: 'luh proh-pree-ay-tehr', example: 'Le propriétaire est absent.', exampleEn: 'The landlord is away.' },
                { fr: 'Le bail', en: 'Lease', phonetic: 'luh bahy', example: 'J\'ai signé le bail.', exampleEn: 'I signed the lease.' },
                { fr: 'Le quartier', en: 'Neighborhood', phonetic: 'luh kahr-tyay', example: 'C\'est un beau quartier.', exampleEn: 'It\'s a nice neighborhood.' },
                { fr: 'Les meubles', en: 'Furniture', phonetic: 'lay muhbl', example: 'L\'appartement est meublé.', exampleEn: 'The apartment is furnished.' },
                { fr: 'Le chauffage', en: 'Heating', phonetic: 'luh shoh-fahzh', example: 'Le chauffage est inclus.', exampleEn: 'Heating is included.' }
            ]
        },
        {
            id: 'travel',
            name: 'Voyages et transport',
            nameEn: 'Travel',
            icon: '✈️',
            level: 'A2',
            words: [
                { fr: 'Le voyage', en: 'Trip / Travel', phonetic: 'luh vwah-yahzh', example: 'Bon voyage !', exampleEn: 'Have a good trip!' },
                { fr: 'L\'avion', en: 'Airplane', phonetic: 'lah-vyohn', example: 'Je prends l\'avion demain.', exampleEn: 'I\'m taking the plane tomorrow.' },
                { fr: 'Le train', en: 'Train', phonetic: 'luh trahn', example: 'Le train part à huit heures.', exampleEn: 'The train leaves at eight.' },
                { fr: 'Le métro', en: 'Subway', phonetic: 'luh may-troh', example: 'Je prends le métro tous les jours.', exampleEn: 'I take the subway every day.' },
                { fr: 'L\'autobus', en: 'Bus', phonetic: 'loh-toh-bews', example: 'L\'autobus arrive dans cinq minutes.', exampleEn: 'The bus arrives in five minutes.' },
                { fr: 'Le billet', en: 'Ticket', phonetic: 'luh bee-yay', example: 'J\'ai acheté un billet aller-retour.', exampleEn: 'I bought a round-trip ticket.' },
                { fr: 'La gare', en: 'Train station', phonetic: 'lah gahr', example: 'La gare est près d\'ici.', exampleEn: 'The station is near here.' },
                { fr: 'L\'aéroport', en: 'Airport', phonetic: 'lah-ay-roh-por', example: 'On va à l\'aéroport.', exampleEn: 'We\'re going to the airport.' },
                { fr: 'Le passeport', en: 'Passport', phonetic: 'luh pahs-por', example: 'Voici mon passeport.', exampleEn: 'Here is my passport.' },
                { fr: 'La valise', en: 'Suitcase', phonetic: 'lah vah-leez', example: 'Ma valise est lourde.', exampleEn: 'My suitcase is heavy.' },
                { fr: 'Réserver', en: 'To book / Reserve', phonetic: 'ray-zair-vay', example: 'J\'ai réservé un hôtel.', exampleEn: 'I booked a hotel.' },
                { fr: 'Le plan de la ville', en: 'City map', phonetic: 'luh plahn duh lah veel', example: 'Avez-vous un plan de la ville ?', exampleEn: 'Do you have a city map?' }
            ]
        },
        {
            id: 'health',
            name: 'Santé et bien-être',
            nameEn: 'Health',
            icon: '🏥',
            level: 'B1',
            words: [
                { fr: 'La santé', en: 'Health', phonetic: 'lah sahn-tay', example: 'La santé est importante.', exampleEn: 'Health is important.' },
                { fr: 'Le médecin', en: 'Doctor', phonetic: 'luh mayd-sahn', example: 'J\'ai rendez-vous chez le médecin.', exampleEn: 'I have a doctor\'s appointment.' },
                { fr: 'L\'hôpital', en: 'Hospital', phonetic: 'loh-pee-tal', example: 'L\'hôpital est près d\'ici.', exampleEn: 'The hospital is near here.' },
                { fr: 'La pharmacie', en: 'Pharmacy', phonetic: 'lah far-mah-see', example: 'Je vais à la pharmacie.', exampleEn: 'I\'m going to the pharmacy.' },
                { fr: 'Le médicament', en: 'Medication', phonetic: 'luh may-dee-kah-mahn', example: 'Je prends ce médicament.', exampleEn: 'I take this medication.' },
                { fr: 'La douleur', en: 'Pain', phonetic: 'lah doo-luhr', example: 'J\'ai une douleur au dos.', exampleEn: 'I have back pain.' },
                { fr: 'La fièvre', en: 'Fever', phonetic: 'lah fyevr', example: 'Il a de la fièvre.', exampleEn: 'He has a fever.' },
                { fr: 'L\'ordonnance', en: 'Prescription', phonetic: 'lor-doh-nahnss', example: 'Le médecin m\'a donné une ordonnance.', exampleEn: 'The doctor gave me a prescription.' },
                { fr: 'L\'assurance maladie', en: 'Health insurance', phonetic: 'lah-sew-rahnss mah-lah-dee', example: 'J\'ai une assurance maladie.', exampleEn: 'I have health insurance.' },
                { fr: 'Le rendez-vous', en: 'Appointment', phonetic: 'luh rahn-day-voo', example: 'J\'ai un rendez-vous à 14 heures.', exampleEn: 'I have an appointment at 2 PM.' },
                { fr: 'Être malade', en: 'To be sick', phonetic: 'etr mah-lahd', example: 'Je suis malade depuis hier.', exampleEn: 'I\'ve been sick since yesterday.' },
                { fr: 'Guérir', en: 'To heal / Recover', phonetic: 'gay-reer', example: 'Il va guérir bientôt.', exampleEn: 'He\'ll recover soon.' }
            ]
        },
        {
            id: 'education',
            name: 'Éducation et études',
            nameEn: 'Education',
            icon: '🎓',
            level: 'B1',
            words: [
                { fr: 'L\'école', en: 'School', phonetic: 'lay-kol', example: 'Les enfants vont à l\'école.', exampleEn: 'The children go to school.' },
                { fr: 'L\'université', en: 'University', phonetic: 'lew-nee-vair-see-tay', example: 'J\'étudie à l\'université.', exampleEn: 'I study at the university.' },
                { fr: 'Le cours', en: 'Course / Class', phonetic: 'luh koor', example: 'J\'ai un cours de français.', exampleEn: 'I have a French class.' },
                { fr: 'Le diplôme', en: 'Diploma / Degree', phonetic: 'luh dee-plohm', example: 'J\'ai un diplôme en informatique.', exampleEn: 'I have a degree in computer science.' },
                { fr: 'L\'examen', en: 'Exam', phonetic: 'leg-zah-mahn', example: 'L\'examen est la semaine prochaine.', exampleEn: 'The exam is next week.' },
                { fr: 'Étudier', en: 'To study', phonetic: 'ay-tew-dyay', example: 'J\'étudie le français.', exampleEn: 'I study French.' },
                { fr: 'Apprendre', en: 'To learn', phonetic: 'ah-prahndr', example: 'J\'apprends le français.', exampleEn: 'I\'m learning French.' },
                { fr: 'Le professeur', en: 'Teacher / Professor', phonetic: 'luh proh-feh-suhr', example: 'Le professeur explique bien.', exampleEn: 'The teacher explains well.' },
                { fr: 'Le devoir', en: 'Homework / Assignment', phonetic: 'luh duh-vwahr', example: 'J\'ai fini mes devoirs.', exampleEn: 'I finished my homework.' },
                { fr: 'La note', en: 'Grade / Mark', phonetic: 'lah noht', example: 'J\'ai de bonnes notes.', exampleEn: 'I have good grades.' },
                { fr: 'Réussir', en: 'To succeed / Pass', phonetic: 'ray-ew-seer', example: 'J\'espère réussir l\'examen.', exampleEn: 'I hope to pass the exam.' },
                { fr: 'Échouer', en: 'To fail', phonetic: 'ay-shoo-ay', example: 'Je ne veux pas échouer.', exampleEn: 'I don\'t want to fail.' }
            ]
        },
        {
            id: 'immigration',
            name: 'Immigration et citoyenneté',
            nameEn: 'Immigration',
            icon: '🍁',
            level: 'B1',
            words: [
                { fr: 'L\'immigration', en: 'Immigration', phonetic: 'lee-mee-grah-syohn', example: 'Le bureau d\'immigration est ouvert.', exampleEn: 'The immigration office is open.' },
                { fr: 'La résidence permanente', en: 'Permanent residence', phonetic: 'lah ray-zee-dahnss pair-mah-nahnt', example: 'J\'ai obtenu la résidence permanente.', exampleEn: 'I obtained permanent residence.' },
                { fr: 'La citoyenneté', en: 'Citizenship', phonetic: 'lah see-twah-yehn-tay', example: 'Je vais demander la citoyenneté.', exampleEn: 'I\'m going to apply for citizenship.' },
                { fr: 'Le visa', en: 'Visa', phonetic: 'luh vee-zah', example: 'Mon visa est valide.', exampleEn: 'My visa is valid.' },
                { fr: 'Le formulaire', en: 'Form', phonetic: 'luh for-mew-lehr', example: 'J\'ai rempli le formulaire.', exampleEn: 'I filled out the form.' },
                { fr: 'La demande', en: 'Application / Request', phonetic: 'lah duh-mahnd', example: 'J\'ai soumis ma demande.', exampleEn: 'I submitted my application.' },
                { fr: 'Le relevé de notes', en: 'Transcript', phonetic: 'luh ruh-luh-vay duh noht', example: 'J\'ai besoin de mon relevé de notes.', exampleEn: 'I need my transcript.' },
                { fr: 'La preuve', en: 'Proof / Evidence', phonetic: 'lah pruhv', example: 'Il faut une preuve de fonds.', exampleEn: 'You need proof of funds.' },
                { fr: 'Le permis de travail', en: 'Work permit', phonetic: 'luh pair-mee duh trah-vahy', example: 'J\'ai un permis de travail.', exampleEn: 'I have a work permit.' },
                { fr: 'L\'Entrée express', en: 'Express Entry', phonetic: 'lahn-tray ex-press', example: 'J\'utilise l\'Entrée express.', exampleEn: 'I\'m using Express Entry.' },
                { fr: 'Les points', en: 'Points', phonetic: 'lay pwahn', example: 'J\'ai assez de points.', exampleEn: 'I have enough points.' },
                { fr: 'Le niveau de langue', en: 'Language level', phonetic: 'luh nee-voh duh lahng', example: 'Mon niveau de langue est B2.', exampleEn: 'My language level is B2.' }
            ]
        },
        {
            id: 'daily',
            name: 'Vie quotidienne',
            nameEn: 'Daily Life',
            icon: '☀️',
            level: 'A2',
            words: [
                { fr: 'Le matin', en: 'Morning', phonetic: 'luh mah-tahn', example: 'Je me lève tôt le matin.', exampleEn: 'I wake up early in the morning.' },
                { fr: 'L\'après-midi', en: 'Afternoon', phonetic: 'lah-pray-mee-dee', example: 'J\'étudie l\'après-midi.', exampleEn: 'I study in the afternoon.' },
                { fr: 'Le soir', en: 'Evening', phonetic: 'luh swahr', example: 'Le soir, je regarde la télé.', exampleEn: 'In the evening, I watch TV.' },
                { fr: 'Aujourd\'hui', en: 'Today', phonetic: 'oh-zhoor-dwee', example: 'Aujourd\'hui, il fait beau.', exampleEn: 'Today, the weather is nice.' },
                { fr: 'Demain', en: 'Tomorrow', phonetic: 'duh-mahn', example: 'Je commence demain.', exampleEn: 'I start tomorrow.' },
                { fr: 'Hier', en: 'Yesterday', phonetic: 'ee-air', example: 'Hier, j\'ai étudié.', exampleEn: 'Yesterday, I studied.' },
                { fr: 'Toujours', en: 'Always', phonetic: 'too-zhoor', example: 'Je suis toujours à l\'heure.', exampleEn: 'I am always on time.' },
                { fr: 'Souvent', en: 'Often', phonetic: 'soo-vahn', example: 'Je lis souvent le journal.', exampleEn: 'I often read the newspaper.' },
                { fr: 'Parfois', en: 'Sometimes', phonetic: 'pahr-fwah', example: 'Parfois, je cuisine.', exampleEn: 'Sometimes, I cook.' },
                { fr: 'Manger', en: 'To eat', phonetic: 'mahn-zhay', example: 'Je mange à midi.', exampleEn: 'I eat at noon.' },
                { fr: 'Dormir', en: 'To sleep', phonetic: 'dor-meer', example: 'Je dors huit heures.', exampleEn: 'I sleep eight hours.' },
                { fr: 'Se promener', en: 'To take a walk', phonetic: 'suh proh-muh-nay', example: 'J\'aime me promener le soir.', exampleEn: 'I like to take a walk in the evening.' }
            ]
        }
    ]
};

