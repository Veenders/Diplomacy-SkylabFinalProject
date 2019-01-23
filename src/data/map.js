export default {
    NWG:{
        name:'Norwegian Sea',
        id: 'NWG',
        x:220,
        y:50,
        kind: 'sea',
        coast: false,
        neighbors: ['NAO','Cly','Edi','NTH','Nwy','BAR']
    },
    NTH:{
        name: 'North Sea',
        id: 'NTH',
        x: 190,
        y: 220,
        kind: 'sea',
        coast: false,
        neighbors: ['NWG','Edi','Yor','Lon','Bel','Hol','HEL','Den','SKA','Nwy']
    },
    ADR:{
        name: 'Adriatic Sea',
        id: 'ADR',
        x: 300,
        y: 450,
        kind: 'sea',
        coast: false,
        neighbors: ['ION','Apu','Ven','Tri','Alb']
    },
    AEG:{
        name: 'Aegean Sea',
        id: 'AEG',
        x: 392,
        y: 505,
        kind: 'sea',
        coast: false,
        neighbors: ['ION','Gre','Bul','Con','Smy','EAS']
    },
    Alb:{
        name: 'Albania',
        id: 'Alb',
        x: 333,
        y: 470,
        kind: 'land',
        coast: true,
        neighbors: ['ION','ADR','Tri','Ser','Gre']
    },
    Ank:{
        name: 'Ankara',
        id: 'Ank',
        x: 490,
        y: 450,
        kind: 'land',
        coast: true,
        neighbors: ['BLA','Arm','Smy','Con']
    },
    Apu:{
        name: 'Apulia',
        id: 'Apu',
        x: 280,
        y: 455,
        kind: 'land',
        coast: true,
        neighbors: ['ION','ADR','Ven','Rom','Nap']
    },
    Arm:{
        name: 'Armenia',
        id: 'Arm',
        x: 575,
        y: 445,
        kind: 'land',
        coast: true,
        neighbors: ['BLA','Ank','Smy','Syr','Sev']
    },
    BAL:{
        name: 'Baltic Sea',
        id: 'BAL',
        x: 208,
        y: 250,
        kind: 'sea',
        coast: false,
        neighbors: ['BOT','Lvn','Pru','Ber','Kie','Den','Swe']
    },
    BAR:{
        name: 'Barents Sea',
        id: 'BAR',
        x: 440,
        y: 30,
        kind: 'sea',
        coast: false,
        neighbors: ['NWG','Nwy','Stp']
    },
    Bel:{
        name: 'Belgium',
        id: 'Bel',
        x: 190,
        y: 305,
        kind: 'land',
        coast: true,
        neighbors: ['NTH','ENG','Pic','Bur','Ruh','Hol']
    },
    Ber:{
        name: 'Berlin',
        id: 'Ber',
        x: 272,
        y: 270,
        kind: 'land',
        coast: true,
        neighbors: ['BAL','Kie','Mun','Sil','Pru']
    },
    BLA:{
        name: 'Black Sea',
        id: 'BLA',
        x: 470,
        y: 425,
        kind: 'sea',
        coast: false,
        neighbors: ['Con','Bul','Rum','Sev','Arm','Ank']
    },
    Boh:{
        name: 'Bohemia',
        id: 'Boh',
        x: 283,
        y: 325,
        kind: 'land',
        coast: false,
        neighbors: ['Mun','Tyr','Vie','Gal','Sil']
    },
    Bre:{
        name: 'Brest',
        id: 'Bre',
        x: 120,
        y: 325,
        kind: 'land',
        coast: true,
        neighbors: ['MAO','ENG','Pic','Par','Gas']
    },
    Bud:{
        name: 'Budapest',
        id: 'Bud',
        x: 350,
        y: 370,
        kind: 'land',
        coast: false,
        neighbors: ['Tri','Vie','Gal','Rum','Ser']
    },
    Bul:{
        name: 'Bulgaria',
        id: 'Bul',
        x: 395,
        y: 450,
        kind: 'land',
        coast: true,
        neighbors: ['NTH','ENG','Pic','Bur','Ruh','Hol']
    },
}