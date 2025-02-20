"use server";

import { cosmic } from "@/cosmic/client";
import { Resend } from "resend";
const RESEND_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "advipi.nuvem@gmail.com";
const resend = new Resend(RESEND_KEY);

export type AddSubmissionType = {
  type: "form-submissions";
  title: string;
  metadata: {
    email: string;
    company: string;
    message: string;
  };
};

export async function addSubmission(comment: AddSubmissionType) {
  const { metadata: metadata, title } = comment;
  const data = await cosmic.objects.insertOne(comment);
  const submitterSubject = `Envio de formulário recebido`;
  const submitterHTML = `
    Olá ${title},<br/><br/>
    Esta é uma mensagem para confirmar que recebemos o envio do seu formulário com as seguintes informações:<br/><br/>
    Nome: ${title}<br/>
    Email: ${metadata.email}<br/>
    Telefone: ${metadata.company}<br/>
    Mensagem: ${metadata.message}<br/>
    <br/>
    Um representante entrará em contato com você em breve.
  `;
  // Send confirmation email
  await sendEmail({
    to: metadata.email,
    from: CONTACT_EMAIL,
    reply_to: CONTACT_EMAIL,
    subject: submitterSubject,
    html: submitterHTML,
  });
  const adminSubject = `${title} enviou o formulário`;
  const adminHTML = `
    ${title} enviou o formulário de contato com as seguintes informações:<br/><br/>
    Nome: ${title}<br/>
    Email: ${metadata.email}<br/>
    Telefone: ${metadata.company}<br/>
    Mensagem: ${metadata.message}<br/>
  `;
  // Send email to admin
  await sendEmail({
    to: CONTACT_EMAIL,
    from: CONTACT_EMAIL,
    reply_to: metadata.email,
    subject: adminSubject,
    html: adminHTML,
  });
  return data;
}

async function sendEmail({
  from,
  to,
  subject,
  html,
  reply_to,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
  reply_to: string;
}) {
  const data = await resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo: reply_to,
  });
  return data;
}
