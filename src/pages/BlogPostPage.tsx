import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, ArrowRight } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import SEO from '@/components/SEO';
import { fetchPost, fetchPosts, formatDate, estimateReadingTime, type BlogPost } from '@/lib/blogApi';

// Configure marked for clean output
marked.setOptions({
  breaks: true,
  gfm: true,
});

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await fetchPost(slug);
      if (!data) {
        navigate('/blog', { replace: true });
        return;
      }
      setPost(data);
      setLoading(false);

      // Load related posts
      const allPosts = await fetchPosts(1, 4);
      setRelatedPosts(allPosts.posts.filter((p) => p.slug !== slug).slice(0, 3));
    };
    loadPost();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: post?.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-40 md:pt-52">
        <div className="container max-w-3xl mx-auto px-6 md:px-12 animate-pulse space-y-6">
          <div className="h-4 bg-slate-100 rounded-full w-32" />
          <div className="h-10 bg-slate-100 rounded-2xl w-full" />
          <div className="h-10 bg-slate-100 rounded-2xl w-3/4" />
          <div className="flex gap-4 mt-6">
            <div className="h-3 bg-slate-100 rounded-full w-24" />
            <div className="h-3 bg-slate-100 rounded-full w-24" />
            <div className="h-3 bg-slate-100 rounded-full w-20" />
          </div>
          <div className="h-px bg-slate-100 my-8" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-50 rounded-full" style={{ width: `${75 + Math.random() * 25}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!post) return null;

  const htmlContent = DOMPurify.sanitize(marked.parse(post.content) as string);
  const readingTime = estimateReadingTime(post.content);
  const postUrl = `https://zendtpayments.com/blog/${post.slug}`;

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zendt Payments',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zendtpayments.com/logo-filled.png',
      },
    },
    datePublished: post.publishDate,
    dateModified: post.updatedAt,
    mainEntityOfPage: postUrl,
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SEO
        title={`${post.title} | Zendt Payments Blog`}
        description={post.metaDescription}
        url={postUrl}
        type="article"
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-36 pb-12 md:pt-48 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-30 -z-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/30 rounded-full blur-[140px] -z-10 mix-blend-multiply" />

        <div className="container max-w-3xl mx-auto px-6 md:px-12">
          {/* Back to blog */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors mb-8 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex flex-wrap gap-2 mb-5"
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-semibold"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-slate-900"
          >
            {post.title}
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-slate-400" />
              {post.author}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              {formatDate(post.publishDate)}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-slate-400" />
              {readingTime} min read
            </span>
          </motion.div>

          {/* Share */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6"
          >
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-500 hover:text-brand-600 hover:border-brand-200 hover:bg-brand-50 transition-all"
            >
              <Share2 size={14} />
              {copied ? 'Link copied!' : 'Share'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Article Body ──────────────────────────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-3xl mx-auto px-6 md:px-12">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </section>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div className="container max-w-3xl mx-auto px-6 md:px-12">
        <div className="h-px bg-slate-200" />
      </div>

      {/* ── Related Posts ─────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold">More from the blog</h2>
              <p className="text-slate-500 mt-2">Continue reading about freelancer finance and global payments.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related, i) => {
                const accents = [
                  { border: 'from-brand-500 to-indigo-500', tagBg: 'bg-brand-50', tagText: 'text-brand-600', tagBorder: 'border-brand-200' },
                  { border: 'from-violet-500 to-purple-500', tagBg: 'bg-violet-50', tagText: 'text-violet-600', tagBorder: 'border-violet-200' },
                  { border: 'from-indigo-500 to-blue-500', tagBg: 'bg-indigo-50', tagText: 'text-indigo-600', tagBorder: 'border-indigo-200' },
                ];
                const accent = accents[i % accents.length];

                return (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link to={`/blog/${related.slug}`} className="group block h-full">
                    <article className="h-full rounded-2xl border border-slate-200/80 bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1.5 transition-all duration-400 flex flex-col overflow-hidden">
                      {/* Gradient accent bar */}
                      <div className={`h-1.5 bg-gradient-to-r ${accent.border}`} />

                      <div className="p-6 flex-1 flex flex-col">
                        {/* Tags */}
                        {related.tags && related.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {related.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full ${accent.tagBg} ${accent.tagText} text-[10px] font-bold uppercase tracking-wider border ${accent.tagBorder}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                          <Calendar size={12} />
                          {formatDate(related.publishDate)}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2 flex-1">
                          {related.title}
                        </h3>

                        <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">
                          {related.metaDescription}
                        </p>

                        <div className="pt-4 border-t border-slate-100 mt-auto">
                          <span className="text-sm font-semibold text-brand-600 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                            Read article
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <section className="pb-20 md:pb-28">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-brand-600 to-indigo-600 rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-white active:text-white">
                Ready to go borderless?
              </h2>
              <p className="text-brand-100 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
                Join the waitlist and be among the first to experience the future of freelancer payments.
              </p>
              <Link
                to="/#pricing"
                className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-full text-base shadow-2xl hover:-translate-y-1 hover:shadow-white/30 transition-all active:scale-95 group"
              >
                Get Beta Access
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
