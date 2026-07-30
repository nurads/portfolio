import { useState } from "react";
import emailjs from "emailjs-com";
import {
  Button,
  Column,
  Grid,
  InlineNotification,
  TextArea,
  TextInput,
} from "@carbon/react";
import { Email, LogoGithub, LogoLinkedin, Send } from "@carbon/icons-react";
import { RevealOnScroll } from "../RevealOnScroll";

const EMAIL = "nuradhussen082@gmail.com";

const links = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: Email },
  {
    label: "GitHub",
    value: "github.com/nurads",
    href: "https://github.com/nurads",
    icon: LogoGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/murad-usman",
    href: "https://linkedin.com/in/murad-usman",
    icon: LogoLinkedin,
  },
];

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const EMPTY_FORM = { name: "", email: "", message: "" };

export const Contact = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const update = (field) => (event) =>
    setFormData((previous) => ({ ...previous, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    // Without EmailJS credentials the form would silently do nothing, so hand
    // the visitor off to their mail client instead.
    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        `Portfolio enquiry from ${formData.name}`
      )}&body=${encodeURIComponent(formData.message)}`;
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        formData,
        EMAILJS.publicKey
      );
      setStatus({ kind: "success", title: "Message sent. I'll be in touch." });
      setFormData(EMPTY_FORM);
    } catch {
      setStatus({
        kind: "error",
        title: "Could not send that.",
        subtitle: `Please email me directly at ${EMAIL}.`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section">
      <RevealOnScroll>
        <Grid className="section__grid">
          <Column sm={4} md={8} lg={16}>
            <p className="section__eyebrow">Contact</p>
            <h2 className="section__title">Get in touch</h2>
            <p className="section__lede">
              Open to backend and infrastructure work. Send a note and I will
              reply within a couple of days.
            </p>
          </Column>

          <Column sm={4} md={8} lg={9}>
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <TextInput
                  id="contact-name"
                  labelText="Name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={update("name")}
                />
              </div>

              <div className="contact__field">
                <TextInput
                  id="contact-email"
                  type="email"
                  labelText="Email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={update("email")}
                />
              </div>

              <div className="contact__field">
                <TextArea
                  id="contact-message"
                  labelText="Message"
                  placeholder="What are you working on?"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={update("message")}
                />
              </div>

              {status && (
                <InlineNotification
                  kind={status.kind}
                  title={status.title}
                  subtitle={status.subtitle}
                  lowContrast
                  onCloseButtonClick={() => setStatus(null)}
                />
              )}

              <Button type="submit" renderIcon={Send} disabled={sending}>
                {sending ? "Sending…" : "Send message"}
              </Button>
            </form>
          </Column>

          <Column sm={4} md={8} lg={6}>
            <div className="contact__links">
              {links.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  className="contact__link"
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                >
                  <span>
                    <span className="stats__label">{label}</span>
                    <br />
                    {value}
                  </span>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </Column>
        </Grid>
      </RevealOnScroll>
    </section>
  );
};
