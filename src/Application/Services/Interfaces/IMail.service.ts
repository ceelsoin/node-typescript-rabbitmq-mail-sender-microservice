import { MailDomain } from "../../../Domain/mail.domain";

interface IMailService {
  ReceiveCallAndSendMailAsync(): any;
}
  
  export { IMailService };