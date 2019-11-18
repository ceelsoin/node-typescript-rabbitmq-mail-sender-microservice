import "reflect-metadata";
import { Container, injectable, decorate } from "inversify";

import TYPES from "./Types";

import { BaseRepository } from "../Repository/base/base.repository";

import { MailRepository } from "../Repository/mail.repository";
import { IMailRepository } from "../Repository/Interfaces/Imail.repository";

import { IMailService } from "../../Application/Services/Interfaces/IMail.service";
import { MailService } from "../../Application/Services/mail.service";

decorate(injectable(), BaseRepository);

var bootstrapper = new Container();

//Repository
bootstrapper.bind<IMailRepository>(TYPES.IMailRepository).to(MailRepository);

//Service
bootstrapper.bind<IMailService>(TYPES.IMailService).to(MailService);

export default bootstrapper;
