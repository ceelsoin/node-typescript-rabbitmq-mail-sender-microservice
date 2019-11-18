import { MailDomain } from "../../../Domain/mail.domain";

interface IMailRepository {
    insertNewMail(mail: MailDomain): Promise<boolean>;
  }
  
  export { IMailRepository };