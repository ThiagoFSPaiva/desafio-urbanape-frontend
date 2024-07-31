export type Card = {
    id: string,
    name: string,
    number: string,
    type: "TRABALHADOR" | "COMUM" | "ESTUDANTE"
    status: boolean
}

export type CardCreation = {
    name: string,
    type: "TRABALHADOR" | "COMUM" | "ESTUDANTE";
}