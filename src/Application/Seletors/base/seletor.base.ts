export class SelectorBase {
    public Pagina: number = 1;

    public RegistroPorPagina: number = 10;

    public OrderBy: string = 'Id';

    public OrderByOrder: string = 'ASC';

    public toOrderby(){
        if(this.OrderByOrder == "DESC")
        {
            this.OrderByOrder = "ASC";
        }else{
            this.OrderByOrder = "DESC";   
        }
    }
}