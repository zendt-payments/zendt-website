import { db } from './firebaseClient';
import {
  collection,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  startAfter,
  getDocs,
  getCountFromServer,
} from 'firebase/firestore';

// ── Types ────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  coverImageDescription: string | null;
  author: string;
  tags: string[];
  published: boolean;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
}

// ── Seed / demo data (when Firebase isn't configured) ────────
const DEMO_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How Freelancers Can Save 40% on International Payment Fees',
    slug: 'save-on-international-payment-fees',
    content: `# How Freelancers Can Save 40% on International Payment Fees

As a freelancer working with international clients, you've probably noticed that a significant portion of your hard-earned money disappears before it even hits your bank account. Between hidden exchange rate markups, wire transfer fees, and intermediary bank charges, it's not uncommon to lose **5-8%** of every payment.

## The Real Cost of Traditional Payment Methods

Let's break down what a typical $5,000 USD invoice looks like when received through traditional banking:

| Fee Type | Typical Cost |
|----------|-------------|
| Wire transfer fee | $25-50 |
| Exchange rate markup | 2-4% ($100-200) |
| Intermediary bank charges | $15-30 |
| Receiving bank fee | $10-25 |
| **Total lost** | **$150-305** |

That's up to **6% of your invoice** gone before you can spend a single rupee.

## A Better Way Forward

Modern fintech platforms like Zendt are changing this equation entirely. By leveraging direct currency corridors and competitive exchange rates, freelancers can reduce their payment processing costs by up to 40%.

### Key strategies to minimize fees:

1. **Use mid-market exchange rates** — Avoid platforms that add hidden markups to the exchange rate
2. **Batch your payments** — Consolidate multiple small invoices into fewer, larger transfers
3. **Choose the right payment corridor** — Some currency pairs have more competitive rates than others
4. **Negotiate payment currency** — Sometimes receiving in your client's local currency and converting yourself is cheaper

## The Bottom Line

Every percentage point you save on payment fees goes directly to your bottom line. For a freelancer earning $60,000/year internationally, switching to a modern payment solution could save **$1,500-3,000 annually**.

That's not just savings — that's your next vacation, your emergency fund, or your investment in growing your business.

---

*Zendt is building the financial operating system for global freelancers. [Join the waitlist](/) to be among the first to experience borderless payments.*`,
    metaDescription: 'Learn how freelancers can reduce cross-border payment fees by up to 40% using modern financial tools and smart strategies.',
    coverImageDescription: null,
    author: 'Zendt Team',
    tags: ['payments', 'freelancing', 'tips'],
    published: true,
    publishDate: '2026-04-05T10:00:00Z',
    createdAt: '2026-04-05T10:00:00Z',
    updatedAt: '2026-04-05T10:00:00Z',
  },
  {
    id: '2',
    title: "Understanding SWIFT vs. Modern Payment Rails: A Freelancer's Guide",
    slug: 'swift-vs-modern-payment-rails',
    content: `# Understanding SWIFT vs. Modern Payment Rails: A Freelancer's Guide

If you've ever received an international payment, you've likely encountered SWIFT — the global messaging network that banks use to send money across borders. But in 2026, SWIFT isn't the only game in town anymore.

## What is SWIFT?

SWIFT (Society for Worldwide Interbank Financial Telecommunication) is a messaging system that connects over 11,000 financial institutions worldwide. When your client sends a wire transfer, it travels through the SWIFT network, potentially passing through multiple intermediary banks before reaching you.

### The SWIFT process:
1. Client's bank sends payment instruction via SWIFT
2. Payment may route through 1-3 intermediary banks
3. Each intermediary deducts a fee
4. Your bank receives the payment and converts currency
5. Funds land in your account (2-5 business days later)

## Modern Payment Rails

New-generation payment platforms bypass much of this complexity by using:

- **Direct bank-to-bank corridors** — Eliminating intermediary banks entirely
- **Real-time settlement networks** — Payments arrive in hours, not days
- **Competitive FX markets** — Near mid-market exchange rates with transparent fees
- **API-first infrastructure** — Programmable payments for modern workflows

## Which Should You Choose?

| Feature | SWIFT | Modern Rails |
|---------|-------|-------------|
| Speed | 2-5 days | Hours to instant |
| Cost | $30-60+ per transfer | $5-15 per transfer |
| Exchange rate | Bank markup (2-4%) | Near mid-market (0.5-1%) |
| Tracking | Limited | Real-time |
| Minimum amount | Often $500+ | As low as $50 |

## The Future is Multi-Rail

The smartest approach isn't choosing one or the other — it's using a platform that automatically selects the best rail for each payment based on speed, cost, and corridor availability.

This is exactly what Zendt is building: an intelligent payment router that always finds the fastest, cheapest path for your money.

---

*Want to stop overpaying for international transfers? [Join the Zendt waitlist](/) and be among the first to experience the future of freelancer payments.*`,
    metaDescription: 'Compare SWIFT wire transfers with modern payment rails. Learn which option saves freelancers the most on international payments.',
    coverImageDescription: null,
    author: 'Zendt Team',
    tags: ['payments', 'education', 'technology'],
    published: true,
    publishDate: '2026-04-02T10:00:00Z',
    createdAt: '2026-04-02T10:00:00Z',
    updatedAt: '2026-04-02T10:00:00Z',
  },
  {
    id: '3',
    title: 'The Rise of the Global Freelancer Economy in 2026',
    slug: 'global-freelancer-economy-2026',
    content: `# The Rise of the Global Freelancer Economy in 2026

The freelancer economy isn't just growing — it's fundamentally reshaping how the world works. In 2026, an estimated **1.57 billion people** worldwide are freelancing, representing nearly half of the global workforce.

## Key Trends Shaping 2026

### 1. Cross-Border Work is the New Normal
Remote work has erased geographical boundaries. A designer in Mumbai can work with a startup in San Francisco, a developer in Lagos can build for a company in London.

### 2. India's Freelancer Boom
India has become one of the world's largest freelancer markets, with over **15 million active freelancers** in 2026. Key sectors include:
- Software Development
- Design & Creative
- Content & Marketing
- Data Science & AI

### 3. Payment Infrastructure is the Bottleneck
While talent can now flow freely across borders, money still can't. Freelancers report that **payment friction** is their #1 operational challenge:
- 67% have experienced payment delays of 7+ days
- 45% lose more than 5% per transaction to fees
- 38% have lost clients due to payment complications

## What Needs to Change

The freelancer economy needs financial infrastructure that matches its ambition:

1. **Instant settlements** — No more waiting 5 days for money to arrive
2. **Transparent pricing** — Know exactly what you'll receive before accepting a project
3. **Multi-currency accounts** — Hold, manage, and spend in multiple currencies
4. **Built-in compliance** — Automated tax reporting and regulatory compliance

## Building for the Future

At Zendt, we believe that financial infrastructure should empower freelancers, not hold them back. We're building the complete financial OS that the global freelancer economy deserves.

---

*The future of work is freelance. The future of freelance payments is Zendt. [Get early access](/).*`,
    metaDescription: 'Explore the explosive growth of the global freelancer economy in 2026 and why payment infrastructure is the biggest bottleneck.',
    coverImageDescription: null,
    author: 'Zendt Team',
    tags: ['freelancing', 'trends', 'industry'],
    published: true,
    publishDate: '2026-03-28T10:00:00Z',
    createdAt: '2026-03-28T10:00:00Z',
    updatedAt: '2026-03-28T10:00:00Z',
  },
];

