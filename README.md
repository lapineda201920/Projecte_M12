<h1 align="center" style="text-decoration:underline">Projecte M12 by lapineda201920</h1>

## Pasos a seguir pel correcte funcionament (si tens docker-compose ja funcionant, fes el punt 1 i ves al punt 5 directament)


1. Descarreguem tot el projecte a local.
- Anem  a la carpeta on volem deixar la insta·lació. Fem:
	-  git clone git@github.com:lapineda201920/Projecte_M12.git .

2. Descarreguem el Docker:
- Primer de tot, anem a la consola i fem un update:
	- sudo apt-get update

- A continuació, anem a instal·lar el Docker:
	- sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys

- Agreguem el repositori Docker:
	- sudo apt-add-repository 'deb https_//apt.dockerproject.org/repo ubuntu-xenial main'

- Tornem a fer un update:
	- sudo apt-get update

- Comprobem que ens hem descarregat la última versió de Docker:
	- apt-cache policy docker-engine

- Instal·lem el Docker:
	- sudo apt-get install -y docker-engine


3. Descarreguem el Docker-Compose:
- Primer de tot, instal·lem el curl:
	- sudo apt install curl

- Un cop instal·lat  introduïm les seguents comandes:
	- sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	- sudo chmod +x /usr/local/bin/docker-compose

4. Aixequem els serveis de XAMP sobre Docker Compose
- Creem un directori on tenim pensat tenir el Servidor. Un cop fet, allà crearem un fitxer:
	- nano docker-compose.yml (En aquest fitxer introduïm el text del fitxer DOC/dc.txt)

- I per acabar fem:
	- sudo docker-compose up -d

## Recorda: Per a que funcioni el projecte s'ha d'executar el docker-compose --> sudo docker-compose up

5. Anem al buscador d'internet, i introduïm:
	- localhost/RUTA-DE-LES-CARPETES-ON-ESTÀ-EL-JOC/Joc/index.html (Ex: http://localhost/provaProjecteM12/Joc/index.html)


I ja està!

