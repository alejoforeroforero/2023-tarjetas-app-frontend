class Card{
    info;
    on = true;

    pintar(el){
        const divC = tag('div', el);
        divC.className = 'card'

        this.infoCard = tag('div', divC);
        this.infoCard.className = 'info';

        this.infoSpan = tag('span', this.infoCard);
        this.infoSpan.innerHTML = '&#9998;';
        this.infoSpan.addEventListener('click', ()=>{
            pintarFormulario(this.info);
        })

        this.divF = tag('div', divC);
        this.divF.className = 'card-front';

        this.divFTxt = tag('div', this.divF);
        this.divFTxt.innerHTML = this.info.anverso;
        this.divFTxt.addEventListener('click', ()=>{
            this.conmutarCard();
        })

        this.divB = tag('div', divC);
        this.divB.className = 'card-back';
        this.divB.innerHTML = this.info.reverso;
        this.divB.addEventListener('click', ()=>{
            this.conmutarCard();
        })

        this.conmutarCard();
    }

    conmutarCard(){
        if(!this.on){
            this.divB.style.visibility = 'visible';
            this.divF.style.visibility = 'hidden';
            this.on = true;

        }else{
            this.divB.style.visibility = 'hidden';
            this.divF.style.visibility = 'visible';
            this.on = false;
        }
    }
}