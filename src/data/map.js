export default {
    NWG:{
        name:'Norwegian Sea',
        id: 'NWG',
        x:220,
        y:60,
        kind: 'sea',
        coast: false,
        neighbors: ['NAO','Cly','Edi','NTH','Nwy','BAR']
    },
    NTH:{
        name: 'North Sea',
        id: 'NTH',
        x: 190,
        y: 60,
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
        y: 500,
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
        x: 500,
        y: 445,
        kind: 'land',
        coast: true,
        neighbors: ['BLA','Arm','Smy','Con']
    },

}