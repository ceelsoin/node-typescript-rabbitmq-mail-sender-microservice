export class MailDomain{
    public id: string;
    public assunto: string;
    public body: string;

    /**
     * MailDomain
     * Sempre valide as informações com o valor ou null para evitar undefinied
     */
    constructor(data: any = {}) {

        if (data == null)
            data = {};

        this.id = data.id || null
        this.assunto = data.assunto || null
        this.body = data.body || null
    }
}