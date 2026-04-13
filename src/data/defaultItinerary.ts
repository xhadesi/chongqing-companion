import { TripDay } from "@/lib/types";

const generateId = () => Math.random().toString(36).substr(2, 9);

export const DEFAULT_ITINERARY: TripDay[] = [
    {
        id: `day-${generateId()}`,
        date: "2026-04-29",
        dayNumber: 1,
        activities: [
            {
                id: generateId(),
                time: "17:00",
                duration: "3h",
                title: "Départ pour l'Aéroport",
                chineseTitle: "去机场",
                description: "Direction l'aéroport de Paris-Charles-de-Gaulle T1. C'est le grand départ vers la mégalopole chinoise.",
                tips: "Vérifie bien ton passeport et ton visa une dernière fois !",
                location: "Paris CDG T1",
                icon: "🛫",
                priceEstimate: "12 € (RER B)",

                completed: false
            },
            {
                id: generateId(),
                time: "20:20",
                duration: "10h",
                title: "Vol Paris - Pékin (Réf: NH2NKC)",
                description: "Promenade du soir pour voir les bâtiments illuminés, semblables au Voyage de Chihiro.",

                location: "Dans les airs",
                icon: "✈️",
                completed: false
            }
        ]
    },

    {
        id: `day-${generateId()}`,
        date: "2026-04-30",
        dayNumber: 2,
        activities: [
            {
                id: generateId(),
                time: "20:00",
                duration: "1h",
                title: "Arrivée & Check-in",
                chineseTitle: "德亚酒店 (解放碑)",
                images: ["/images/places/sight_6_1.jpg"],
                description: "Après des heures de vol, tu atterris enfin à l'aéroport international de Chongqing Jiangbei (CKG). L'air sera peut-être mœt et l'immensité de l'infrastructure va te frapper immédiatement. Le trajet en taxi ou DiDi vers le Deya Hotel à Jiefangbei te fera traverser les premiers ponts illuminés de la ville, te donnant un premier aperçu de cette skyline cyberpunk vertigineuse.",
                tips: "Puisque c'est ton premier contact, montre l'adresse du Deya Hotel directement en caractères chinois (Hanzi) en très grand sur ton écran. Les chauffeurs adorent quand un étranger lâche un simple \"Nǐ hǎo\" (Bonjour) sincère et souriant en montant. Assieds-toi à l'arrière, détends-toi, et regarde les buildings défiler.",
                location: "Aéroport -> Hôtel (Jiefangbei)",
                address: "Deya Hotel, Jiefangbei CBD",
                icon: "🛬",
                priceEstimate: "2-3 € (Métro) / 10-15 € (DiDi)",

                completed: false
            },
            {
                id: generateId(),
                time: "21:30",
                duration: "1h",
                title: "Dîner libre à Bayi Haochi Jie (Food Street)",
                chineseTitle: "八一好吃街",
                images: ["/images/places/bf_3_2.jpg", "/images/places/bf_2_1.jpg"],
                description: "Pour ton premier soir, l'idéal est de plonger direct dans l'ambiance nocturne de Jiefangbei. Bayi Haochi Jie est La rue par excellence : elle fourmille de stands de street food et de petites échoppes fumantes de Shao Kao (brochettes grillées). Les odeurs de cumin, de piment sec et d'huile sésame vont t'envelopper.",
                tips: "Fais tes premiers pas dans l'interaction locale. N'aie pas peur de pointer les aliments du doigt avec enthousiasme. Demande \"Zhège shì shénme?\" (C'est quoi ça ?) pour montrer ta curiosité. En tant qu'étranger, ton estomac n'est pas prêt : précise toujours \"Bù yào là\" (Pas épicé) le premier soir pour éviter le court-circuit digestif immédiat.",
                location: "Jiefangbei",
                icon: "🍢",
                priceEstimate: "4-6 €",

                completed: false
            },
            {
                id: generateId(),
                time: "22:30",
                duration: "1h30",
                title: "Balade nocturne Hongyadong",
                chineseTitle: "洪崖洞",
                images: ["/images/places/sight_1_1.jpg", "/images/places/sight_1_2.jpg"],
                description: "C'est l'attraction phare de la ville, une structure labyrinthique accrochée à une falaise abrupte qui s'illumine de mille feux dorés à la nuit tombée, rappelant le film d'animation Le Voyage de Chihiro. Tu vas descendre les marches, te faufiler entre les foules immenses, et ressentir l'énergie folle de la Chine nocturne. Le meilleur spot pour savourer la vue est de traverser le fleuve sur le pont Qiansimen, pour regarder le bâtiment majestueux de face.",
                tips: "Attention, tu vas créer l'événement. Avec tes 1m84, ta carrure mince, tes cheveux clairs et tes yeux bleus, l'effet \"Laowai\" (étranger) sera décuplé dans cette zone très touristique pour les Chinois des autres provinces. Tu remarqueras beaucoup de téléphones pointés discrètement vers toi. La tactique : marche droit, confiant, avec un léger sourire mystérieux. Si tu croises le regard émerveillé d'une fille de ton âge, souris franchement et lâche un \"Hěn piàoliang!\" (C'est très beau !) audacieux. Succès garanti.",
                location: "Yuzhong (À pied)",
                icon: "🌃",

                priceEstimate: "Gratuit",


                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-01",
        dayNumber: 3,
        activities: [
            {
                id: generateId(),
                time: "09:30",
                duration: "1h",
                title: "Xiaomian Traditionnel",
                images: ["/images/places/bf_1_1.jpg", "/images/places/bf_1_3.jpg"],
                description: "Le petit-déjeuner sacré des locaux. Un humble bol de nouilles fraîches noyées dans une sauce rouge vif aux huiles épicées, pois chiches croustillants et coriandre. Tu t'assiéras sur un minuscule tabouret en plastique coloré, au ras du sol, littéralement dans la rue, entouré des cols blancs et ouvriers en pleine effervescence matinale.",
                tips: "C'est une expérience très brute et chaleureuse. L'astuce culturelle infaillible pour te faire accepter ici : quand tu as fini ton bol (même si tu transpires à grosses gouttes à cause de l'épice), lève le pouce vers le vieux chef qui t'a servi et dis bien fort \"Hǎo chī!\" (Délicieux !). L'ambiance entière de l'échoppe s'illuminera de sourires.",
                location: "Yuzhong",
                icon: "🍜",
                priceEstimate: "2-3 €",

                completed: false
            },
            {
                id: generateId(),
                time: "10:30",
                duration: "2h",
                title: "Rendez-vous Tailleur (Suitsupply IFS ou Local Jiefangbei)",
                chineseTitle: "国金中心 (IFS) 或 解放碑",
                images: ["/images/places/sight_6_1.jpg", "/images/places/sight_6_2.jpg", "/images/places/sight_6_3.jpg"],
                description: "Pour un costume complet en moins de 10 jours, deux vrais choix : Suitsupply au mall IFS (valeur sûre, standards internationaux, demi-mesure rapide pour ~4000 RMB) OU un tailleur local bespoke caché dans les tours de Jiefangbei (plus authentique, entre 1500 et 2000 RMB, mais nécessite de négocier le délai court). Ce premier rendez-vous sert à choisir les étoffes et prendre tes mesures.",
                tips: "Demande impérativement une coupe très cintrée, fluide et moderne (pantalon taille un peu haute avec un léger pli, veste non structurée). En tant que grand et mince européen faisant incroyablement jeune, le style \"Old Money Asiatique\" t'ira à la perfection et te donnera un charisme instantané pour les bars VIP.",
                location: "Jiefangbei",
                address: "Jiefangbei CBD (Tunnels ou Tours)",
                icon: "👔",
                priceEstimate: "Variable",

                completed: false
            },
            {
                id: generateId(),
                time: "14:00",
                duration: "2h30",
                title: "Luohan Temple & Kung Fu Temple",
                chineseTitle: "罗汉寺",
                images: ["/images/places/sight_15_1.jpg", "/images/places/sight_15_2.jpg", "/images/places/sight_15_3.jpg"],
                description: "Une pause temporel vertigineuse. Tu passes d'un CBD hérissés de gratte-ciels de verre géants à une cour silencieuse où les volutes de l'encens brûlent doucement devant des divinités millénaires. Les 500 arhats (statues dorées de moines) en terre cuite dans la salle principale du Temple Luohan sont hypnotiques.",
                tips: "C'est l'un des rares endroits extrêmement calmes du centre-ville. Les jeunes Chinoises de la Gen Z, très attachées à la culture, s'y promènent souvent. C'est l'occasion d'une approche très intellectuelle et en douceur : approche doucement en pointant une statue et demande-leur \"Qǐngwèn, zhègè shì shénme yìsi?\" (Excusez-moi, ça signifie quoi ?). Ton intérêt pour leur culture traditionnelle va les faire fondre.",
                location: "Yuzhong",
                address: "Minzu Road, Yuzhong",
                icon: "🛕",
                priceEstimate: "3 €",

                completed: false
            },
            {
                id: generateId(),
                time: "18:30",
                duration: "2h",
                title: "Shancheng Xiang (Mountain Alley)",
                chineseTitle: "山城巷",
                images: ["/images/places/sight_24_1.jpg", "/images/places/sight_9_2.jpg"],
                description: "Un reliquat du vieux Chongqing. Des ruelles pavées vertigineuses accrochées au flanc de la montagne, suspendues presque dans le vide au dessus de l'eau. Les petits cafés bohèmes et les balcons en bois s'empilent. L'atmosphère est bohème, délicate, avec des lampions rouges qui s'allument à la tombée de la nuit.",
                tips: "Le rythme ralentit ici. Commande un thé aux fleurs dans l'une des petites maisons de thé en terrasse. Repère une table occupée par des personnes de ton âge. Demande poliment et avec ton grand sourire charmeur : \"Kěyǐ gēn nǐmen liáotiān ma?\" (Puis-je discuter avec vous ?). À 27 ans mais en paraissant 20, cette innocence travaillée fera que tu seras accueilli très chaudement.",
                location: "Yuzhong",
                address: "Shancheng Alley",
                icon: "🪜",
                priceEstimate: "Gratuit",

                completed: false
            },
            {
                id: generateId(),
                time: "21:00",
                duration: "2h",
                title: "Dîner au Puxu Restaurant (Vue Jialing)",
                chineseTitle: "浦虚餐厅",
                images: ["/images/places/bf_6_1.jpg", "/images/places/bf_6_2.jpg"],
                description: "Un restaurant élégant, perché en hauteur, offrant de larges baies vitrées donnant sur la nuit de Chongqing, où les néons des bateaux se reflètent sur le Jialing. Le repas au Puxu sera fin, typique, et l'atmosphère tamisée.",
                tips: "Habille-toi de matière élégante et confortable (un beau col roulé ou une chemise repassée). Si tu dînes seul au bar ou sur une grande table partagée, montre ta galanterie européenne. Si un regard se croise, lance un poli \"Zhèr yǒu rén ma?\" (Est-ce que cette place est libre ?).",
                location: "Yuzhong",
                icon: "🍷",
                priceEstimate: "25-38 €",

                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-02",
        dayNumber: 4,
        activities: [
            {
                id: generateId(),
                time: "10:00",
                duration: "2h",
                title: "Three Gorges Museum",
                chineseTitle: "三峡博物馆",
                images: ["/images/places/sight_4_1.jpg", "/images/places/sight_4_2.jpg", "/images/places/sight_4_3.jpg"],
                description: "L'institution centrale de la ville. Tu plongeras dans 3000 ans d'histoire de l'état de Ba, et découvriras l'exploit titanesque et dramatique qu'a été la construction du Barrage des Trois Gorges sur le Yangtsé, modifiant à jamais l'écosystème et la carte de la région.",
                tips: "L'air conditionné est parfait pour se reposer le matin. Observe tranquillement les artéfacts. Un moment idéal pour utiliser ta fonction traduction sur l'app de l'appareil photo WeChat et lire les anecdotes fascinantes qui ne sont qu'en chinois.",
                location: "Yuzhong",
                address: "People's Square",
                icon: "🏛️",
                priceEstimate: "Gratuit",

                completed: false
            },
            {
                id: generateId(),
                time: "12:00",
                duration: "1h",
                title: "People's Auditorium",
                chineseTitle: "人民大礼堂",
                images: ["/images/places/sight_4_2.jpg"],
                description: "Juste en face du musée, cet énorme dôme rouge et vert est un chef-d'œuvre architectural post-libération de 1954, reprenant avec majesté les codes du Temple du Ciel de Pékin. La place devant bouillonne souvent de vie (gymnastique, danse de place, cerfs-volants).",
                tips: "Prends quelques selfies avec l'Auditorium en fond. Si un vieux local te regarde avec curiosité, salue-le d'un signe de tête. L'esplanade est très conviviale.",
                location: "Yuzhong",
                icon: "🏯",
                priceEstimate: "Gratuit (Extérieur)",

                completed: false
            },
            {
                id: generateId(),
                time: "15:00",
                duration: "4h",
                title: "Photoshoot Traditionnel & Shibati",
                chineseTitle: "十八梯传统风貌区",
                images: ["/images/places/sight_24_1.jpg", "/images/places/sight_24_2.jpg"],
                description: "À quelques minutes du centre de Jiefangbei, Shibati (Les Dix-huit Marches) est un quartier historique spectaculairement restauré, mêlant architecture Ming/Qing, échoppes de snacks traditionnels, et ruelles en cascade vertigineuse. L'endroit est magnifique et immersif au possible.",
                tips: "C'est l'expérience sociale ULTIME du voyage, un véritable hack social de niveau 99. Va dans une boutique de location et enfile un Hanfu (vêtement historique chinois) — privilégie une coupe ample d'érudit impérial ou de fine lame sombre. Pourquoi ? Avec ton look d'européen du nord (1m84, blond, fin), tu auras l'allure surréaliste d'un chevalier fantasy ou d'un personnage de jeu vidéo asiatique. C'est simple : TOUTES les étudiantes en Hanfu te fixeront. Avance avec prestance. Quand une fille retient son souffle en te croisant, tends gentiment la main et demande : \"Wǒmen kěyǐ yìqǐ pāizhào ma?\" (On prend une photo ensemble ?). Après 2 ou 3 selfies, la suite logique est : \"Kěyǐ jiā gè wēixìn ma?\" (On s'ajoute sur WeChat ?). Tu finiras l'après-midi avec 10 nouveaux contacts féminins et potentiels dates.",
                location: "Yuzhong",
                address: "Shibati Traditional Custom Area",
                icon: "📸",
                priceEstimate: "25-38 € (Hanfu)",

                completed: false
            },
            {
                id: generateId(),
                time: "20:00",
                duration: "2h",
                title: "Dîner Street Food (Baozi & Nouilles)",
                images: ["/images/places/bf_3_3.jpg", "/images/places/bf_2_2.jpg"],
                description: "Après le photoshoot, remontez vers le centre de Yuzhong pour dîner sur le pouce dans les ruelles animées. L'occasion idéale de tester des petits baos brûlants et des brochettes croustillantes.",
                tips: "Ne cherchez pas un grand restaurant ce soir : les meilleurs repas se prennent souvent sur un coin de table en plastique avec une bière locale fraîche (Shancheng Pijiu).",
                location: "Yuzhong",
                address: "Jiefangbei Food Streets",
                icon: "🥟",
                priceEstimate: "4-6 €",

                completed: false
            },
            {
                id: generateId(),
                time: "22:30",
                duration: "3h",
                title: "SPACE Club (Jiefangbei)",
                chineseTitle: "SPACE PLUS 酒吧 (解放碑)",
                images: ["https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=600&auto=format&fit=crop"],
                description: "Puisque nous sommes samedi soir, impossible de rater l'expérience d'un ultra-club chinois ! SPACE est l'une des franchises les plus folles du pays : écrans géants, EDM surpuissant, shows pyrotechniques en salle et tables remplies de jeunes très apprêtés.",
                tips: "Le secret pour rentrer facilement et avoir une bonne place : aborde un groupe stylé à l'entrée avec ton WeChat et un sourire confiant. Reste cool et souris quand on te tendra un verre (Ganbei !).",
                location: "Yuzhong",
                address: "Jiefangbei",
                icon: "🪩",
                priceEstimate: "Sur conso (Min. requis pr table)",

                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-03",
        dayNumber: 5,
        activities: [
            {
                id: generateId(),
                time: "09:30",
                duration: "1h",
                title: "Yangtze River Cableway",
                chineseTitle: "长江索道",
                images: ["/images/places/sight_7_1.jpg", "/images/places/sight_7_2.jpg", "/images/places/sight_7_3.jpg"],
                description: "Le fameux téléphérique vintage de Chongqing, utilisé historiquement comme transport public pour traverser l'immense fleuve marron avant la multiplication des ponts. Suspendu dans une vieille cabine métallique rouge, la vue plongeante sur l'eau et les deux rives bétonnées est brute et saisissante.",
                tips: "Essaie de te coller direct contre la vitre côté aval pour la meilleure vue. Évite de prendre cette cabine s'il fait un brouillard opaque (très fréquent), car tu ne verras absolument rien.",
                location: "Yuzhong -> Nan'an",
                address: "Xinhua Road",
                icon: "🚡",
                priceEstimate: "4 € (Aller-retour)",

                completed: false
            },
            {
                id: generateId(),
                time: "11:30",
                duration: "1h",
                title: "Liziba Monorail",
                chineseTitle: "李子坝轻轨站",
                images: ["/images/places/sight_3_1.jpg", "/images/places/sight_3_2.jpg"],
                description: "L'une des attractions virales de Chongqing. La ligne 2 du métro plonge droit à travers l'appartement du 8ème étage d'un immeuble résidentiel sans que les murs ne tremblent. C'est l'emblème de la ville « en 3D » que rien ne peut arrêter.",
                tips: "Rejoins l'immense plateforme d'observation en contrebas (sur la rue). Le grand classique est de filmer le train avec ton téléphone de très bas pour donner l'impression qu'il fonce d'un coup dans la masse de béton. Très instagrammable !",
                location: "Yuzhong Ouest",
                address: "Liziba Station",
                icon: "🚈",
                priceEstimate: "0-1 € (Métro)",

                completed: false
            },
            {
                id: generateId(),
                time: "14:30",
                duration: "3h",
                title: "Eling Park & Testbed 2 (贰厂)",
                chineseTitle: "鹅岭公园 / 贰厂文创公园",
                images: ["/images/places/sight_9_1.jpg", "/images/places/sight_9_2.jpg", "/images/places/sight_9_3.jpg"],
                description: "Commence au vert fluo d'Eling Park pour son belvédère à 360° ultra paisible sur tout Chongqing. En descendant, tu tombes sur Testbed 2 (Er Chang), une vaste imprimerie de l'époque industrielle reconvertie en repaire suprême du hipster moderne : murs tagués de textes poétiques, escaliers en fer forgé, et boutiques d'artisanat indépendant.",
                tips: "Testbed 2 est le paradis des influenceuses Xiaohongshu (le TikTok/Insta chinois). Elles viennent par dizaines avec des looks extrêmement pointus. Le conseil de drague passive : assieds-toi chill à la terrasse d'un des cafés conceptuels en sirotant un Americano. Avec ta taille filiforme, ta jeunesse apparente et ton style européen tranchant, tu attireras l'attention tout seul. Laisse ton regard croiser les leurs. S'il y a un contact visuel prolongé (plus de 3 secondes), c'est gagné : lève-toi nonchalamment et montre ton QR code WeChat.",
                location: "Yuzhong Ouest",
                address: "Eling & Testbed 2",
                icon: "🌳",
                priceEstimate: "Gratuit",

                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                duration: "3h",
                title: "Dîner et Balade à Guanyinqiao",
                chineseTitle: "观音桥步行街",
                images: ["/images/places/sight_21_1.jpg", "/images/places/bf_5_3.jpg"],
                description: "Prenez le métro vers le nord pour découvrir Guanyinqiao, le cœur vibrant et ultramoderne de Jiangbei. Profitez des immenses écrans 3D, de la foule jeune et branchée, et choisissez un grand restaurant dans l'un des somptueux centres commerciaux (Paradise Walk).",
                tips: "C'est l'endroit parfait pour observer la mode locale de pointe (très audacieuse). N'hésitez pas à demander aux habitants dans la rue pour trouver les restaurants populaires nichés dans les hauts étages.",
                location: "Jiangbei",
                address: "Guanyinqiao",
                icon: "🏙️",
                priceEstimate: "13-25 €",

                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-04",
        dayNumber: 6,
        activities: [
            {
                id: generateId(),
                time: "11:00",
                duration: "2h",
                title: "Balade au Campus de l'Université de Chongqing",
                chineseTitle: "重庆大学 (A区)",
                description: "Puisque le budget est serré, on fuit les malls de luxe de Jiangbei pour le quartier étudiant de Shapingba. Le grand campus A de l'Université de Chongqing (CQU) est magnifique, rempli d'arbres centenaires, de vieux bâtiments rustiques et de jeunes se déplaçant à vélo. C'est l'essence intellectuelle et chill de la région.",
                tips: "L'accès est gratuit. C'est un excellent spot pour rencontrer des étudiants de ton âge qui cherchent souvent à pratiquer leur anglais avec des étrangers.",
                location: "Shapingba",
                icon: "🎓",
                priceEstimate: "Gratuit",
                completed: false
            },
            {
                id: generateId(),
                time: "13:00",
                duration: "2h",
                title: "Déjeuner Boui-boui Étudiant (Sanxia Square)",
                chineseTitle: "三峡广场 (小吃)",
                images: ["/images/places/bf_2_1.jpg", "/images/places/bf_3_2.jpg"],
                description: "Juste à côté du campus, la zone de Sanxia Square pullule de petits restaurants et stands de rue conçus pour les portefeuilles étudiants. On y trouve des bols de nouilles au poulet épicé, du riz frit généreux ou des raviolis (Jiaozi) à des prix imbattables.",
                tips: "C'est l'endroit parfait pour exploser ton rapport quantité/prix. Cherche l'endroit où il y a le plus de monde entassé sur des tabourets. Commande un 'Chǎo Mian' (nouilles sautées) pour environ 2 euros.",
                location: "Shapingba",
                address: "Sanxia Square",
                icon: "🥡",
                priceEstimate: "1-3 €",
                completed: false
            },
            {
                id: generateId(),
                time: "15:00",
                duration: "3h",
                title: "Thé Vert à Shaping Park",
                chineseTitle: "沙坪公园",
                images: ["/images/places/sight_10_2.jpg"],
                description: "Un grand parc feuillu où les locaux se réunissent pour jouer au Mahjong et boire du thé tout l'après-midi. L'antithèse absolue de la consommation frénétique des quartiers d'affaires. Une vraie pause mentale sans dépenser plus que quelques pièces.",
                tips: "Installe-toi dans une maison de thé en plein air. Pour l'équivalent de 2€, on te donne une tasse avec des feuilles et un immense thermos d'eau bouillante rechargeable.",
                location: "Shapingba",
                icon: "🍵",
                priceEstimate: "2-4 €",
                completed: false
            },
            {
                id: generateId(),
                time: "20:00",
                duration: "3h",
                title: "Soirée Indie / Livehouse (Nuts Live House)",
                chineseTitle: "坚果 LiveHouse",
                images: ["/images/guide/night_playhouse.jpg"],
                description: "Adieu les gros clubs ultra-chers à tables VIP. Le monde étudiant regorge de petites scènes live où des groupes de rock indé ou folk performent. C'est brut, l'entrée coûte peu, et la pinte de bière locale est très accessible.",
                tips: "Avec ton style, tu seras très apprécié dans la scène alternative locale. Achète une bouteille de bière locale et savoure la musique indé chinoise !",
                location: "Shapingba / Yuzhong",
                icon: "🎸",
                priceEstimate: "8-15 € (Entrée + Conso)",
                completed: false
            }
        ]
    }
    {
        id: `day-${generateId()}`,
        date: "2026-05-05",
        dayNumber: 7,
        activities: [
            {
                id: generateId(),
                time: "10:00",
                duration: "3h",
                title: "Nanshan Botanical Garden / Laojun Cave",
                chineseTitle: "南山植物园 / 老君洞",
                images: ["/images/places/sight_10_1.jpg", "/images/places/sight_10_2.jpg"],
                description: "On passe sur la rive Sud, très végétale. Le Nanshan est la montagne qui domine la ville, offrant une fraîcheur boisée bienvenue. Laojun Cave est un enchevêtrement de petits temples taoïstes perchés à flanc de falaise avec une aura très mystique, souvent enfumés par les bâtons d'encens et offrant des belvédères panoramiques secrets.",
                tips: "L'ascension est une succession d'escaliers escarpés, l'air y est pur. Prends le temps de t'arrêter à chaque promontoire, c'est une pause salvatrice après la violence du club la veille.",
                location: "Nan'an",
                icon: "🛕",
                priceEstimate: "6 € (Avec serres)",

                completed: false
            },
            {
                id: generateId(),
                time: "13:30",
                duration: "2h",
                title: "Déjeuner : Hotpot Prémium à Flanc de Colline (Pipa Yuan)",
                chineseTitle: "枇杷园食泉老火锅",
                images: ["/images/places/bf_4_1.jpg", "/images/places/bf_4_2.jpg"],
                description: "L'institution de Chongqing. Imagine une montagne entière, taillée en terrasses, recouverte de milliers de tables en plein air. De nuit comme de jour, l'huile de bœuf rouge bouillonne littéralement sur toutes les tables remplissant l'étroite vallée d'un parfum capiteux et poivré inoubliable.",
                tips: "Ceci n'est pas une simulation, la fondue locale PEUT te détruire. Ordonne catégoriquement \"Wēi là !\" (Légèrement épicé) de tes deux mains à la serveuse, ou prends une fondue moitié-champignon/moitié-piment. Les tables sont denses. Repère une table bruyante de jeunes filles/garçons locaux. Si tu ne sais pas combien de temps cuire un morceau de canard ou de lotus, pointe l'aliment vers eux, montre tes yeux bleus faussement affolés et crie par dessus le brouhaha : \"Zhège zěnme zhǔ?\" (Comment on cuit ça ?). Cet appel à l'aide sera vu de façon très amusante et attachante !",
                location: "Nan'an",
                icon: "🍲",
                priceEstimate: "13-19 €",

                completed: false
            },
            {
                id: generateId(),
                time: "16:00",
                duration: "2h",
                title: "Golden Impressions Reflexology",
                chineseTitle: "金色印象 (足疗)",
                images: ["/images/places/exact_spa_1.jpg", "/images/places/exact_spa_2.jpg"],
                description: "Le massage chinois est un art de vivre et de soin absolu. Golden Impressions est une chaîne ultra luxueuse (marbre, dorures, lumière tamisée). Tu seras allongé dans d'immenses fauteuils de cinéma pour 90 minutes de bain de pied aux herbes bouillantes et d'acupression crânienne et plantaire de niveau divin.",
                tips: "Si la pression te fait trop mal (les masseurs n'y vont pas de main morte pour évacuer la tension !), crie doucement : \"Téng! Qīng yīdiǎn...\" (Ça fait mal ! Plus doucement...). Une fois fini, tu repars frais comme à 15 ans.",
                location: "Nan'an",
                icon: "💆",
                priceEstimate: "25-44 €",

                completed: false
            },
            {
                id: generateId(),
                time: "20:00",
                duration: "3h",
                title: "Sparkling Sky Bar (Affichage Vagues LED)",
                chineseTitle: "长嘉汇购物公园 (星空酒吧)",
                images: ["/images/places/exact_skybar_1.jpg", "/images/places/exact_skybar_2.jpg"],
                description: "Sur les quais du Sud (Nanbin Road) au Changjiahui Shopping Park. C'est l'un des bars les plus visuellement fous de la ville : de hauts lumens projettent au sol une simulation photo-réaliste d'un océan bleu mouvant avec des vagues. La vue de nuit sur Yuzhong de l'autre côté du fleuve noir est féérique.",
                tips: "SI tu as obtenu plusieurs \"WeChat\" grâce à la balade en Hanfu ou à Testbed 2, c'est le spot PARFAIT pour l'inviter pour \"a romantic drink\". Sors ta plus belle tenue de créateur (ou ton super tailleur). \n\nRègles d'or du First Date en Chine avec ton profil : \n- Jamais on ne partage l'addition (Go Dutch / AA). Tu arraches l'addition au serveur pour payer au complet, question de Face pour l'homme, surtout étranger. \n- Tu poses ton tel au milieu de la table sur WeChat Translate et tu appuies avec le doigt. \n- Look deep : avec ton visage aux traits fins (faisant plutôt 20 ans), ton contact visuel bleu sur la table rend le moment ultra intense, même sans un mot. Sois doux et laisse-la diriger la boisson.",
                location: "Nan'an",
                address: "Changjiahui Shopping Park, Nanbin Road",
                icon: "🍸",
                priceEstimate: "13-25 € (Cocktail)",

                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-06",
        dayNumber: 8,
        activities: [
            {
                id: generateId(),
                time: "10:30",
                duration: "3h",
                title: "Ciqikou Ancient Town",
                chineseTitle: "磁器口古镇",
                images: ["/images/places/sight_2_1.jpg", "/images/places/sight_2_2.jpg", "/images/places/sight_2_3.jpg"],
                description: "Un labyrinthe historique frénétique et préservé. Des rues extrêmement resserrées serpentent à travers de vieilles maisons où des dizaines de marchands martèlent du piment rouge vif dans des mortiers géants ou étirent le sucre gluant. Ça crie, ça sent le vinaigre et le sucre chaud, un vrai bond temporel.",
                tips: "Si tu dois goûter une chose, c'est le Mahua (un petit beignet de pâte torsadé frit très dur). L'endroit est extrêmement touristique et compact, c'est parfait pour acheter tes premiers souvenirs à petit prix.",
                location: "Shapingba",
                address: "Ciqikou",
                icon: "🏘️",
                priceEstimate: "Gratuit",

                completed: false
            },
            {
                id: generateId(),
                time: "14:00",
                duration: "2h",
                title: "Graffiti Art Street (Huangjueping)",
                chineseTitle: "黄桷坪涂鸦艺术街",
                images: ["/images/places/sight_22_1.jpg", "/images/places/sight_22_2.jpg"],
                description: "Une orgie visuelle urbaine. Tous les grands immeubles de béton, arrêts de bus, poubelles, sols... autour du campus des Beaux-Arts du Sichuan sont tapissés d'une couche épaisse de d'immenses graffitis naïfs, poétiques, politiques ou purement abstraits créés collectivement par des milliers d'étudiants sur des décennies.",
                tips: "Ici traînent les esprits les plus créatifs, libres, et fashionables de la jeunesse de la ville (style d'étudiants en art pointu). Balade toi nonchalamment avec un café frappé glacé de chez Luckin Coffee, assis sur un muret bas. Si tu repères une étudiante au style incroyable (elle aura souvent de grosses baskets et de grands vêtements originaux), relève toi et aborde la frontalement bien qu'en restant cool : \"Nǐ de yīfú hěn hǎokàn, kěyǐ jiā wēixìn ma?\" (Ta tenue est magnifique, on peut s'ajouter sur WeChat ?). Tu ne peux décemment pas te faire rejeter.",
                location: "Jiulongpo",
                address: "Huangjueping",
                icon: "🖌️",
                priceEstimate: "Gratuit",

                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                duration: "2h",
                title: "Dîner Tanyaochu Poissons Grillés (Kao Yu)",
                chineseTitle: "探鱼 (烤鱼)",
                images: ["/images/places/bf_5_1.jpg", "/images/places/bf_5_2.jpg"],
                description: "Un autre pilier de la force de frappe culinaire locale. Tanyaochu (ou un autre grand restaurant Kao Yu) sert un énorme poisson d'eau douce entier, ouvert en deux et rôti sur des braises brûlantes, avant d'être noyé vivant dans un monstrueux caquelon plat rempli d'huile parfumée frémissante, recouvert d'un centimètre de piments séchés, de poivre du Sichuan, de tofu en rubans, et de racines de lotus.",
                tips: "Le goût est sensationnel, ça picote les lèvres à mort et donne furieusement soif. Demande obligatoirement une grande bouteille de lait de coco d'avoine fraîche ou de lait d'amande très glacé en accompagnement pour combattre l'incendie et protéger ton palais avec la fraîcheur laiteuse.",
                location: "Jiulongpo",
                icon: "🐟",
                priceEstimate: "15-19 €",

                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-07",
        dayNumber: 9,
        activities: [
            {
                id: generateId(),
                time: "09:00",
                duration: "3h",
                title: "Chongqing Zoo (Les Pandas !)",
                chineseTitle: "重庆动物园",
                images: ["/images/places/sight_8_1.jpg", "/images/places/sight_8_2.jpg", "/images/places/sight_8_3.jpg"],
                description: "On ne vient pas en Chine libre sans voir un panda géant ! Le zoo possède une impressionnante enclave boisée pour héberger des Pandas Géants adultes, de petits jeunes (généralement jumeaux s'amusant), et des Pandas roux (les renards de feu de l'himalaya rapides et furtifs) grimpant aux tiges de bambou.",
                tips: "C'est IMPÉRATIF d'y aller au réveil des portes le matin. Les pandas ne supportent pas la chaleur du midi, dès 11h ils dorment effondrés de dos. Au frais le matin, ils se battent, roulent en boule, et broient les montagnes géantes de bambou.",
                location: "Jiulongpo",
                address: "Xijiao Road",
                icon: "🐼",
                priceEstimate: "3 €",

                completed: false
            },
            {
                id: generateId(),
                time: "13:00",
                duration: "2h",
                title: "Librairie Zhongshuge",
                chineseTitle: "钟书阁 (杨家坪店)",
                images: ["/images/places/sight_23_1.jpg", "/images/places/sight_23_2.jpg"],
                description: "Si M.C. Escher, J.K. Rowling et Inception concevaient une bibliothèque moderne, ça serait la Zhongshuge. Les sols sont de profonds miroirs noirs, des tonnes d'escaliers cuivrés zèbrent l'espace en de multiples dimensions, et l'illusion d'optique où les étagères de livres se connectent parfaitement avec le plafond est absolument étourdissante.",
                tips: "Le paradis de la photo esthétique ou architecturale. Fais grandement attention à ne pas entrer dans un miroir par mégarde. On y croise un public très calme, studieux, c'est l'anti-Nightclub par excellence.",
                location: "Jiulongpo",
                address: "Zhongdi Square",
                icon: "📚",
                priceEstimate: "Gratuit",

                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                duration: "2h",
                title: "Croisière Nocturne des Deux Fleuves",
                chineseTitle: "两江游游船",
                images: ["/images/places/sight_13_1.jpg", "/images/places/sight_13_2.jpg"],
                description: "À Chaotianmen, à la jonction boueuse du fleuve Yangtsé et du Jialing, tu monteras à bord d'un long bateau d'excursion fluo. Glisser silencieusement sur les eaux noires en observant, d'en bas, cette effrayante muraille géante de néons LED en perpétuel mouvement crachotant des couleurs depuis des immeubles à gratte-ciel... c'est à ce moment-là que tu réaliseras qu'en fait, Chongqing, c'est vraiment le Blade Runner d'Asie.",
                tips: "Dépense 5 euros de plus pour garantir un ticket pour l'espace Premium / Open Deck au pont supérieur. Être au sommet du bateau dans l'air nocturne au lieu de derrière d'épaisses vitres changera entièrement ta sensation photographique.",
                location: "Chaotianmen",
                address: "Chaotianmen Dock",
                icon: "⛴️",
                priceEstimate: "16-24 €",

                completed: false
            },
            {
                id: generateId(),
                time: "21:30",
                duration: "3h",
                title: "Revolucion Cocktail (Bars Centro)",
                chineseTitle: "Revolucion Cocktail (革命鸡尾酒)",
                images: ["/images/places/exact_rev_1.jpg", "/images/places/exact_rev_2.jpg"],
                description: "Contrairement à la zone du chaos de Nine Street au nord (EDM ravageur), cette zone du centre (autour du fameux Revolucion Cocktail) distille une ambiance lounge hip-hop moite et conviviale de bière artisanale (Craft beer), musique chaloupée, et population hybride, mélangeant expatriés trentenaires et jeunesse métropolitaine ouverte d'esprit.",
                tips: "Le secret le mieux gardé des expatriés et \"Foreigners hunters\" :  les jolies jeunes Chinoises de 20-25 ans qui fréquentent rigoureusement ces bars (souvent étudiantes en langue ou de retour d'universités anglaises) CHERCHENT délibérément à interagir ou sympathiser avec des occidentaux (elles y parlent souvent un anglais très basique !). Pose-toi négligemment au bar central. Infaillible avec ton profil : commande, regarde autour toi... dès que tu as croisé deux fois le long regard soutenu d’un groupe de filles à une table, adresse leur un tout petit sourire et un imperceptible signe de tête charmeur qui scande \"viens\". Le match tombe à tous les coups sans te compliquer la vie.",
                location: "Centro (Yuzhong)",
                icon: "🍻",
                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-08",
        dayNumber: 10,
        activities: [
            {
                id: generateId(),
                time: "08:30",
                duration: "2h30",
                title: "Trajet vers le Karst de Wulong",
                chineseTitle: "武隆客运中心",
                images: ["/images/places/sight_1_3.jpg"],
                description: "Séparation du hublot dystopique pour t'enfoncer à la campagne lointaine après plus de 2 heures en bus ou en train grande vitesse. Le béton écrasant est enfin chassé par de rudes montagnes vert émeraude et d'épaisses nappes de nuages bas qui caressent la plaine rocheuse.",
                tips: "Achète une énorme batterie externe la veille, et prévois quelques snacks/chocolat car tu ne trouveras rien que des gargotes paumées sur le trajet et les sentiers rocailleux te prendront pas mal de jus calorique.",
                location: "Gare / Autoroute -> Wulong",
                icon: "🚆",
                priceEstimate: "8-10 € (Bus/Train)",

                completed: false
            },
            {
                id: generateId(),
                time: "11:00",
                duration: "4h",
                title: "Three Natural Bridges (Wulong)",
                chineseTitle: "天生三桥 (武隆)",
                images: ["/images/places/sight_5_1.jpg", "/images/places/sight_5_2.jpg"],
                description: "Cet endroit est un chef-d'œuvre titanesque de l'érosion naturel absolu (figurant dans Transformers 4). Tu vas descendre profondément de centaines de mètres dans un abysse calcaire géant enveloppé de brumes, en passant sous d'imposantes et invraisemblables arches en pierre naturelle monumentales, encerclées de bambous, de cascades sauvages, frôlant le monastère en bois reconstruit pour un film de Zhang Yimou niché au centre du cratère.",
                tips: "Là, tout le monde dégaine les appareils pour capturer l'échelle démentielle de la falaise. S'il y a du monde, bloque toi avec le soleil qui tombe juste sous la courbe d'arche, et n'hésite pas à poliment interpeller une jeune touriste chinoise seule pour immortaliser ton propre profil: \"Kěyǐ bāng wǒ pāizhào ma?\" (pouvez-vous me prendre en photo ?) en montrant l'écran grand angle de l'iPhone avec un grand sourire innocent. C'est l'icebreaker de l'étranger amical par excellence !",
                location: "Wulong Karst",
                address: "Wulong District",
                icon: "⛰️",
                priceEstimate: "20 €",

                completed: false
            },
            {
                id: generateId(),
                time: "16:00",
                duration: "2h",
                title: "Stalactites Subterrannéenne de la Grotte Furong",
                chineseTitle: "芙蓉洞 (武隆)",
                images: ["/images/places/sight_12_1.jpg"],
                description: "À quelques rivières de là, tu passeras du soleil à un antre infernal, l'énorme cavité souterraine de Furong. La grandeur du parcours plonge dans un univers géologique déconcertant, teinté par l'extravagante tradition locale d'illuminer tout conglomérat de pierre pointu en dégradé de violet, fuchsia, cyan ou vert litchi tapageur... ce qui donne l'effet troublant de te promener en plein trip de Las Vegas Spéléologique !",
                tips: "Habille-toi très chaudement. Sous terre l'air envoie un taux d'humidité avoisinant les 90% combiné à une vraie chute frigorifique de la chaleur. Le sol brillant est extrêmement glissant (oublie les chaussures mode, amène les grosses baskets de sport à crans).",
                location: "Wulong District",
                icon: "🦇",
                priceEstimate: "19 €",

                completed: false
            },
            {
                id: generateId(),
                time: "18:30",
                duration: "2h30",
                title: "Retour épuisé à l'hôtel",
                chineseTitle: "德亚酒店 (解放碑)",
                description: "L'expédition lointaine épuise tout randonneur urbain. Le retour sombre dans le ronron régulier du train rapide te relancera tout doucement vers le fleuve scintillant par la vitre où tu vas rejoindre avec soulagement tes repères habituels dans les lumières éblouissantes de Jiefangbei.",
                tips: "Mange seulement léger, une bouchée chaude fumante type vapeur et couche-toi après une petite douche et une crème hydratante complète pour abréger les crispations.",
                location: "Wulong -> Yuzhong",
                icon: "🚌",
                priceEstimate: "8-10 € (Train)",

                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-09",
        dayNumber: 11,
        activities: [
            {
                id: generateId(),
                time: "08:30",
                duration: "1h30",
                title: "Coup de Bus Express vers Dazu",
                chineseTitle: "大足石刻",
                description: "Ultime trajet éloigné de l'épicentre du pays du chou (Chongqing). La route s'oriente cette fois-ci vers la lointaine campagne Ouest pour atteindre les colosses divins pétrifiés et silencieux sous l'Unesco de Dazu, havre de paix millénaire pour l'art et les préceptes bouddhistes du moyen-âge.",
                tips: "Télécharge complètement la série ou des podcasts audios en hors connexion dans l'app, le réseau a tendance à couper continuellement sous les multiples chaînes de montagnes forestières de l'ouest ou dans les tunnels sans fin de la région du Sichuan.",
                location: "Dazu",
                address: "Gare routière ou Train grande vitesse Ouest",
                icon: "🚌",
                priceEstimate: "6-10 €",

                completed: false
            },
            {
                id: generateId(),
                time: "10:30",
                duration: "3h",
                title: "Sculptures titanesques de Baodingshan",
                chineseTitle: "宝顶山石刻 (大足)",
                description: "Une vallée cachée tapissée sur le flanc sud d'un gigantesque panorama de roche de plus de 50'000 bas-reliefs polychromes incroyablement nets et vivaces et vieux de plus 800 ans qui content sans aucune interruption d'innombrables chroniques infernales, jugements de la roue, ou l'infiniment poisseuse tendresse du célébrissime Bouddha se prélassant couché sur toute l'envergure du versant rocheux. Magnifiquement conservée par le destin des guerres lointaines, c'est l'apogée ultime de la gravure religieuse en chine.",
                tips: "C'est l'essence absolue du moment intellectuel posé de ce voyage en Chine rurale intolérable. Parle au ralenti, marche extrêmement lentement (les gardiens veillent à préserver un volume d'âme discret sur le site face à toute foule criarde), et scrute les myriades de détails : ce chef d'œuvre narre vraiment l'idée terrifiante que les dynasties chinoise se faisaient de la condamnation au purgatoire des pécheurs. Apprécie ton \"silence blanc\".",
                location: "Dazu",
                address: "Baodingshan Scenic Area",
                icon: "🗿",
                priceEstimate: "14 €",

                completed: false
            },
            {
                id: generateId(),
                time: "14:00",
                duration: "1h30",
                title: "L'art délicat du repas au compté Dazu",
                chineseTitle: "大足区",
                description: "Le comté à l'ombre de son sanctuaire préserve de petites auberges familliales proposant des plats de fermes et un style à la ruralité généreuse, radicalement différent de la surproduction d'huiles bouillantes pimentées servies pour les ouvriers à la chaîne du centre urbain. C'est doux, c'est plein de bambou frais poêlé, de viande de canard parfumé longuement confite au poivre des arbres, ou des nouilles paysanes cuites en de gros caissons d'inox avec leur porcs locaux.",
                tips: "C'est la cuisine du terroir et des anciens ! Retenir simplement \"Qíng gěi wǒ nǐ de běl dǐ té sē.\" (pouvez-vous m'apporter votre spécialité ultra-locale typique) et savourer avec beaucoup de paix d'esprit ce moment simple sur la plaine reculée.",
                location: "Dazu",
                icon: "🍲",
                priceEstimate: "Variable",

                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-10",
        dayNumber: 12,
        activities: [
            {
                id: generateId(),
                time: "10:00",
                duration: "2h",
                title: "Aventure en Pharmacopée et Médecine Traditionnelle (TCM)",
                chineseTitle: "中医诊所 (解放碑)",
                description: "Un choc culturel fascinant. Les plus vieilles et respectables pharmacies chinoises dégagent une inimitable aura aromatique faite de racine sombre séchées, de bois lourd tranché, de nids d'animaux suspendus ou encore de centaines de tiroirs classant méticuleusement la botanique occulte de thérapies chinoises non basées sur la médecine conventionnelle. C'est du chamanisme raffiné qui donne une vision complète sur l'équilibre du \"Qi\" dans la ville des sueurs.",
                tips: "C'est simple, tu seras le meilleur de tes copains de France qui l'aura fait : assied-toi poliment, ose payer tes 20 euros pour une sincère consultation de \"prise des pouls simultanés du poignets\". Lève de fierté tes yeux bleus mystérieux, tend tranquillement au pharmacien sage des billets d'entrée et glisse un sincère respect absolu : \"Wǒ xiǎng kàn zhōngyī\" (Je veux l'expertise de voir un médecin de médecine traditionnelle !). Un moment dingue à filmer qui n'existe qu'au bout du monde.",
                location: "Jiefangbei",
                icon: "🌿",
                priceEstimate: "19-38 €",

                completed: false
            },
            {
                id: generateId(),
                time: "12:30",
                duration: "1h30",
                title: "Déjeuner Fat-Food Wallace",
                chineseTitle: "华莱士 (Wallace)",
                description: "Assez d'histoire rurale, place à la Chine consumériste effrénée. \"Wallace\", c'est la véritable chaîne concurrente de KFC (qui est lui même une institution gigantesque en asie), ultra agressive et grasse, dévorée par toute l'école urbaine en fringues ultra slim avec leurs énormes seaux remplis de bouts de poulets frits épicés, de burgers d'étranges compositions laiteuses au gingembres et de patisseries aux œuf dorés dans un environnement plastique pop rouge rutilant.",
                tips: "Prend de bonnes poignées du \"poulet frit piquant spécialite nationale\" et croque dedant. Simple, enfantin, hyper lourd caloriquement parlant et très fun au cœur d'un voyage à ne pas louper. N'oublie pas de scanner au comptoir pour choper tes menus directos en QR sur l'Iphone car bien sûr, on ne parle pas aux caissières au fast food ici... ! Le Tur-fu on a dit.",
                location: "Centre-ville",
                icon: "🍟",
                priceEstimate: "4-6 €",

                completed: false
            },
            {
                id: generateId(),
                time: "14:30",
                duration: "3h",
                title: "Dernière rafle de Souvenirs au boutis des ruelles",
                chineseTitle: "朝天门批发市场",
                description: "C'est l'heure fatidique, à Chaotianmen se planquent d'entiers marchés de gros ultra denses sous terre vendant sans scrupules des tonnes d'appareils théières traditionnelles en fer, d'artisanat délicat calligraphié (parchemins en soie), de paquets sous vides compressant les plus célèbres grains de pur poivre à haute tension engourdissant de Sichuan ou des thés fleuris aux feuilles emmêlées que plus aucuns français ne saura déceler d'où ils proviennent.",
                tips: "Ferme les achats ! La base crucial des pourparlers : pour l'artisanat (à Chaotianmen ou dans les vieilles ruelles de Ciqikou), négocier est l'art naturel urbain. Propose sans gêne à la petite grand mère marchande sur ta calculatrice numérique \"Tài guì la!\" (C'est vraiment trop cher !) pour l'obliger à réduire gracieusement le prix au bas mot de diviser la somme facilement de moitié de suite, même à un beau blond charmant riche ! Ce n'est jamais méchant et les deux le prennent comme le jeu amical classique social asiatique du commerce des bas quartiers !",
                location: "Jiefangbei / Chaotianmen",
                icon: "🎁",
                priceEstimate: "Variable",

                completed: false
            },
            {
                id: generateId(),
                time: "19:00",
                duration: "2h30",
                title: "Grand Banquet Gastronomique au Ting Yun Pavilion",
                chineseTitle: "听云轩 (或同等餐厅)",
                description: "Dernière nuit à la couronne ! Fin du voyage d'investigation : habille-toi de ta meilleure sape et offre-toi un banquet luxurieux au Ting Yun Pavilion (ou similaire). Ces formidables restaurants se targuent d'immense chaises sculptée lourdes, d'une fine gastronomie du Sichuan ou d'un canard laqué rôti à la perfection au feu de bois fruitier devant la table étincelante et découpé sur place.",
                tips: "Enveloppe doucement ta délicate crêpe canard avec finesse et élève tout simplement un gros vert de l'alcool d'eau de vie à 50 degrés le plus cher de la terre avec tes potes, amis de beuveries récents ou le date charmant que chongqing t'a déposé sur les genoux durant les 11 soirées folles (tu l'avais choppé grâce un \"jiā wēixìn\" à Nine Street le 4e soir) pour frapper la table avec fracasse aux exclamations éternelles du trinque unanime solennel festoyant chinois... ! \"GĀNBĒI !\" C'est majestueux et lourd d'adrénaline de la belle jeunesse. Un succès absolu.",
                location: "Yuzhong",
                icon: "🦆",
                priceEstimate: "38-63 €",

                completed: false
            }
        ]
    },
    {
        id: `day-${generateId()}`,
        date: "2026-05-11",
        dayNumber: 13,
        activities: [
            {
                id: generateId(),
                time: "06:00",
                duration: "1h",
                title: "Check-out Final de l'Hôtel",
                chineseTitle: "退房",
                description: "Fin du séjour au Deya Hotel, check-out express.",
                tips: "Vérifie bien les tiroirs et les placards pour ne rien oublier.",
                location: "Deya Hotel",
                icon: "🏨",
                priceEstimate: "Variable",

                completed: false
            },
            {
                id: generateId(),
                time: "06:30",
                duration: "2h",
                title: "Trajet vers l'Aéroport (CKG)",
                chineseTitle: "去重庆江北机场 (T3)",
                description: "Dernier trajet en DiDi ou taxi à travers Chongqing endormie.",
                tips: "Prévient un peu en avance ton chauffeur si besoin sur DiDi.",
                location: "Aéroport (CKG) T3",
                icon: "🚕",
                priceEstimate: "12 € (RER B)",

                completed: false
            },
            {
                id: generateId(),
                time: "09:05",
                duration: "2h25",
                title: "Vol Chongqing - Pékin (NH2NKC)",
                description: "Décollage de CKG T3 vers Beijing T3.",
                tips: "Détends-toi, la partie domestique est presque passée.",
                location: "Avion",
                icon: "🛫",
                completed: false
            },
            {
                id: generateId(),
                time: "11:30",
                duration: "2h",
                title: "Escale à Pékin T3",
                description: "Arrivée et transit pour le vol international.",
                tips: "Derniers achats duty-free chinois si tu as des oublis !",
                location: "Aéroport PEK T3",
                icon: "⏱️",
                priceEstimate: "Variable",

                completed: false
            },
            {
                id: generateId(),
                time: "13:30",
                duration: "10h45",
                title: "Vol Pékin - Paris (NH2NKC)",
                description: "Long vol retour vers l'Europe.",
                tips: "Prépare tes playlists et tes films hors ligne.",
                location: "Air",
                icon: "✈️",
                completed: false
            },
            {
                id: generateId(),
                time: "18:15",
                duration: "1h",
                title: "Arrivée à Paris CDG T1",
                description: "Atterrissage en France. Accueil par le ciel parisien.",
                tips: "Bon retour, c'est la fin du cyberpunk pour l'instant !",
                location: "Paris CDG T1",
                icon: "🛬",
                priceEstimate: "Variable",

                completed: false
            }
        ]
    }
];
