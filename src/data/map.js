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
        x: 308,
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
        neighbors: ['AEG','Gre','Ser','Rum','BLA','Con']
    },
    Bur:{
        name: 'Burgundy',
        id: 'Bur',
        x: 185,
        y: 350,
        kind: 'land',
        coast: false,
        neighbors: ['Par','Pic','Bel','Ruj','Mun','Mar','Gas']
    },
    Clyde:{
        name: 'Clyde',
        id: 'Cly',
        x: 135,
        y: 180,
        kind: 'land',
        coast: true,
        neighbors: ['NAO','NWG','Edi','Lvp']
    },
    Con:{
        name: 'Constantinople',
        id: 'Con',
        x: 440,
        y: 465,
        kind: 'land',
        coast: true,
        neighbors: ['AEG','Bul','BLA','Ank','Smy']
    },
    Den:{
        name: 'Denmark',
        id: 'Den',
        x: 250,
        y: 240,
        kind: 'land',
        coast: true,
        neighbors: ['HEL','NTH','SKA','Swe','BAL','Kie']
    },
    EAS:{
        name: 'Eastern Mediterranean',
        id: 'EAS',
        x: 490,
        y: 555,
        kind: 'sea',
        coast: false,
        neighbors: ['ION','AEG','Smy','Syr']
    },
    Edi:{
        name: 'Edinburgh',
        id: 'Edi',
        x: 150,
        y: 200,
        kind: 'land',
        coast: true,
        neighbors: ['NWG','NTH','Yor','Lvp','Cly']
    },
    ENG:{
        name: 'English Channel',
        id: 'ENG',
        x: 100,
        y: 305,
        kind: 'sea',
        coast: false,
        neighbors: ['MAO','IRI','Wal','Lon','NTH','Bel','Pic','Bre']
    },
    Fin:{
        name: 'Finland',
        id: 'Fin',
        x: 375,
        y: 135,
        kind: 'land',
        coast: true,
        neighbors: ['BOT','Swe','Nwy','Stp']
    },
    Gal:{
        name: 'Galicia',
        id: 'Gal',
        x: 380,
        y: 340,
        kind: 'land',
        coast: false,
        neighbors: ['NWG','NTH','Yor','Lvp','Cly']
    },
    Gas:{
        name: 'Gascony',
        id: 'Gas',
        x: 130,
        y: 380,
        kind: 'land',
        coast: true,
        neighbors: ['MAO', 'Bre', 'Par', 'Bur', 'Mar', 'Spa']
    },
    Gre:{
        name: 'Greece',
        id: 'Gre',
        x: 355,
        y: 500,
        kind: 'land',
        coast: true,
        neighbors: ['AEG', 'ION', 'Alb', 'Ser', 'Bul']
    },
    LYO:{
        name: 'Gulf of Lyon',
        id: 'LYO',
        x: 170,
        y: 440,
        kind: 'sea',
        coast: false,
        neighbors: ['TYS', 'WES', 'Spa', 'Mar', 'Pie', 'Tus']
    },
    BOT:{
        name: 'Gulf of Bothnia',
        id: 'BOT',
        x: 340,
        y: 195,
        kind: 'sea',
        coast: false,
        neighbors: ['BAL', 'Swe', 'Fin', 'Stp', 'Lvn']
    },
    HEL:{
        name: 'Helgoland Bight',
        id: 'HEL',
        x: 215,
        y: 250,
        kind: 'sea',
        coast: false,
        neighbors: ['NTH', 'Den', 'Kie', 'Hol']
    },
    Hol:{
        name: 'Holland',
        id: 'Hol',
        x: 200,
        y: 290,
        kind: 'land',
        coast: true,
        neighbors: ['NTH', 'HEL', 'Kie', 'Ruh', 'Bel']
    },
    ION:{
        name: 'Ionian Sea',
        id: 'ION',
        x: 315,
        y: 540,
        kind: 'sea',
        coast: false,
        neighbors: ['Tun', 'TYS', 'Nap', 'Apu', 'ADR', 'Alb','Gre','AEG','EAS']
    },
    IRI:{
        name: 'Irish Sea',
        id: 'IRI',
        x: 85,
        y: 280,
        kind: 'sea',
        coast: false,
        neighbors: ['MAO', 'NAO', 'Lvp', 'Wal', 'Eng']
    },
    Kie:{
        name: 'Kiel',
        id: 'Kie',
        x: 230,
        y: 290,
        kind: 'land',
        coast: true,
        neighbors: ['HEL', 'Den', 'BAL', 'Ber', 'Mun', 'Ruh','Hol']
    },
    Lvp:{
        name: 'Liverpool',
        id: 'Lvp',
        x: 130,
        y: 235,
        kind: 'land',
        coast: true,
        neighbors: ['IRI', 'NAO', 'Cly', 'Edi', 'Yor', 'Wal']
    },
    Lvn:{
        name: 'Livonia',
        id: 'Lvn',
        x: 380,
        y: 240,
        kind: 'land',
        coast: true,
        neighbors: ['BAL', 'BOT', 'Stp', 'Mos', 'War', 'Pru']
    },
    Lon:{
        name: 'London',
        id: 'Lon',
        x: 150,
        y: 280,
        kind: 'land',
        coast: true,
        neighbors: ['NTH', 'ENG', 'Wal', 'Yor']
    },
    Mar:{
        name: 'Marseilles',
        id: 'Mar',
        x: 175,
        y: 395,
        kind: 'land',
        coast: true,
        neighbors: ['LYO', 'Spa', 'Gas', 'Bur', 'Pie']
    },
    MAO:{
        name: 'Mid-Atlantic Ocean',
        id: 'MAO',
        x: 45,
        y: 340,
        kind: 'sea',
        coast: false,
        neighbors: ['WES', 'Spa', 'Por', 'NAO', 'IRI', 'ENG', 'Bre', 'Gas']
    },
    Mos:{
        name: 'Moscow',
        id: 'Mos',
        x: 440,
        y: 240,
        kind: 'land',
        coast: false,
        neighbors: ['Sev', 'Ukr', 'War', 'Lvn', 'Stp']
    },
    Mun:{
        name: 'Munich',
        id: 'Mun',
        x: 235,
        y: 340,
        kind: 'land',
        coast: false,
        neighbors: ['Bur', 'Ruh', 'Kie', 'Ber', 'Sil', 'Boh','Tyr']
    },
    Nap:{
        name: 'Naples',
        id: 'Nap',
        x: 290,
        y: 500,
        kind: 'land',
        coast: true,
        neighbors: ['ION', 'TYS', 'Rom', 'Apu']
    },
    NAO:{
        name: 'North Atlantic Ocean',
        id: 'NAO',
        x: 60,
        y: 100,
        kind: 'sea',
        coast: false,
        neighbors: ['MAO', 'IRI', 'Lvp', 'Cly', 'NWG']
    },
    Naf:{
        name: 'North Africa',
        id: 'Naf',
        x: 100,
        y: 540,
        kind: 'land',
        coast: true,
        neighbors: ['MAO', 'WES', 'Tun']
    },
    Nwy:{
        name: 'Norway',
        id: 'Nwy',
        x: 250,
        y: 150,
        kind: 'land',
        coast: true,
        neighbors: ['SKA', 'NTH', 'NWG', 'Stp', 'Fin', 'Swe']
    },
    Par:{
        name: 'Paris',
        id: 'Par',
        x: 155,
        y: 340,
        kind: 'land',
        coast: false,
        neighbors: ['Gas', 'Bre', 'Pic', 'Bur']
    },
    Pic:{
        name: 'Picardy',
        id: 'Pic',
        x: 150,
        y: 315,
        kind: 'land',
        coast: true,
        neighbors: ['ENG', 'Bel', 'Bur', 'Par','Bre']
    },
    Pie:{
        name: 'Piedmont',
        id: 'Pie',
        x: 210,
        y: 390,
        kind: 'land',
        coast: true,
        neighbors: ['LYO', 'Mar', 'Tyr', 'Ven','Tus']
    },
    Por:{
        name: 'Portugal',
        id: 'Por',
        x: 20,
        y: 420,
        kind: 'land',
        coast: true,
        neighbors: ['MAO', 'Spa']
    },
    Pru:{
        name: 'Prussia',
        id: 'Pru',
        x: 310,
        y: 275,
        kind: 'land',
        coast: true,
        neighbors: ['BAL', 'Lvn', 'War', 'Sil', 'Ber']
    },
    Rom:{
        name: 'Rome',
        id: 'Rom',
        x: 253,
        y: 457,
        kind: 'land',
        coast: true,
        neighbors: ['TYS', 'Tus', 'Ven','Apu', 'Nap']
    },
    Ruh:{
        name: 'Ruhr',
        id: 'Ruh',
        x: 215,
        y: 310,
        kind: 'land',
        coast: false,
        neighbors: ['Bur', 'Bel', 'Hol', 'Kie','Mun']
    },
    Rum:{
        name: 'Rumania',
        id: 'Rum',
        x: 410,
        y: 395,
        kind: 'land',
        coast: true,
        neighbors: ['BLA', 'Bul', 'Ser', 'Bud', 'Gal', 'Ukr', 'Sev']
    },
    Ser:{
        name: 'Serbia',
        id: 'Ser',
        x: 350,
        y: 430,
        kind: 'land',
        coast: false,
        neighbors: ['Alb', 'Tri', 'Bud', 'Rum','Bul','Gre']
    },
    Sev:{
        name: 'Sevastopol',
        id: 'Sev',
        x: 540,
        y: 330,
        kind: 'land',
        coast: true,
        neighbors: ['BLA', 'Rum', 'Ukr', 'Mos','Arm']
    },
    Sil:{
        name: 'Silesia',
        id: 'Sil',
        x: 304,
        y: 305,
        kind: 'land',
        coast: false,
        neighbors: ['Boh', 'Mun', 'Ber', 'Pru', 'War', 'Gal']
    },
    SKA:{
        name: 'Skagerrak',
        id: 'SKA',
        x: 250,
        y: 210,
        kind: 'sea',
        coast: false,
        neighbors: ['NTH', 'Nwy', 'Swe', 'BAL', 'Den']
    },
    Smy:{
        name: 'Smyrna',
        id: 'Smy',
        x: 445,
        y: 510,
        kind: 'land',
        coast: true,
        neighbors: ['EAS', 'AEG', 'Con', 'Ank', 'Arm', 'Syr']
    },
    Spa:{
        name: 'Spain',
        id: 'Spa',
        x: 55,
        y: 445,
        kind: 'land',
        coast: true,
        neighbors: ['LYO', 'WES', 'MAO', 'Por', 'Gas', 'Mar']
    },
    Stp:{
        name: 'St. Petersburg',
        id: 'Stp',
        x: 460,
        y: 120,
        kind: 'land',
        coast: true,
        neighbors: ['Mos', 'Lvn', 'BOT', 'Fin', 'Nwy' ,'BAR']
    },
    Swe:{
        name: 'Sweden',
        id: 'Swe',
        x: 300,
        y: 145,
        kind: 'land',
        coast: true,
        neighbors: ['BOT', 'BAL', 'Den', 'SKA' ,'Nwy', 'Fin']
    },
    Syr:{
        name: 'Syria',
        id: 'Syr',
        x: 570,
        y: 510,
        kind: 'land',
        coast: true,
        neighbors: ['EAS', 'Smy', 'Arm']
    },
    Tri:{
        name: 'Trieste',
        id: 'Tri',
        x: 300,
        y: 405,
        kind: 'land',
        coast: true,
        neighbors: ['ADR', 'Ven', 'Tyr', 'Vie','Bud', 'Ser', 'Alb']
    },
    Tun:{
        name: 'Tunis',
        id: 'Tun',
        x: 205,
        y: 540,
        kind: 'land',
        coast: true,
        neighbors: ['ION', 'TYS', 'WES', 'Naf']
    },
    Tus:{
        name: 'Tuscany',
        id: 'Tus',
        x: 240,
        y: 430,
        kind: 'land',
        coast: true,
        neighbors: [ 'TYS', 'LYO', 'Pie', 'Ven', 'Rom']
    },
    Tyr:{
        name: 'Tyrolia',
        id: 'Tyr',
        x: 275,
        y: 370,
        kind: 'land',
        coast: false,
        neighbors: ['Mun', 'Boh', 'Vie', 'Tri', 'Ven', 'Pie']
    },
    TYS:{
        name: 'Tyrrhenian Sea',
        id: 'TYS',
        x: 240,
        y: 490,
        kind: 'sea',
        coast: false,
        neighbors: ['ION', 'Tun', 'WES', 'LYO', 'Tus', 'Rom', 'Nap']
    },
    Ukr:{
        name: 'Ukraine',
        id: 'Ukr',
        x: 415,
        y: 320,
        kind: 'land',
        coast: false,
        neighbors: ['Gal', 'War', 'Mos', 'Sev', 'Rum']
    },
    Ven:{
        name: 'Venice',
        id: 'Ven',
        x: 240,
        y: 410,
        kind: 'land',
        coast: true,
        neighbors: ['ADR', 'Apu', 'Rom', 'Tus', 'Pie', 'Tyr', 'Tri']
    },
    Vie:{
        name: 'Viena',
        id: 'Vie',
        x: 307,
        y: 355,
        kind: 'land',
        coast: false,
        neighbors: ['Tri', 'Boh', 'Gal', 'Rum', 'Ser']
    },
    Wal:{
        name: 'Wales',
        id: 'Wal',
        x: 120,
        y: 280,
        kind: 'land',
        coast: true,
        neighbors: ['ENG', 'IRI', 'Lvp', 'Yor', 'Lon']
    },
    War:{
        name: 'Warsaw',
        id: 'War',
        x: 350,
        y: 310,
        kind: 'land',
        coast: false,
        neighbors: ['Sil', 'Pru', 'Lvn', 'Mos', 'Ukr', 'Gal']
    },
    WES:{
        name: 'Western Mediterranian',
        id: 'WES',
        x: 130,
        y: 500,
        kind: 'sea',
        coast: false,
        neighbors: ['LYO', 'TYS', 'Tun', 'Naf', 'MAO', 'Spa']
    },
    Yor:{
        name: 'Yorkshire',
        id: 'Yor',
        x: 150,
        y: 255,
        kind: 'land',
        coast: true,
        neighbors: ['NTH', 'Lon', 'Wal', 'Lvp', 'Edi']
    },
}