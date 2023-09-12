
export interface Itask{
    id:string
    name: string
    status: string
}

export interface ImapTaskAndColor{
    color:string
    mapTask: Itask[]
}
