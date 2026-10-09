import { Mail, Instagram, Linkedin, Dribbble } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

// Placeholder details — swap these for Jack's real address and profiles.
const EMAIL = 'hello@example.com';

const SOCIALS = [
  { label: 'Email', href: `mailto:${EMAIL}`, Icon: Mail },
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'Dribbble', href: '#', Icon: Dribbble },
  { label: 'LinkedIn', href: '#', Icon: Linkedin },
];

const HAIRLINE = '1px solid rgba(215, 226, 234, 0.15)';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 md:pt-40 pb-10"
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
    >
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Contact
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.15}
          y={20}
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-center max-w-[480px]"
          style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
        >
          have a project in mind? let&apos;s build something striking and
          unforgettable together
        </FadeIn>

        <FadeIn delay={0.25} y={20}>
          <a
            href={`mailto:${EMAIL}`}
            className="text-[#D7E2EA] font-medium lowercase tracking-wide underline underline-offset-8 decoration-[#D7E2EA]/30 transition-opacity duration-200 hover:opacity-70"
            style={{ fontSize: 'clamp(1.1rem, 3vw, 2.5rem)' }}
          >
            {EMAIL}
          </a>
        </FadeIn>

        <FadeIn delay={0.35} y={20}>
          <ContactButton />
        </FadeIn>

        <FadeIn delay={0.45} y={20}>
          <ul className="flex items-center gap-3 sm:gap-4 list-none">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] w-12 h-12 sm:w-14 sm:h-14 transition-colors duration-300 hover:bg-[#D7E2EA]/10"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>

      <FadeIn
        delay={0}
        y={20}
        className="mt-20 sm:mt-24 md:mt-28 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#D7E2EA]/50 font-light uppercase tracking-widest text-xs sm:text-sm"
        style={{ borderTop: HAIRLINE }}
      >
        <span>&copy; {new Date().getFullYear()} Opivamp</span>
        <span>3D Creator</span>
      </FadeIn>
    </section>
  );
}
