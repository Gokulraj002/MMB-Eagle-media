import { useState } from 'react'
import Seo from '../components/seo/Seo'
import ContactSection from '../components/sections/ContactSection'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import SectionTitle from '../components/ui/SectionTitle'
import { site } from '../data/site'

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    // No endpoint configured yet → open the visitor's email app instead.
    if (!endpoint) {
      const body = `Name: ${data.name}%0D%0APhone: ${data.phone}%0D%0A%0D%0A${encodeURIComponent(data.message)}`
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(data.subject || 'Website enquiry')}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(res.statusText)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const field =
    'w-full border-b border-line bg-transparent py-4 text-[15px] text-bone placeholder:text-smoke focus:border-crimson focus:outline-none'

  return (
    <>
      <Seo title="Contact" />
      <PageHero kicker="Get in touch" title="Contact Us" image="premium-contact-v3" position="object-[28%_center]" />

      <section className="section-y bg-ink">
        <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-24">
          <div>
            <SectionTitle>
              Let's Create
              <br /> Together
            </SectionTitle>
            <p className="mt-8 max-w-sm text-[15px] leading-[1.85] text-mist">
              For film collaborations, events, talent enquiries or media requests, send us a message and our team will
              get back to you.
            </p>
          </div>

          <form onSubmit={onSubmit} className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            <input name="name" required placeholder="Your Name" className={field} autoComplete="name" />
            <input name="phone" type="tel" placeholder="Phone" className={field} autoComplete="tel" />
            <input name="email" type="email" required placeholder="Email" className={`${field} sm:col-span-2`} autoComplete="email" />
            <input name="subject" placeholder="Subject" className={`${field} sm:col-span-2`} />
            <textarea name="message" required rows={5} placeholder="Message" className={`${field} resize-none sm:col-span-2`} />
            <div className="mt-4 flex flex-wrap items-center gap-5 sm:col-span-2">
              <Button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </Button>
              {status === 'sent' && <p className="text-[13px] text-gold">Thank you – we'll be in touch soon.</p>}
              {status === 'error' && <p className="text-[13px] text-crimson">Something went wrong. Please email us directly.</p>}
            </div>
          </form>
        </div>
      </section>

      <ContactSection title="Visit Our Office" />
    </>
  )
}
