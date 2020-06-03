<h1 align="center" style="text-decoration:underline">Projecte M12 by lapineda201920</h1>

## Passos a seguir pel correcte funcionament


1. Descarreguem el següent programari (si no ho tenim prèviament descarregat):
- sudo apt install git
- sudo apt install npm
- sudo apt install mongodb

2. Descarreguem tot el projecte a local.
- Anem  a la carpeta on volem deixar la instal·lació. Fem:
	-  git clone git@github.com:lapineda201920/Projecte_M12.git .

3. Anem al terminal, hi fem:
- Primer fem:
	- mongo

- Un cop dins, crearem la BD on es guardaran les futures partides:
	- use laPinedaAdventure

- A continuació podem tancar el terminal.

4. Accediu a la carpeta ‘Joc’ i obrim un terminal, el qual executarem la següent comanda:
- npm run devStar

## Recorda: Perquè funcioni el projecte s'ha d'executar el punt 4 --> npm run devStar

5. Anem al buscador d'internet, i introduïm:
	- localhost:8080/index.html


I ja està!

## Recorda: Si al executar el joc, no mostra el mapa (tot negre), pot ser per la versió del Firefox que utilitzis. Obre una pestanya en Firefox, escriu: about:config. Prem el botó d'acceptar (color blau), i un cop dins escriu en el terminal: webgl. Per acabar, canvía els valors a 'true' de webgl.disabled i webgl.force-enabled.
