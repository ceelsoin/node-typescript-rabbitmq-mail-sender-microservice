import { inject as Inject, injectable as Injectable } from "inversify";
const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
require('dotenv').config()



import TYPES from "../../Infra/CrossCutting/Types";
import { IMailRepository } from "../../Infra/Repository/Interfaces/Imail.repository";


@Injectable()
export class MailService implements MailService {
    
    protected _mailRepository: IMailRepository;

    public transporter: any;

    constructor(
        @Inject(TYPES.IMailRepository) mailRepository: IMailRepository
    ) {
        this._mailRepository = mailRepository
    }

    public async ReceiveCallAndSendMailAsync(){
        console.log(" [ x ] ReceiveCallAndSendMailAsync service up!")

        amqp.connect('amqp://rabbitmq:rabbitmq@localhost:5672', function (err: any, conn: any) {
            conn.createChannel(function (err: any, ch: any) {
                var q = process.env.RABBIT_QUEUE;

                if(err){
                    console.log(err)
                }else{
                    ch.assertQueue(q, { durable: false });
                    ch.prefetch(1); //Select one untracked messege from queue
                    console.log(" [ * ] Waiting for messages in %s. To exit press CTRL+C", q);
                    ch.consume(q, function (msg: any) {
                        console.log(" [ x ] Received %s", msg.content.toString());
                    }, { noAck: true });
                }
            });
        });
    }


    public async sendMail(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, 
                pass: process.env.SMTP_PASS
            }
        });
    
    }
}