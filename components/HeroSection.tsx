import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

const steps = [
  { number: 1, title: "Upload PDF", description: "Add your book file" },
  { number: 2, title: "AI Processing", description: "We analyze the content" },
  { number: 3, title: "Voice Chat", description: "Discuss with AI" },
];

const HeroSection = () => {
  return (
    <section className="library-hero-card mb-8 md:mb-12">
      <div className="library-hero-content">
        {/* Left – Heading, description, CTA */}
        <div className="library-hero-text">
          <h1 className="library-hero-title">Your Library</h1>
          <p className="library-hero-description">
            Convert your books into interactive AI conversations. Listen, learn,
            and discuss your favorite reads.
          </p>

          {/* Mobile illustration */}
          <div className="library-hero-illustration">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books, globe and lamp"
              width={280}
              height={210}
              className="object-contain w-auto"
              priority
            />
          </div>

          <Link href="/books/new" className="library-cta-primary">
            <Plus className="w-5 h-5" />
            Add new book
          </Link>
        </div>

        {/* Center – Illustration (desktop only) */}
        <div className="library-hero-illustration-desktop">
          <Image
            src="/assets/hero-illustration.png"
            alt="Vintage books, globe and lamp"
            width={340}
            height={255}
            className="object-contain w-auto"
            priority
          />
        </div>

        {/* Right – Steps card */}
        <div className="library-steps-card">
          <div className="flex flex-col gap-4">
            {steps.map(({ number, title, description }) => (
              <div key={number} className="library-step-item">
                <span className="library-step-number">{number}</span>
                <div>
                  <p className="library-step-title">{title}</p>
                  <p className="library-step-description">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
