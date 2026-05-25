import type { Post } from '../types/post'

type PostCardProps = {
  post: Post
}

const DEFAULT_POST_IMAGE = '/images/posts/default-return.svg'

function PostCard({ post }: PostCardProps) {
  const coverImage = post.images.find((image) => image.trim().length > 0) || DEFAULT_POST_IMAGE

  return (
    <article className="card-surface overflow-hidden">
      <img
        src={coverImage}
        alt={post.title}
        className="h-48 w-full border-b border-brand-navy/10 bg-brand-sand/45 object-contain"
        loading="lazy"
      />
      <div className="p-6">
        <p className="eyebrow-label text-brand-coral">{post.date}</p>
        <h3 className="mt-2 text-xl font-semibold text-brand-navy">{post.title}</h3>
        <p className="mt-3 leading-relaxed text-brand-muted">{post.excerpt}</p>
        {post.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-navy/10 bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default PostCard

