const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const parameters = require('../../config/parameters');
const localeConfig = require('../../config/locale');
// const helper = require('sendgrid').mail;

class Mailler {

  static async send(params) {
    if (localeConfig.DISABLED_EMAIL !== true) {
      const filePath = path.join(__dirname, 'templates', `${params.templateName}.tpl`);
      const source = fs.readFileSync(filePath, 'utf-8');
      const template = Handlebars.compile(source);
      const _body = template(params.bodyParams);

      // const fromEmail = new helper.Email('no-reply@invoice-timeline.co', 'Invoice Timeline');
      // const toEmail = new helper.Email(params.recipients[0].email);
      const subject = params.subject;
      // const content = new helper.Content('text/html', _body);
      // const mail = new helper.Mail(fromEmail, subject, toEmail, content);

      // const sg = require('sendgrid')(parameters.SENDRILL_API);
      const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      });

      sg.API(request, (error, response) => {
        if (error) {
          console.log('Error response received');
        }
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
      });
    }
    return true;
  }

  static async sendTemplate(params) {
    try {
      if (localeConfig.DISABLED_EMAIL !== true) {
        // const mail = new helper.Mail();
        // const fromEmail = new helper.Email('no-reply@invoice-timeline.co', 'Invoice Timeline');
        const subject = params.subject || ' ';
        // const toEmail = new helper.Email(params.recipients[0].email);
        // const content = new helper.Content('text/html', params.body || ' ');

        mail.setFrom(fromEmail);
        mail.setSubject(subject);
        mail.addContent(content);

        // const personalization = new helper.Personalization();
        personalization.addTo(toEmail);
        personalization.setSubject(params.subject || ' ');
        const bodyParams = params.bodyParams || {};
        const keys = Object.keys(bodyParams);
        for (let k = 0; k < keys.length; k++) {
          const key = keys[k].toUpperCase();
          const value = String(bodyParams[keys[k]]);
          // const substitution = new helper.Substitution(`*|${key}|*`, value);
          personalization.addSubstitution(substitution);
        }

        mail.addPersonalization(personalization);
        if (params.invoice) {
          // const attachment = new helper.Attachment();
          const file = fs.readFileSync(path.join(__dirname, '../../../public/files', `${params.invoice}`));
          const base64File = new Buffer(file).toString('base64');
          attachment.setContent(base64File);
          attachment.setType('application/pdf');
          attachment.setFilename(`Invoice Timeline - ${params.bodyParams.date}.pdf`);
          attachment.setDisposition('attachment');
          mail.addAttachment(attachment);
        }
        mail.template_id = params.template_id;
        // const sg = require('sendgrid')(parameters.SENDRILL_API);
        const request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

        sg.API(request, (error, response) => {
          if (error) {
            console.log('Error response received');
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
    // return true;
  }

  static async getAttachement(attachment) {
    const file = fs.readFileSync(path.join(__dirname, '../../../public/files', attachment));
    const content = new Buffer(file).toString('base64');
    const invoice = [{
      content,
      name: 'Facture.pdf',
      type: 'application/pdf'
    }];
    return invoice;
  }

  static async subscribe({ email, firstName, lastName }) {
    const mcReq = {
      id: parameters.MAILCHIMP_LIST_ID,
      email: { email },
      double_optin: false,
      update_existing: true,
      merge_vars: {
        EMAIL: email,
        FNAME: firstName,
        LNAME: lastName
      }
    };

    return new Promise((resolve, reject) => {
      // submit subscription request to mail chimp
      mailchimpClient.lists.subscribe(mcReq, resolve, (err) => {
        console.log(err);
        reject();
      });
    });
  }
}

module.exports = Mailler;
