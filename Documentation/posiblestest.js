controlSC = () => {
    let territories = []
    const drawcountry = [];
    for(const country in datamap){
        datamap[country].sc && drawcountry.push(country);
    }
    drawcountry.map(territory=>territories.push(<SvgProxy key={territory} selector={'#'+territory} fill={countries['austria'].countrycol} stroke="black" />))
    return territories;
}