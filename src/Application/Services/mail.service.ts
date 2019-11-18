import { inject as Inject, injectable as Injectable } from "inversify";
const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
require('dotenv').config()



import TYPES from "../../Infra/CrossCutting/Types";
import { IMailRepository } from "../../Infra/Repository/Interfaces/Imail.repository";


@Injectable()
export class MailService implements MailService {
    
    protected _mailRepository: IMailRepository;  

    constructor(
        @Inject(TYPES.IMailRepository) mailRepository: IMailRepository
    ) {
        this._mailRepository = mailRepository
    }

    public async ReceiveCallAndSendMailAsync(){
        console.log(" [ x ] ReceiveCallAndSendMailAsync service up!");
        const _this = this;

        amqp.connect('amqp://rabbitmq:rabbitmq@localhost:5672', function (err: any, conn: any) {
            conn.createChannel(function (err: any, ch: any) {
                var q = process.env.RABBIT_QUEUE;
                if(err){
                    console.log(err)
                }else{
                    ch.assertQueue(q, { durable: false });
                    ch.prefetch(1); //Select one untracked messege from queue
                    console.log(" [ * ] Waiting for messages in %s. To exit press CTRL+C", q);
                    ch.consume(q, (msg: any) => {
                        console.log(" [ x ] Received %s", msg.content.toString());
                        let response: any = JSON.parse(msg.content.toString())
                        _this.sendMail(response.to, response.subject, response.message).then(success => {
                            console.log("[ x ] Message send successful")
                            // ch.ack(msg);
                        }).catch(err => {
                            console.log("[ x ] Message send error")
                            // ch.nack(msg);
                        })
                    }, { noAck: true });
                }
            });
        });
    }

    public sendMail(to: string, subject: string, message: string):Promise<any>{
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            // secure: process.env.SMTP_SECURE, //true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, 
                pass: process.env.SMTP_PASS
            },
            // tls: {
            //     // do not fail on invalid certs
            //     rejectUnauthorized: false
            //   }
        });
        return new Promise((resolve, reject) => {
            transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject,
                text: message,
            }, (err: any, info: any) => {
                console.log(info);
                    if(err){
                        console.error('[ x ] ', err.stack);
                        reject(false);
                    }else{
                        resolve(true);
                    }
            });
        })

    }
}