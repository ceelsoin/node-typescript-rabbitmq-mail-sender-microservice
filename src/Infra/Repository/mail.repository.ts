import { MailDomain } from './../../Domain/mail.domain';
import { BaseRepository } from "./base/base.repository";
import { injectable } from "inversify";
import { IMailRepository } from './Interfaces/Imail.repository';

@injectable()
export class MailRepository extends BaseRepository<MailDomain> implements IMailRepository{
    insertNewMail(mail: MailDomain): Promise<boolean>{
        console.log('called')
        return this.create(mail);
    }
}