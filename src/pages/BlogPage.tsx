import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, BookOpen, Search } from 'lucide-react';
import SEO from '@/components/SEO';
import { fetchPosts, formatDate, estimateReadingTime, type BlogPost } from '@/lib/blogApi';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const data = await fetchPosts(page, 9);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setLoading(false);
    };
    loadPosts();
  }, [page]);

  const filteredPosts = searchQuery
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : posts;

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SEO
        title="Blog | Zendt Payments — Insights for Global Freelancers"
        description="Expert insights on international payments, freelancer finance, cross-border banking, and building a borderless career. Stay ahead with Zendt."
        url="https://zendtpayments.com/blog"
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-40 pb-16 md:pt-52 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-40 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-200/30 rounded-full blur-[160px] -z-10" />
        <div className="container max-w-6xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-sm font-semibold mb-8"
          >
            <BookOpen size={15} />
            Insights & Resources
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            The Zendt{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-500">
              Blog
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Expert insights on international payments, freelancer finance, and building a borderless career.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 max-w-lg mx-auto relative"
          >
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all shadow-sm text-sm"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Posts Grid ─────────────────────────────────────────── */}
      <section className="pb-20 md:pb-28">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          {loading ? (
            /* Skeleton Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-slate-200 overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-slate-100" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-slate-100 rounded-full w-1/3" />
                    <div className="h-5 bg-slate-100 rounded-full w-full" />
                    <div className="h-5 bg-slate-100 rounded-full w-2/3" />
                    <div className="h-3 bg-slate-100 rounded-full w-full" />
                    <div className="h-3 bg-slate-100 rounded-full w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            /* Empty state */
            <motion.div {...fadeUp} className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
                <Search size={24} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No articles found</h3>
              <p className="text-slate-500">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : 'New articles are on the way. Check back soon!'}
              </p>
            </motion.div>
          ) : (
            <>
              {/* Featured Post (first post, page 1 only) */}
              {filteredPosts.length > 0 && !searchQuery && page === 1 && (
                <motion.div {...fadeUp} className="mb-10">
                  <Link to={`/blog/${filteredPosts[0].slug}`} className="group block">
                    <div className="relative rounded-3xl border border-slate-200 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-600/20 to-indigo-600/10" />
                      <div className="relative p-8 md:p-12 lg:p-16">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          <span className="px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
                            Featured
                          </span>
                          <span className="flex items-center gap-1.5 text-white/60 text-xs">
                            <Calendar size={12} />
                            {formatDate(filteredPosts[0].publishDate)}
                          </span>
                          <span className="flex items-center gap-1.5 text-white/60 text-xs">
                            <BookOpen size={12} />
                            {estimateReadingTime(filteredPosts[0].content || '')} min read
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white group-hover:text-brand-300 transition-colors max-w-3xl">
                          {filteredPosts[0].title}
                        </h2>
                        <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-8">
                          {filteredPosts[0].metaDescription}
                        </p>
                        <div className="inline-flex items-center gap-2 text-brand-400 font-semibold group-hover:gap-3 transition-all">
                          Read Article
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {(searchQuery || page !== 1 ? filteredPosts : filteredPosts.slice(1)).map(
                  (post, i) => {
                    // Unique gradient palettes per card
                    const palettes = [
                      { bg: 'from-brand-500/10 via-violet-500/10 to-indigo-500/10', accent: 'bg-brand-500', iconBg: 'bg-brand-100', iconColor: 'text-brand-500', ring: 'ring-brand-200/50' },
                      { bg: 'from-indigo-500/10 via-blue-500/10 to-violet-500/10', accent: 'bg-indigo-500', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', ring: 'ring-indigo-200/50' },
                      { bg: 'from-violet-500/10 via-purple-500/10 to-fuchsia-500/10', accent: 'bg-violet-500', iconBg: 'bg-violet-100', iconColor: 'text-violet-600', ring: 'ring-violet-200/50' },
                      { bg: 'from-purple-500/10 via-fuchsia-500/10 to-pink-500/10', accent: 'bg-purple-500', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', ring: 'ring-purple-200/50' },
                      { bg: 'from-slate-500/10 via-indigo-500/10 to-brand-500/10', accent: 'bg-slate-600', iconBg: 'bg-slate-100', iconColor: 'text-slate-600', ring: 'ring-slate-200/50' },
                      { bg: 'from-fuchsia-500/10 via-brand-500/10 to-indigo-500/10', accent: 'bg-fuchsia-500', iconBg: 'bg-fuchsia-100', iconColor: 'text-fuchsia-600', ring: 'ring-fuchsia-200/50' },
                    ];
                    const palette = palettes[i % palettes.length];

                    return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                      <Link to={`/blog/${post.slug}`} className="group block h-full">
                        <article className="h-full rounded-3xl border border-slate-200/80 overflow-hidden bg-white hover:shadow-2xl hover:shadow-brand-500/5 hover:-translate-y-1.5 transition-all duration-400 flex flex-col">
                          {/* Card Header / Cover */}
                          <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${palette.bg}`}>
                            {/* Abstract geometric shapes */}
                            <div className="absolute inset-0">
                              <div className={`absolute top-6 right-6 w-24 h-24 rounded-3xl ${palette.iconBg} opacity-60 rotate-12 group-hover:rotate-[24deg] transition-transform duration-500`} />
                              <div className={`absolute bottom-8 left-8 w-16 h-16 rounded-full ${palette.iconBg} opacity-40 group-hover:scale-110 transition-transform duration-500`} />
                              <div className={`absolute top-12 left-1/3 w-10 h-10 rounded-xl ${palette.iconBg} opacity-30 -rotate-6`} />
                            </div>
                            {/* Center icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className={`w-16 h-16 rounded-2xl ${palette.iconBg} ring-4 ${palette.ring} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <BookOpen size={24} className={palette.iconColor} />
                              </div>
                            </div>
                            {/* Accent bar */}
                            <div className={`absolute top-0 left-0 w-full h-1 ${palette.accent} opacity-80`} />
                            {/* Tags overlay */}
                            {post.tags && post.tags.length > 0 && (
                              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                                {post.tags.slice(0, 2).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-slate-700 text-[11px] font-bold uppercase tracking-wide border border-white/50 shadow-sm"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Card Body */}
                          <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                              <span className="flex items-center gap-1.5">
                                <Calendar size={12} />
                                {formatDate(post.publishDate)}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-slate-200" />
                              <span className="flex items-center gap-1.5">
                                <User size={12} />
                                {post.author}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>

                            <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">
                              {post.metaDescription}
                            </p>

                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                                <BookOpen size={12} />
                                {estimateReadingTime(post.content || '')} min read
                              </span>
                              <span className="text-sm font-semibold text-brand-600 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                Read
                                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  );
                  }
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && !searchQuery && (
                <motion.div {...fadeUp} className="mt-14 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                        p === page
                          ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                          : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CTA Strip ─────────────────────────────────────────── */}
      <section className="pb-20 md:pb-28">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            {...fadeUp}
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

export default BlogPage;