// ── Fetch helpers ────────────────────────────────────────────

export async function fetchPosts(
  page: number = 1,
  pageSize: number = 9
): Promise<BlogListResponse> {
  // Fallback to demo data if Firebase isn't configured
  if (!db) {
    const start = (page - 1) * pageSize;
    const paginatedPosts = DEMO_POSTS.slice(start, start + pageSize);
    return {
      posts: paginatedPosts,
      total: DEMO_POSTS.length,
      page,
      totalPages: Math.ceil(DEMO_POSTS.length / pageSize),
    };
  }

  const postsRef = collection(db, 'blog_posts');

  // Get total count of published posts
  const countQuery = query(postsRef, where('published', '==', true));
  const countSnap = await getCountFromServer(countQuery);
  const total = countSnap.data().count;

  // Build paginated query
  let postsQuery = query(
    postsRef,
    where('published', '==', true),
    orderBy('publishDate', 'desc'),
    firestoreLimit(pageSize)
  );

  // For pages > 1, we need to skip previous entries
  if (page > 1) {
    const skipQuery = query(
      postsRef,
      where('published', '==', true),
      orderBy('publishDate', 'desc'),
      firestoreLimit((page - 1) * pageSize)
    );
    const skipSnap = await getDocs(skipQuery);
    const lastDoc = skipSnap.docs[skipSnap.docs.length - 1];
    if (lastDoc) {
      postsQuery = query(
        postsRef,
        where('published', '==', true),
        orderBy('publishDate', 'desc'),
        startAfter(lastDoc),
        firestoreLimit(pageSize)
      );
    }
  }

  const snap = await getDocs(postsQuery);
  const posts: BlogPost[] = snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as BlogPost[];

  return {
    posts,
    total,
    page,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function fetchPost(slug: string): Promise<BlogPost | null> {
  if (!db) {
    return DEMO_POSTS.find((p) => p.slug === slug) ?? null;
  }

  const postsRef = collection(db, 'blog_posts');
  const q = query(
    postsRef,
    where('slug', '==', slug),
    where('published', '==', true),
    firestoreLimit(1)
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;

  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as BlogPost;
}

// ── Utilities ────────────────────────────────────────────────

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}
