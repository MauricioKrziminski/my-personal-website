/**
 * Endereços externos do site.
 *
 * O email fica numa constante única porque já esteve escrito em três lugares
 * (aqui, e nos dois dicionários de strings.ts), o que obrigava a lembrar dos
 * três para trocar de endereço. Endereço não é texto traduzível.
 *
 * Nota: são dois "i" em "krziminskii" no email, e um só no handle das redes.
 * É assim mesmo, não "corrigir".
 */
const emailAddress = "mauricio.krziminskii@gmail.com"

const links = {
  github: "https://github.com/MauricioKrziminski",
  linkedin: "https://www.linkedin.com/in/mauriciokrziminski/",
  /** o endereço puro, para exibir como texto */
  emailAddress,
  /** o mesmo endereço como href */
  email: `mailto:${emailAddress}`,
  /**
   * Base do link do WhatsApp, sem a mensagem pré-preenchida: o texto do `?text=`
   * é bilíngue e vem do i18n, então quem monta o link final é o componente, via
   * o helper whatsappLink() abaixo.
   */
  whatsapp: "https://wa.me/5551992553295",
}

/** Monta o link do WhatsApp com a mensagem de abertura já preenchida. */
export function whatsappLink(message: string): string {
  return `${links.whatsapp}?text=${encodeURIComponent(message)}`
}

export default links
