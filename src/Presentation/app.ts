import 'reflect-metadata';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';

import bootstrapper from '../Infra/CrossCutting/BootStrapper';
import TYPES from '../Infra/CrossCutting/Types';

import { MailService } from './../Application/Services/mail.service';
import { IMailService } from '../Application/Services/Interfaces/IMail.service';

if (process.env.NODE_ENV === 'development') {
  let logger = makeLoggerMiddleware();
  bootstrapper.applyMiddleware(logger);
}

const mailService = bootstrapper.get<IMailService>(TYPES.IMailService);

const app = () => {
  //Register services to run
  console.log(' [ * ] Initializing service...')
  mailService.ReceiveCallAndSendMailAsync();
}

export default app;