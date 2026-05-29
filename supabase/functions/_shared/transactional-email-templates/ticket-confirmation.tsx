import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'RÉVÉLATION'

interface TicketLink {
  type: string
  url: string
}

interface TicketConfirmationProps {
  customerName?: string
  orderId?: string
  totalLabel?: string
  tickets?: TicketLink[]
}

const TICKET_LABELS: Record<string, string> = {
  demi_finale: 'Demi-finale',
  finale: 'Finale',
  forfait: 'Forfait (Demi-finale + Finale)',
}

const TicketConfirmationEmail = ({
  customerName,
  orderId,
  totalLabel,
  tickets = [],
}: TicketConfirmationProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Tes billets {SITE_NAME} sont prêts</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {customerName ? `Merci, ${customerName} !` : 'Merci pour ton achat !'}
        </Heading>
        <Text style={text}>
          Ta commande pour <strong>{SITE_NAME}</strong> est confirmée. Tu trouveras
          ci-dessous le lien vers chacun de tes billets — chaque billet contient
          un code QR unique à présenter à l'entrée.
        </Text>

        {orderId && (
          <Text style={meta}>
            Commande&nbsp;: <span style={mono}>{orderId}</span>
            {totalLabel ? ` · Total : ${totalLabel}` : ''}
          </Text>
        )}

        <Section style={ticketsBox}>
          <Heading as="h2" style={h2}>
            Tes billets ({tickets.length})
          </Heading>
          {tickets.map((ticket, i) => (
            <Section key={i} style={ticketRow}>
              <Text style={ticketType}>
                {TICKET_LABELS[ticket.type] || ticket.type}
              </Text>
              <Link href={ticket.url} style={button}>
                Télécharger le billet PDF
              </Link>
            </Section>
          ))}
        </Section>

        <Hr style={hr} />

        <Text style={text}>
          <strong>Important&nbsp;:</strong> conserve ce courriel. Tu peux aussi
          retrouver tes billets en tout temps dans la section{' '}
          <strong>Mon compte</strong> du site si tu as un compte associé à cette
          adresse courriel.
        </Text>

        <Text style={footer}>
          Une question&nbsp;? Réponds simplement à ce courriel.
          <br />
          L'équipe {SITE_NAME}
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: TicketConfirmationEmail,
  subject: 'Tes billets RÉVÉLATION sont prêts',
  displayName: 'Confirmation de billets',
  previewData: {
    customerName: 'Marie',
    orderId: 'ord_abc123',
    totalLabel: '26,00 $ CAD',
    tickets: [
      { type: 'demi_finale', url: 'https://example.com/ticket1.pdf' },
      { type: 'finale', url: 'https://example.com/ticket2.pdf' },
    ],
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  color: '#0a0a0a',
  margin: '0 0 20px',
}
const h2 = {
  fontSize: '16px',
  fontWeight: 'bold' as const,
  color: '#0a0a0a',
  margin: '0 0 16px',
}
const text = {
  fontSize: '15px',
  color: '#3f3f46',
  lineHeight: '1.6',
  margin: '0 0 18px',
}
const meta = {
  fontSize: '13px',
  color: '#71717a',
  margin: '0 0 24px',
}
const mono = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
}
const ticketsBox = {
  backgroundColor: '#faf7ef',
  border: '1px solid #e7d9b0',
  borderRadius: '8px',
  padding: '20px',
  margin: '12px 0 24px',
}
const ticketRow = {
  padding: '12px 0',
  borderBottom: '1px solid #ece4cf',
}
const ticketType = {
  fontSize: '14px',
  fontWeight: 'bold' as const,
  color: '#0a0a0a',
  margin: '0 0 8px',
}
const button = {
  display: 'inline-block',
  backgroundColor: '#b8923a',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  padding: '10px 18px',
  borderRadius: '6px',
}
const hr = {
  border: 'none',
  borderTop: '1px solid #e4e4e7',
  margin: '24px 0',
}
const footer = {
  fontSize: '13px',
  color: '#71717a',
  margin: '20px 0 0',
}
