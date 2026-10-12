import type { SlideDetails as SlideDetailsData } from '../../data/portfolio';
import { cn } from '../../lib/utils';
import { Tag } from '../ui/Tag';

/** Body copy for a portfolio slide's modal: intro, bullet list (optionally with tool tags), outro. */
export function SlideDetails({ variant, intro, bullets, outro }: SlideDetailsData) {
  return (
    <>
      <p className="text-[1rem] leading-[1.75] text-ivory/75">{intro}</p>
      <ul className={cn('list-disc pl-5 text-[0.9375rem] leading-[1.7] text-ivory/70 marker:text-gold', variant === 'compact' ? 'mt-5 space-y-3' : 'mt-7 space-y-6')}>
        {bullets.map(({ title, text, tags }) => (
          <li key={title} className="pl-2">
            <strong className="font-semibold text-ivory">{title}</strong>
            {text && ` ${text}`}
            {tags && (
              <div className="flex flex-wrap gap-2 pt-3">
                {tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      {outro && <p className="mt-5 text-[1rem] leading-[1.75] text-ivory/75">{outro}</p>}
    </>
  );
}
