import React, { useId, useRef, useState } from "react"

import styled from "styled-components"

import ArrowLink from "components/ArrowLink"
import MainButton from "components/MainButton"
import colors from "styles/colors"
import easing from "styles/easing"
import media from "styles/media"
import text, { fonts } from "styles/text"
import { useLang, useT } from "utils/i18n/useT"
import links, { whatsappLink } from "utils/links"

import useTurnstile from "./useTurnstile"

/** Espelha os ErrorCode da Pages Function em functions/api/contact.ts. */
type ErrorCode =
  | "invalid_json"
  | "invalid_name"
  | "invalid_email"
  | "invalid_message"
  | "captcha_failed"
  | "not_configured"
  | "send_failed"

type Status = "idle" | "sending" | "ok" | "error"

export default function Form() {
  const t = useT()
  const { lang } = useLang()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [company, setCompany] = useState("") // honeypot
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<ErrorCode | null>(null)

  const captcha = useRef<HTMLDivElement>(null)
  const { token, reset: resetCaptcha } = useTurnstile(captcha)

  // ids estáveis entre servidor e cliente, para ligar label a campo
  const uid = useId()
  const nameId = `${uid}-name`
  const emailId = `${uid}-email`
  const messageId = `${uid}-message`
  const feedbackId = `${uid}-feedback`

  /** Traduz o código devolvido pelo servidor. Nenhum texto nasce aqui. */
  const errorMessage = (code: ErrorCode): string => {
    switch (code) {
      case "invalid_name":
        return t.contactPage.errorName
      case "invalid_email":
        return t.contactPage.errorEmail
      case "invalid_message":
        return t.contactPage.errorMessage
      case "captcha_failed":
        return t.contactPage.errorCaptcha
      default:
        return t.contactPage.errorGeneric
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "sending") return

    setStatus("sending")
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          company,
          lang,
          turnstileToken: token,
        }),
      })

      const result = (await response.json()) as {
        ok?: boolean
        error?: ErrorCode
      }

      if (result.ok) {
        setStatus("ok")
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setStatus("error")
        setError(result.error ?? "send_failed")
      }
    } catch {
      // rede caiu, ou o endpoint não existe (é o caso de `npm run dev`, que não
      // executa Pages Functions: só `wrangler pages dev out` executa)
      setStatus("error")
      setError("send_failed")
    } finally {
      // o token do Turnstile é de uso único, então queima em qualquer desfecho
      resetCaptcha()
    }
  }

  return (
    <Wrapper>
      <Inner id="contact-form">
        <FormEl onSubmit={handleSubmit} noValidate>
          <Field>
            <Label htmlFor={nameId}>{t.contactPage.nameLabel}</Label>
            <Input
              id={nameId}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              placeholder={t.contactPage.namePlaceholder}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Field>

          <Field>
            <Label htmlFor={emailId}>{t.contactPage.emailLabel}</Label>
            <Input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={160}
              placeholder={t.contactPage.emailPlaceholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Field>

          <Field>
            <Label htmlFor={messageId}>{t.contactPage.messageLabel}</Label>
            <TextArea
              id={messageId}
              name="message"
              required
              rows={6}
              maxLength={5000}
              placeholder={t.contactPage.messagePlaceholder}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </Field>

          {/* honeypot: invisível e fora da ordem de tabulação, então só um bot
              preenche. O servidor descarta o envio quando vem preenchido. */}
          <Honeypot aria-hidden="true">
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
          </Honeypot>

          <Captcha ref={captcha} />

          <Actions>
            <MainButton
              darkBackground={false}
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? t.contactPage.sending
                : t.contactPage.submit}
            </MainButton>
          </Actions>

          {/* aria-live para que leitor de tela anuncie o desfecho do envio */}
          <Feedback id={feedbackId} role="status" aria-live="polite">
            {status === "ok" && <Success>{t.contactPage.success}</Success>}
            {status === "error" && error && <Failure>{errorMessage(error)}</Failure>}
          </Feedback>
        </FormEl>

        <Direct>
          <DirectTitle>{t.contactPage.directTitle}</DirectTitle>
          <DirectLinks>
            <a
              href={whatsappLink(t.contactPage.waMessage)}
              target="_blank"
              rel="noreferrer"
            >
              <ArrowLink darkText>{t.contactPage.whatsapp}</ArrowLink>
            </a>
            <a href={links.email}>
              <ArrowLink darkText>{links.emailAddress}</ArrowLink>
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              <ArrowLink darkText>{t.common.linkedin}</ArrowLink>
            </a>
          </DirectLinks>
        </Direct>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 140px 0 160px;
  ${media.desktop} {
    padding: 9.72vw 0 11.11vw;
  }
  ${media.tablet} {
    padding: 13.67vw 0 15.63vw;
  }
  ${media.mobile} {
    padding: 21.33vw 4vw 24vw;
  }
`

const Inner = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  ${media.fullWidth} {
    width: 1075px;
    gap: 90px;
  }
  ${media.desktop} {
    width: 74.65vw;
    gap: 6.25vw;
  }
  ${media.tablet} {
    width: 89.75vw;
    gap: 5.86vw;
  }
  ${media.mobile} {
    width: 92vw;
    flex-direction: column;
    gap: 16vw;
  }
`

const FormEl = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  gap: 28px;
  ${media.desktop} {
    gap: 1.94vw;
  }
  ${media.tablet} {
    gap: 2.73vw;
  }
  ${media.mobile} {
    width: 100%;
    gap: 6.4vw;
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
  ${media.desktop} {
    gap: 0.69vw;
  }
  ${media.tablet} {
    gap: 0.98vw;
  }
  ${media.mobile} {
    gap: 2.67vw;
  }
`

const Label = styled.label`
  ${text.sub3}
  color: ${colors.black400};
`

/* Estilo compartilhado por input e textarea. Fica numa string em vez de um
   componente base para não criar um wrapper a mais na árvore. */
const fieldStyle = `
  ${fonts.primary}
  ${text.bodyS}
  color: ${colors.mainBlack};
  background-color: transparent;
  border: 1px solid ${colors.white700};
  border-radius: 5px;
  width: 100%;
  transition: border-color 0.3s ${easing.main};

  &::placeholder {
    color: ${colors.black200};
    opacity: 0.7;
  }

  &:focus-visible {
    outline: none;
    /* accent500 não bate AA em traço fino sobre fundo claro, então o foco usa
       o accent700 da rampa */
    border-color: ${colors.accent700};
    box-shadow: 0 0 0 2px ${colors.accent200};
  }
`

const Input = styled.input`
  ${fieldStyle}

  padding: 16px 18px;
  ${media.desktop} {
    padding: 1.11vw 1.25vw;
  }
  ${media.tablet} {
    padding: 1.56vw 1.76vw;
  }
  ${media.mobile} {
    padding: 4.27vw 4.8vw;
  }
`

const TextArea = styled.textarea`
  ${fieldStyle}
  resize: vertical;
  min-height: 140px;

  padding: 16px 18px;
  ${media.desktop} {
    padding: 1.11vw 1.25vw;
  }
  ${media.tablet} {
    padding: 1.56vw 1.76vw;
  }
  ${media.mobile} {
    padding: 4.27vw 4.8vw;
    min-height: 37vw;
  }
`

/* Fora da tela, mas ainda preenchível por bot. display: none faria alguns bots
   pularem o campo, que é justamente o que não queremos. */
const Honeypot = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`

const Captcha = styled.div`
  /* fica vazio quando o script do Turnstile não carrega, e nesse caso não deve
     abrir um buraco no layout */
  &:empty {
    display: none;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
`

const Feedback = styled.div`
  ${text.bodyXS}

  /* line-height 100% dos tokens de texto corta descidas ("mensagem", "página"),
     então a caixa da mensagem de retorno ganha folga explícita */
  line-height: 140%;

  &:empty {
    display: none;
  }
`

const Success = styled.p`
  color: ${colors.accent800};
`

const Failure = styled.p`
  color: #a3221c;
`

const Direct = styled.div`
  display: flex;
  flex-direction: column;

  ${media.fullWidth} {
    width: 300px;
  }
  ${media.desktop} {
    width: 20.83vw;
  }
  ${media.tablet} {
    width: 24.41vw;
  }
  ${media.mobile} {
    width: 100%;
  }
`

const DirectTitle = styled.p`
  ${text.sub3}
  color: ${colors.black400};

  margin-bottom: 25px;
  ${media.desktop} {
    margin-bottom: 1.74vw;
  }
  ${media.tablet} {
    margin-bottom: 2.44vw;
  }
  ${media.mobile} {
    margin-bottom: 6.67vw;
  }
`

const DirectLinks = styled.div`
  ${text.sub3}
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 25px;
  ${media.desktop} {
    gap: 1.74vw;
  }
  ${media.tablet} {
    gap: 2.44vw;
  }
  ${media.mobile} {
    gap: 6.67vw;
  }
`
