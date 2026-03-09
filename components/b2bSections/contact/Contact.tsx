import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { HighlightedHeading } from '@/components/HighlightedHeading';
import ContactForm from '@/components/ContactForm';
import { Parallax } from '@/components/Parallax';

export const Contact = () => {
  const t = useTranslations('Contact');

  const contactData = {
    heading: t('heading'),
    subheading: t('subheading'),
    image: {
      src: t('image.src'),
      alt: t('image.alt'),
    },
  };

  return (
    <Parallax speed={0.03}>
      <section
        className="w-full flex md:px-relaxed md:py-relaxed px-tight mx-auto items-center justify-center"
        id="contact-us"
      >
        {/* Content */}
        <div className="w-full max-w-[1248px] flex flex-col lg:flex-row md:flex-col lg:gap-8 gap-0 items-center justify-center">
          {/* Column 1 */}
          <div className="flex-1 flex flex-col w-full h-full ">
            <Image
              src={contactData.image.src}
              alt={contactData.image.alt}
              width={1440}
              height={1080}
              className="w-full h-auto object-contain scale-[0.8] translate-y-2 md:scale-[0.6] md:translate-y-16 lg:scale-[1] md:translate-y-18"
            />
          </div>

          {/* Column 2 */}
          <div className="flex-1 flex flex-col bg-gradient-to-r from-white to-[#E4F7FF]/60 rounded-2xl p-8 md:py-16 md:px-12 justify-center items-center text-center gap-8">
            <div className="flex flex-col gap-2 items-center justify-center">
                <HighlightedHeading
                  text={contactData.heading}
                  className="font-heading text-h4 text-center lg:max-w-[400px] md:max-w-[450px] max-w-[300px]"
                />
                <p className="text-body">
                  {contactData.subheading}
                </p>
              </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Parallax>
  );
};

export default Contact;
