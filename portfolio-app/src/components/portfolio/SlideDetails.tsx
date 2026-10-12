import type { SlideDetails as SlideDetailsData } from '../../data/portfolio';
import { cn } from '../../lib/utils';
import { Tag } from '../ui/Tag';

/** Body copy for a portfolio slide's modal: intro, bullet list (optionally with tool tags), outro. */
export function SlideDetails({ variant, intro, bullets, outro }: SlideDetailsData) {
  return (
    <>
      <p>{intro}</p>
      <ul className={cn('list-disc pl-6 text-white/80 marker:text-accent', variant === 'compact' ? 'mt-4 space-y-3' : 'mt-6 space-y-6')}>
        {bullets.map(({ title, text, tags }) => (
          <li key={title} className="pl-2">
            <strong>{title}</strong>
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
      {outro && <p className="mt-4">{outro}</p>}
    </>
  );
}
