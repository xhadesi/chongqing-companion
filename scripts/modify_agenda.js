const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/data/defaultItinerary.ts');
let content = fs.readFileSync(targetFile, 'utf8');

// The file exports DEFAULT_ITINERARY array.
// Instead of string replacement, we can just compile or regex the dayNumber and dates.

// Or I know exactly where Day 1 and Day 12 are.
content = content.replace(/dayNumber: (\d+),/g, (match, p1) => {
    let num = parseInt(p1);
    // Shift all day numbers by 1
    return `dayNumber: ${num + 1},`;
});

// Now old Day 1 is Day 2, etc.
// Old Day 1 starts with 'date: "2026-04-30",'
// Let's add Day 1 at the beginning of the array.

let newDay1 = `    {
        id: \`day-\${generateId()}\`,
        date: "2026-04-29",
        dayNumber: 1,
        activities: [
            {
                id: generateId(),
                time: "17:00",
                duration: "3h",
                title: "Départ pour l'Aéroport",
                description: "Direction l'aéroport de Paris-Charles-de-Gaulle T1. C'est le grand départ vers la mégalopole chinoise.",
                tips: "Vérifie bien ton passeport et ton visa une dernière fois !",
                location: "Paris CDG T1",
                icon: "🛫",
                completed: false
            },
            {
                id: generateId(),
                time: "20:20",
                duration: "10h",
                title: "Vol Paris - Pékin (Réf: NH2NKC)",
                description: "Embarquement pour le vol de nuit vers l'Aéroport international de Pékin T3.",
                tips: "Dors un maximum dans l'avion pour encaisser le décalage horaire (+6h).",
                location: "Dans les airs",
                icon: "✈️",
                completed: false
            }
        ]
    },
`;

content = content.replace('export const DEFAULT_ITINERARY: TripDay[] = [', 'export const DEFAULT_ITINERARY: TripDay[] = [\n' + newDay1);

// Now old Day 1 (which is now Day 2) needs to be completely replaced.
// Look for date: "2026-04-30" block
const day2Regex = /\{\s*id: `day-\$\{generateId\(\)\}`,[\s\n]*date: "2026-04-30",[\s\S]*?(?=,\n\s*\{\s*id: `day-\$\{generateId\(\)\}`,[\s\n]*date: "2026-05-01")/;

let newDay2 = `{
        id: \`day-\${generateId()}\`,
        date: "2026-04-30",
        dayNumber: 2,
        activities: [
            {
                id: generateId(),
                time: "12:20",
                duration: "3h30",
                title: "Escale à Pékin T3",
                description: "Arrivée à l'aéroport international de Pékin T3.",
                tips: "Profite de l'escale pour te dégourdir les jambes et manger ton premier snack chinois.",
                location: "Aéroport PEK T3",
                icon: "⏱️",
                completed: false
            },
            {
                id: generateId(),
                time: "16:00",
                duration: "2h55",
                title: "Vol Pékin - Chongqing (NH2NKC)",
                description: "Décollage de Pékin pour atterrir dans la trépidante Chongqing.",
                tips: "Regarde par le hublot, le survol des montagnes est impressionnant.",
                location: "Dans les airs",
                icon: "✈️",
                completed: false
            },
            {
                id: generateId(),
                time: "18:55",
                duration: "1h30",
                title: "Arrivée à Chongqing (CKG)",
                description: "Atterrissage à l'Aéroport Jiangbei T3.",
                tips: "Prends un taxi officiel ou un DiDi. C'est l'heure de plonger dans la mégalopole.",
                location: "Aéroport CKG T3",
                icon: "🛬",
                completed: false
            },
            {
                id: generateId(),
                time: "20:30",
                duration: "1h",
                title: "Check-in au Deya Hotel",
                description: "Installation à ta chambre « Dree· Superior Delight Double Bed Room (City View) » au Dreeya·德涯酒店. Adresse: 解放碑洪崖洞店.",
                tips: "11 nuits t'attendent ici. Montre l'adresse en chinois à la réception.",
                location: "Hôtel (Jiefangbei)",
                address: "Deya Hotel, Jiefangbei CBD",
                icon: "🏨",
                completed: false
            },
            {
                id: generateId(),
                time: "21:30",
                duration: "1h30",
                title: "Découverte nocturne: Hongyadong & Snacks",
                description: "Première balade nocturne dans ce complexe majestueux illuminé accroché à la falaise. L'ambiance claque instantanément.",
                tips: "Reste léger sur la nourriture pour le moment. L'air est bouillonnant !",
                location: "Yuzhong",
                address: "No. 88 Binjiang Road",
                icon: "🌃",
                image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Hongyadong_Chongqing_Night_View.jpg",
                completed: false
            }
        ]
    }`;

content = content.replace(day2Regex, newDay2);

// Finally, update Day 13 (was Day 12, date: "2026-05-11").
const day13Regex = /\{\s*id: `day-\$\{generateId\(\)\}`,[\s\n]*date: "2026-05-11",[\s\n]*dayNumber: 13,[\s\S]*?(?=\];)/;

let newDay13 = `{
        id: \`day-\${generateId()}\`,
        date: "2026-05-11",
        dayNumber: 13,
        activities: [
            {
                id: generateId(),
                time: "06:00",
                duration: "1h",
                title: "Check-out Final de l'Hôtel",
                description: "Fin du séjour au Deya Hotel, check-out express.",
                tips: "Vérifie bien les tiroirs et les placards pour ne rien oublier.",
                location: "Deya Hôtel",
                icon: "🏨",
                completed: false
            },
            {
                id: generateId(),
                time: "06:30",
                duration: "2h",
                title: "Trajet vers l'Aéroport (CKG)",
                description: "Dernier trajet en DiDi ou taxi à travers Chongqing endormie.",
                tips: "Prévient un peu en avance ton chauffeur si besoin sur DiDi.",
                location: "Aéroport (CKG) T3",
                icon: "🚕",
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
                completed: false
            }
        ]
    }
`;

content = content.replace(day13Regex, newDay13);

fs.writeFileSync(targetFile, content);
console.log("Updated defaultItinerary.ts");
