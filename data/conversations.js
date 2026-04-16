/* ============================================================
   FrançAce — Conversations Data
   Dialogue trees for AI conversation partner scenarios
   ============================================================ */

export const CONVERSATIONS_DATA = {
    scenarios: [
        {
            id: 'store-inquiry',
            title: 'Demander des informations dans un magasin',
            titleEn: 'Asking for information at a store',
            level: 'A2',
            icon: '🛍️',
            context: 'You are at a department store and need help finding an item.',
            contextFr: 'Vous êtes dans un grand magasin et vous avez besoin d\'aide.',
            greeting: 'Bonjour ! Bienvenue dans notre magasin. Comment puis-je vous aider ?',
            greetingEn: 'Hello! Welcome to our store. How can I help you?',
            suggestedResponses: [
                'Bonjour, je cherche un manteau d\'hiver.',
                'Excusez-moi, où se trouvent les chaussures ?',
                'Je voudrais acheter un cadeau.'
            ],
            dialogueTree: {
                'cherche|manteau|veste|coat': {
                    response: 'Bien sûr ! Les manteaux sont au deuxième étage. Vous cherchez un manteau pour homme ou pour femme ?',
                    responseEn: 'Of course! The coats are on the second floor. Are you looking for a men\'s or women\'s coat?',
                    followUp: {
                        'homme|man|men': {
                            response: 'Les manteaux pour homme sont à droite en sortant de l\'ascenseur. Quelle taille cherchez-vous ?',
                            responseEn: 'Men\'s coats are to the right as you exit the elevator. What size are you looking for?'
                        },
                        'femme|woman|women': {
                            response: 'Les manteaux pour femme sont à gauche. Nous avons des promotions en ce moment — jusqu\'à 30% de réduction !',
                            responseEn: 'Women\'s coats are to the left. We have promotions right now — up to 30% off!'
                        },
                        'taille|size|medium|large': {
                            response: 'Très bien. Nous avons toutes les tailles de S à XXL. Voulez-vous que je vous montre les nouveautés ?',
                            responseEn: 'Very well. We have all sizes from S to XXL. Would you like me to show you the new arrivals?'
                        }
                    }
                },
                'chaussures|shoes|souliers': {
                    response: 'Les chaussures sont au premier étage, au fond du magasin. Quel type de chaussures cherchez-vous ? Des bottes, des baskets, des souliers habillés ?',
                    responseEn: 'Shoes are on the first floor, at the back of the store. What type of shoes are you looking for? Boots, sneakers, dress shoes?',
                    followUp: {
                        'bottes|boots': {
                            response: 'Nous avons un excellent choix de bottes d\'hiver. Elles sont imperméables et très chaudes. Le prix commence à 120 dollars.',
                            responseEn: 'We have an excellent selection of winter boots. They are waterproof and very warm. Prices start at $120.'
                        },
                        'baskets|sneakers|sport': {
                            response: 'Notre collection de baskets est juste ici. Quelle pointure faites-vous ?',
                            responseEn: 'Our sneaker collection is right here. What shoe size are you?'
                        }
                    }
                },
                'cadeau|gift|present': {
                    response: 'Quelle bonne idée ! C\'est pour quelle occasion ? Un anniversaire, Noël, un mariage ?',
                    responseEn: 'What a great idea! What\'s the occasion? A birthday, Christmas, a wedding?',
                    followUp: {
                        'anniversaire|birthday': {
                            response: 'Pour un anniversaire, je vous recommande notre section parfumerie ou nos coffrets cadeaux. C\'est au rez-de-chaussée.',
                            responseEn: 'For a birthday, I recommend our perfume section or our gift sets. They\'re on the ground floor.'
                        },
                        'noël|noel|christmas': {
                            response: 'Pour Noël, nous avons des promotions spéciales. Voulez-vous voir nos suggestions de cadeaux ?',
                            responseEn: 'For Christmas, we have special promotions. Would you like to see our gift suggestions?'
                        }
                    }
                },
                'prix|combien|coût|cost|price|how much': {
                    response: 'Les prix varient selon l\'article. Quel produit vous intéresse ? Je peux vérifier le prix pour vous.',
                    responseEn: 'Prices vary by item. Which product interests you? I can check the price for you.'
                },
                'merci|thank': {
                    response: 'De rien ! N\'hésitez pas si vous avez d\'autres questions. Bonne journée !',
                    responseEn: 'You\'re welcome! Don\'t hesitate if you have other questions. Have a good day!'
                }
            },
            defaultResponse: 'Je suis désolé(e), je n\'ai pas bien compris. Pouvez-vous reformuler votre question ? Je suis là pour vous aider.',
            defaultResponseEn: 'I\'m sorry, I didn\'t quite understand. Could you rephrase your question? I\'m here to help.',
            scoringCriteria: ['greeting', 'polite_forms', 'question_formation', 'vocabulary_range']
        },
        {
            id: 'complaint',
            title: 'Faire une réclamation',
            titleEn: 'Making a complaint',
            level: 'B1',
            icon: '📝',
            context: 'You received a defective product and need to make a complaint at the customer service desk.',
            contextFr: 'Vous avez reçu un produit défectueux et vous devez faire une réclamation au service client.',
            greeting: 'Bonjour, service clientèle. Comment puis-je vous aider aujourd\'hui ?',
            greetingEn: 'Hello, customer service. How can I help you today?',
            suggestedResponses: [
                'Bonjour, j\'ai un problème avec un produit que j\'ai acheté.',
                'Je voudrais faire une réclamation, s\'il vous plaît.',
                'J\'ai acheté un article qui ne fonctionne pas.'
            ],
            dialogueTree: {
                'problème|problem|défectueux|defective|fonctionne pas|marche pas|broken': {
                    response: 'Je suis désolé(e) d\'entendre cela. Pouvez-vous me décrire le problème ? Et avez-vous votre reçu ?',
                    responseEn: 'I\'m sorry to hear that. Can you describe the problem? And do you have your receipt?',
                    followUp: {
                        'reçu|receipt|oui|yes': {
                            response: 'Parfait. Quand avez-vous acheté cet article ? Si c\'est dans les 30 derniers jours, nous pouvons faire un échange ou un remboursement.',
                            responseEn: 'Perfect. When did you buy this item? If it\'s within the last 30 days, we can do an exchange or refund.'
                        },
                        'non|no|pas de reçu|no receipt': {
                            response: 'Sans reçu, c\'est un peu plus compliqué, mais nous pouvons vérifier avec votre carte bancaire. L\'avez-vous payé par carte ?',
                            responseEn: 'Without a receipt, it\'s a bit more complicated, but we can check with your bank card. Did you pay by card?'
                        }
                    }
                },
                'réclamation|complaint|plainte': {
                    response: 'Je comprends. Pouvez-vous m\'expliquer la situation en détail ? Je vais prendre note de tout.',
                    responseEn: 'I understand. Can you explain the situation in detail? I\'ll take note of everything.',
                    followUp: {
                        'échange|exchange|remplacer|replace': {
                            response: 'Nous pouvons certainement faire un échange. Avez-vous l\'article avec vous ? Et votre reçu ?',
                            responseEn: 'We can certainly do an exchange. Do you have the item with you? And your receipt?'
                        },
                        'remboursement|refund|rembourser|money back': {
                            response: 'Pour un remboursement, j\'ai besoin du reçu original et de l\'article. Le remboursement sera fait sur votre mode de paiement original sous 5 à 7 jours.',
                            responseEn: 'For a refund, I need the original receipt and the item. The refund will be made to your original payment method within 5-7 days.'
                        }
                    }
                },
                'responsable|manager|superviseur|supervisor': {
                    response: 'Bien sûr, je peux appeler mon superviseur si vous le souhaitez. Puis-je d\'abord essayer de résoudre votre problème ?',
                    responseEn: 'Of course, I can call my supervisor if you wish. Can I first try to resolve your issue?'
                },
                'merci|thank': {
                    response: 'Je vous en prie. J\'espère que nous avons pu résoudre votre problème. N\'hésitez pas à nous contacter si vous avez d\'autres questions.',
                    responseEn: 'You\'re welcome. I hope we were able to resolve your issue. Don\'t hesitate to contact us if you have other questions.'
                }
            },
            defaultResponse: 'Je comprends votre frustration. Pouvez-vous me donner plus de détails pour que je puisse mieux vous aider ?',
            defaultResponseEn: 'I understand your frustration. Can you give me more details so I can help you better?',
            scoringCriteria: ['polite_forms', 'problem_description', 'formal_register', 'negotiation']
        },
        {
            id: 'opinion',
            title: 'Exprimer et défendre une opinion',
            titleEn: 'Expressing and defending an opinion',
            level: 'B2',
            icon: '💬',
            context: 'You are in a discussion about the importance of learning multiple languages.',
            contextFr: 'Vous participez à une discussion sur l\'importance d\'apprendre plusieurs langues.',
            greeting: 'Selon vous, est-ce important d\'apprendre plusieurs langues de nos jours ? Pourquoi ou pourquoi pas ?',
            greetingEn: 'In your opinion, is it important to learn multiple languages nowadays? Why or why not?',
            suggestedResponses: [
                'À mon avis, c\'est très important parce que...',
                'Je pense que le bilinguisme est essentiel pour...',
                'Personnellement, je crois que les langues ouvrent des portes.'
            ],
            dialogueTree: {
                'important|essentiel|nécessaire|essential|necessary': {
                    response: 'Intéressant ! Vous avez raison que c\'est important. Mais pensez-vous que tout le monde devrait apprendre les mêmes langues, ou cela dépend-il du contexte ?',
                    responseEn: 'Interesting! You\'re right that it\'s important. But do you think everyone should learn the same languages, or does it depend on the context?',
                    followUp: {
                        'contexte|dépend|depends|context': {
                            response: 'C\'est un bon point. Au Canada, le bilinguisme français-anglais est un atout majeur. Comment voyez-vous l\'avenir du bilinguisme au Canada ?',
                            responseEn: 'That\'s a good point. In Canada, French-English bilingualism is a major asset. How do you see the future of bilingualism in Canada?'
                        },
                        'anglais|english|global': {
                            response: 'L\'anglais est effectivement une langue internationale. Mais ne pensez-vous pas que la diversité linguistique est aussi une richesse culturelle ?',
                            responseEn: 'English is indeed an international language. But don\'t you think linguistic diversity is also a cultural richness?'
                        }
                    }
                },
                'pas important|inutile|unnecessary|pas nécessaire': {
                    response: 'C\'est un point de vue intéressant. Mais que pensez-vous des avantages cognitifs du bilinguisme ? Des études montrent que ça améliore la mémoire et la concentration.',
                    responseEn: 'That\'s an interesting point of view. But what do you think about the cognitive benefits of bilingualism? Studies show it improves memory and concentration.',
                    followUp: {
                        'technologie|technology|traduction|translation': {
                            response: 'La technologie aide beaucoup, c\'est vrai. Mais peut-elle vraiment remplacer les nuances culturelles qu\'on apprend en parlant une langue ?',
                            responseEn: 'Technology helps a lot, that\'s true. But can it really replace the cultural nuances you learn by speaking a language?'
                        }
                    }
                },
                'travail|emploi|carrière|career|job|work': {
                    response: 'Le lien entre les langues et l\'emploi est crucial. Au Canada, les postes bilingues offrent souvent de meilleurs salaires. Avez-vous vécu cette expérience ?',
                    responseEn: 'The link between languages and employment is crucial. In Canada, bilingual positions often offer better salaries. Have you experienced this?'
                },
                'culture|voyage|travel': {
                    response: 'Absolument ! La langue est la clé de la culture. Quand on parle la langue locale, on accède à une compréhension plus profonde. Quelle est votre expérience ?',
                    responseEn: 'Absolutely! Language is the key to culture. When you speak the local language, you access deeper understanding. What\'s your experience?'
                }
            },
            defaultResponse: 'C\'est une perspective intéressante. Pouvez-vous développer davantage votre pensée ? Quels arguments soutenez-vous ?',
            defaultResponseEn: 'That\'s an interesting perspective. Can you elaborate further? What arguments do you support?',
            scoringCriteria: ['opinion_expression', 'argumentation', 'vocabulary_range', 'connectors', 'formal_register']
        },
        {
            id: 'describe-plans',
            title: 'Décrire ses projets et expériences',
            titleEn: 'Describing plans and experiences',
            level: 'B1',
            icon: '🗓️',
            context: 'You are talking about your plans for moving to Canada.',
            contextFr: 'Vous parlez de vos projets d\'installation au Canada.',
            greeting: 'Parlez-moi de vos projets. Pourquoi avez-vous choisi le Canada ? Qu\'est-ce que vous comptez faire en arrivant ?',
            greetingEn: 'Tell me about your plans. Why did you choose Canada? What do you plan to do when you arrive?',
            suggestedResponses: [
                'J\'ai choisi le Canada parce que...',
                'Mon projet est de m\'installer à...',
                'Quand j\'arriverai, je voudrais...'
            ],
            dialogueTree: {
                'montréal|montreal|québec|quebec': {
                    response: 'Le Québec est un excellent choix ! C\'est une province francophone avec une culture riche. Avez-vous déjà visité le Québec ?',
                    responseEn: 'Quebec is an excellent choice! It\'s a French-speaking province with a rich culture. Have you visited Quebec before?',
                    followUp: {
                        'oui|yes|déjà|already|visité|visited': {
                            response: 'Formidable ! Qu\'est-ce qui vous a le plus impressionné lors de votre visite ?',
                            responseEn: 'Wonderful! What impressed you the most during your visit?'
                        },
                        'non|no|jamais|never|pas encore': {
                            response: 'Ce sera une belle découverte ! Le Québec a beaucoup à offrir. Qu\'est-ce qui vous attire le plus — la culture, le travail, ou l\'environnement ?',
                            responseEn: 'It will be a beautiful discovery! Quebec has a lot to offer. What attracts you the most — the culture, work, or environment?'
                        }
                    }
                },
                'toronto|ontario|vancouver': {
                    response: 'C\'est une ville très multiculturelle ! Avez-vous déjà trouvé un logement ou un emploi là-bas ?',
                    responseEn: 'It\'s a very multicultural city! Have you already found housing or a job there?'
                },
                'travail|work|emploi|job|carrière|career': {
                    response: 'Quel est votre domaine professionnel ? Le marché du travail au Canada est prometteur dans plusieurs secteurs.',
                    responseEn: 'What is your professional field? The job market in Canada is promising in several sectors.',
                    followUp: {
                        'informatique|IT|technologie|tech|développeur|developer': {
                            response: 'L\'informatique est un secteur en forte demande au Canada ! Avez-vous déjà fait reconnaître vos diplômes ?',
                            responseEn: 'IT is a high-demand sector in Canada! Have you already had your credentials recognized?'
                        },
                        'santé|health|médecin|doctor|infirmier|nurse': {
                            response: 'Le secteur de la santé recrute beaucoup. Avez-vous commencé les démarches de reconnaissance de vos qualifications ?',
                            responseEn: 'The health sector is hiring a lot. Have you started the process of getting your qualifications recognized?'
                        }
                    }
                },
                'famille|family|enfants|children': {
                    response: 'Immigrer en famille est une belle aventure. Le Canada offre d\'excellentes écoles et un bon système de santé. Combien d\'enfants avez-vous ?',
                    responseEn: 'Immigrating as a family is a wonderful adventure. Canada offers excellent schools and a good healthcare system. How many children do you have?'
                }
            },
            defaultResponse: 'C\'est très intéressant ! Continuez, j\'aimerais en savoir plus sur vos projets et votre parcours.',
            defaultResponseEn: 'That\'s very interesting! Continue, I\'d like to know more about your plans and your journey.',
            scoringCriteria: ['future_tense', 'past_tense', 'vocabulary_range', 'fluency', 'coherence']
        },
        {
            id: 'restaurant',
            title: 'Au restaurant — Commander un repas',
            titleEn: 'At a restaurant — Ordering a meal',
            level: 'A2',
            icon: '🍽️',
            context: 'You are at a French-Canadian restaurant and want to order food.',
            contextFr: 'Vous êtes dans un restaurant français au Canada et vous voulez commander.',
            greeting: 'Bonsoir et bienvenue chez « Le Petit Québec » ! Voici le menu. Souhaitez-vous un apéritif pour commencer ?',
            greetingEn: 'Good evening and welcome to "Le Petit Québec"! Here is the menu. Would you like an aperitif to start?',
            suggestedResponses: [
                'Bonsoir ! Oui, je voudrais un verre d\'eau, s\'il vous plaît.',
                'Qu\'est-ce que vous recommandez ?',
                'Je suis prêt(e) à commander.'
            ],
            dialogueTree: {
                'eau|water|boisson|drink|vin|wine|bière|beer': {
                    response: 'Tout de suite ! Nous avons de l\'eau plate ou gazeuse. Pour le vin, je recommande notre Bordeaux rouge. Êtes-vous prêt(e) à commander votre plat ?',
                    responseEn: 'Right away! We have still or sparkling water. For wine, I recommend our red Bordeaux. Are you ready to order your dish?',
                    followUp: {
                        'plat|dish|manger|eat|commander|order': {
                            response: 'Excellent ! Nos spécialités sont la tourtière québécoise, le saumon grillé et la poutine traditionnelle. Qu\'est-ce qui vous tente ?',
                            responseEn: 'Excellent! Our specialties are Quebec tourtière, grilled salmon, and traditional poutine. What appeals to you?'
                        }
                    }
                },
                'recommandez|recommend|spécialité|specialty|suggest': {
                    response: 'Je vous recommande notre tourtière maison — c\'est notre plat signature ! Sinon, le saumon grillé avec des légumes de saison est aussi délicieux.',
                    responseEn: 'I recommend our homemade tourtière — it\'s our signature dish! Otherwise, the grilled salmon with seasonal vegetables is also delicious.',
                    followUp: {
                        'tourtière|pâté|meat pie': {
                            response: 'Excellent choix ! La tourtière est servie avec une salade verte. Souhaitez-vous une entrée avant ?',
                            responseEn: 'Excellent choice! The tourtière is served with a green salad. Would you like a starter first?'
                        },
                        'saumon|salmon|poisson|fish': {
                            response: 'Le saumon est cuit à la perfection. Comment le préférez-vous — avec du riz ou des pommes de terre ?',
                            responseEn: 'The salmon is cooked to perfection. How do you prefer it — with rice or potatoes?'
                        }
                    }
                },
                'allergie|allergy|végétarien|vegetarian|sans gluten|gluten free': {
                    response: 'Merci de me l\'avoir dit ! Nous avons des options végétariennes et sans gluten. Je peux adapter les plats selon vos besoins. Avez-vous d\'autres allergies ?',
                    responseEn: 'Thank you for letting me know! We have vegetarian and gluten-free options. I can adapt dishes to your needs. Do you have any other allergies?'
                },
                'addition|bill|payer|pay|l\'addition': {
                    response: 'Bien sûr, je vous apporte l\'addition tout de suite. J\'espère que vous avez apprécié votre repas ! Nous acceptons les cartes et l\'argent comptant.',
                    responseEn: 'Of course, I\'ll bring you the bill right away. I hope you enjoyed your meal! We accept cards and cash.'
                },
                'dessert': {
                    response: 'Pour le dessert, nous avons une crème brûlée, une tarte aux bleuets du Québec et un fondant au chocolat. Qu\'est-ce qui vous ferait plaisir ?',
                    responseEn: 'For dessert, we have crème brûlée, Quebec blueberry pie and chocolate fondant. What would you like?'
                },
                'merci|thank': {
                    response: 'Merci à vous ! C\'était un plaisir de vous servir. Bonne soirée et au plaisir de vous revoir !',
                    responseEn: 'Thank you! It was a pleasure to serve you. Have a good evening and hope to see you again!'
                }
            },
            defaultResponse: 'Pardon, pouvez-vous répéter ? Je veux m\'assurer de bien comprendre votre demande.',
            defaultResponseEn: 'Sorry, could you repeat? I want to make sure I understand your request correctly.',
            scoringCriteria: ['polite_forms', 'food_vocabulary', 'question_formation', 'social_norms']
        }
    ],

    // Scoring rubric for conversation evaluation
    scoringRubric: {
        greeting: { label: 'Greeting', maxPoints: 2, description: 'Used appropriate greeting (Bonjour/Bonsoir)' },
        polite_forms: { label: 'Politeness', maxPoints: 3, description: 'Used polite forms (vous, s\'il vous plaît, merci)' },
        question_formation: { label: 'Questions', maxPoints: 3, description: 'Formed questions correctly' },
        vocabulary_range: { label: 'Vocabulary', maxPoints: 4, description: 'Used varied and appropriate vocabulary' },
        formal_register: { label: 'Register', maxPoints: 3, description: 'Maintained appropriate formal/informal register' },
        problem_description: { label: 'Description', maxPoints: 3, description: 'Described situation clearly' },
        negotiation: { label: 'Negotiation', maxPoints: 3, description: 'Negotiated effectively' },
        opinion_expression: { label: 'Opinion', maxPoints: 3, description: 'Expressed opinions clearly with je pense/à mon avis' },
        argumentation: { label: 'Arguments', maxPoints: 4, description: 'Supported opinions with arguments' },
        connectors: { label: 'Connectors', maxPoints: 3, description: 'Used logical connectors (mais, cependant, de plus)' },
        future_tense: { label: 'Future', maxPoints: 3, description: 'Used future tense correctly' },
        past_tense: { label: 'Past', maxPoints: 3, description: 'Used past tense correctly' },
        fluency: { label: 'Fluency', maxPoints: 3, description: 'Maintained conversation flow' },
        coherence: { label: 'Coherence', maxPoints: 3, description: 'Responses were coherent and relevant' },
        food_vocabulary: { label: 'Food Vocab', maxPoints: 3, description: 'Used food-related vocabulary' },
        social_norms: { label: 'Social Norms', maxPoints: 2, description: 'Followed French social norms' }
    }
};

