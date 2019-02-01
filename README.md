# Atomic Diplomacy by Veenders

## Introduction

Puedes ver el proyecto en [diplomacy.veenders.com](https://diplomacy.veenders.com)

### Diplomacy Game

>Diplomacy is a strategic board game created by Allan B. Calhamer in 1954 and released commercially in 1959.[1] Its main distinctions from most board wargames are its negotiation phases (players spend much of their time forming and betraying alliances with other players and forming beneficial strategies)[2] and the absence of dice and other game elements that produce random effects. Set in Europe in the years leading to the Great War, Diplomacy is played by two to seven players,[3] each controlling the armed forces of a major European power (or, with fewer players, multiple powers). Each player aims to move his or her few starting units and defeat those of others to win possession of a majority of strategic cities and provinces marked as "supply centers" on the map; these supply centers allow players who control them to produce more units. Following each round of player negotiations, each player can issue attack orders and take control of a neighboring province when the number of provinces adjacent to the attacking province that are given orders (written down and declared in advance) to support the attacking province exceeds the number of provinces adjacent to the province under attack that are given orders to support the province under attack.

>Diplomacy was the first commercially published game to be played by mail (PBM); only chess, which is in the public domain, saw significant postal (long distance) play earlier. Diplomacy was also the first commercially published game to generate an active hobby scene with amateur fanzines; only science-fiction, fantasy and comics fandom saw fanzines earlier. Competitive face-to-face Diplomacy tournaments have been held since the 1970s. Play of Diplomacy by e-mail (PBEM) has been widespread since the late 1980s.[4]

>Diplomacy has been published in the United States by Games Research, Avalon Hill, and Hasbro; the name is currently a registered trademark of Hasbro's Avalon Hill division. Diplomacy has also been licensed to various companies for publication in other countries. Diplomacy is also played on the Internet, adjudicated by a computer or a human gamemaster.

English Wikipedia entry about [Diplomacy Game](https://en.wikipedia.org/wiki/Diplomacy_(game))

### This Project

Llevo jugando a juegos de mesa y a rol des de que tenia 14 años, por el contrario los juegos de ordenador nunca me han acabado de enganchar, supongo que el ser patos es lo que tiene, ahora en serio, la realidad es que la interacción social que se produce en un juego de mesa con todos tus amigos alrededor es difícil de simular en una pantalla de ordenador.

Con ciertos amigos, debido a la distància a que con el tiempo las obligaciones familiares eran cada vez más nombrosas y que por tanto era cada vez más difícil quedar empezamos a jugar a ciertos juegos a través de sistema por correo electrónico [(Cyberboard)](https://cyberboard.brainiac.com/) era una forma divertida de mantener el contacto y combinado con el whatsapp y los sistemas de mensajeria hacía que fuese divertido tener contacto y volver a jugar.

En este sistema teniamos juegos como el Necromancer, el Diplomacy o el Game of Thrones, los cuales combinan con estos sistemas de Juego por Correo ya que no hay casi nada de aleatoriedad en su funcionamiento.

Es por ello que cuando en el curso de desarrollo FrontEnd de Skylab tubimos que escoger un proyecto, crei que la opción que más me gustaria seria poder desarrollar un sistema para poder jugar con los amigos a estos juegos.

Inicialmente la elección fue el juego de Tronos, ya que ya había hecho un desarrollo previo y me sentia familiarizado, però en la reunión de orientación del proyecto vimos que al final tenía muchos pequeños componentes que serian repetitivos desarrollar, por lo que no aportavan valor, a la vez que iban a restar tiempo al proyecto. Es por ello que ahí decidimos cambiar al Diplomacy, un juego más simple en el funcionamiento, aunque más complejo en la algoritmica de juego (lástima que me di cuenta a mitad de proyecto)

## Descripción Funcional

Cuando el usuario entra en la pàgina se le ofrecen las opciones de buscar una partida o crear una nueva pensando en minimizar la navegación del usuario que ya sabe de que va y viene a jugar. Para el que no esta acostumbrado se le ofrece el menú en la parte derecha con la opción de visitar el Blog, Ver las Reglas o los Juegos en marcha. También en el menú tiene la opción de entrar en la aplicación.

Si accede a las partidas puede ver la información bàsica de las mismas, però si quiere entrar en una partida o crear una el sistema le muestra la pantalla de login, Desde dónde puede registrar-se en caso de no tener cuenta.

Una vez realizado el login me aparecen las partidas que yo he creado o que estoy apuntando junto con las partidas abiertas. allí puedo apuntar-me a cualquier partida, poniendo el codigo de ingreso si el usuario que la creo así lo definió i puedo acceder a las partidas que estoy jugando.

#### Diagrama Funcional
![Diagrama Funcional]()