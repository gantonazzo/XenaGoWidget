import {observable,action} from "mobx";


export class SelectionStore{

    static INSTANCE ;

    constructor() {
        SelectionStore.INSTANCE = this;
    }

    @observable selectedGeneSet;
    @observable hoveredGeneSet;
    @observable selectedGene;
    @observable hoveredGene;

    @action
    setSelectedGeneSet = (geneSet) =>{
      this.selectedGeneSet = geneSet
    };

    @action
    setHoveredGeneSet = (geneSet) =>{
        this.hoveredGeneSet = geneSet
    };

    @action
    setSelectedGene = (gene) =>{
        this.selectedGene = gene
    };

    @action
    setHoveredGene = (gene) =>{
        this.hoveredGene = gene
    };
}

export function getStore() {
    return SelectionStore.INSTANCE;
}