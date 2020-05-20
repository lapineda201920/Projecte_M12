class Professor {

  constructor(nom, preguntes, ajudes, respostes, xocaProfe, clauProfe) {

    this.nom = nom;
    this.preguntes = preguntes;
    this.ajudes = ajudes;
    this.respostes = respostes;
    this.xocaProfe = xocaProfe;
    this.clauProfe = clauProfe;
  }


  conversacioProfe() {

    informacioMoure.setVisible(false);
    resposta.text = this.nom + ": Bon dia!\n\n[Prem 'X' per continuar]";
    resposta.setVisible(true);

    // EL JUGADOR NO ES PODRÀ MOURE
    cursors.left = false;
    cursors.right = false;
    cursors.up = false;
    cursors.down = false;
  }


  continuacioConversacio() {

    // SI EL PROFESSOR JA HA ENTREGAT LA CLAU...
    if (this.clauProfe) {

      resposta.text = this.nom + ": Ja has anat al lavabo?";
    }
  }


  pregunta(contador) {

    resposta.text = this.nom + ": Unes preguntes ràpides:\n\n--> " + this.preguntes[contador] + "\n\n[" + this.ajudes[contador] + "]";
  }


  error() {

    resposta.text = this.nom + ": Doncs res...";
  }


  fiPreguntes() {

    sumarClaus(); // SUMEM UNA CLAU
    resposta.text = this.nom + ": Aquí tens la clau!\nPer cert, no tenies que anar al lavabo?";
  }
}
