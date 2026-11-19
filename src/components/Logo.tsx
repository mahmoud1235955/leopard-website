import { Link } from '@tanstack/react-router';
import { useLanguage } from '@/i18n/LanguageContext';
import logoAsset from '@/assets/leopard-logo.png.asset.json';

interface LogoProps {
  /** Tailwind height class for the artwork. */
  className?: string;
  /** White plate behind the artwork so the navy lettering stays readable on dark surfaces. */
  chip?: boolean;
}

export function Logo({ className = 'h-14 sm:h-16', chip = false }: LogoProps) {
  const { t } = useLanguage();

  return (
    <Link
      to="/"
      aria-label={t.brand.name}
      className={chip ? 'inline-flex rounded-xl bg-white p-2 shadow-sm' : 'inline-flex'}
    >
      <img src={logoAsset.url} alt={t.brand.name} className={`w-auto ${className}`} />
    </Link>
  );
}
