import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

const blogArticles = [
  {
    id: 1,
    title: "Complete Guide to Airbnb Investing in Montreal 2025",
    category: "Investment Guide",
    date: "January 15, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    excerpt: "Everything you need to know about starting your Airbnb investment journey in Montreal, from regulations to profitability.",
    content: {
      intro: "Montreal's short-term rental market offers lucrative opportunities for savvy investors. This comprehensive guide covers everything you need to succeed.",
      sections: [
        {
          title: "Understanding Montreal's Airbnb Regulations",
          content: "Montreal has specific regulations for short-term rentals. You must obtain a CITQ permit, register with the city, and comply with zoning laws. Primary residences have different rules than secondary properties."
        },
        {
          title: "Best Neighborhoods for Airbnb Investment",
          content: "The Plateau, Old Montreal, Downtown, and Mile End consistently show high occupancy rates and strong nightly rates. Each neighborhood has unique characteristics that attract different types of guests."
        },
        {
          title: "Expected Returns and Profitability",
          content: "Based on our analysis of 8,518+ listings, Montreal Airbnb properties can generate 8-15% cash-on-cash returns. Location, property size, and management quality significantly impact results."
        },
        {
          title: "Startup Costs and Budgeting",
          content: "Plan for down payment (20%), closing costs (3%), furnishing ($15,000-$25,000), and operational reserves. First-year costs typically range from $120,000-$150,000 for a two-bedroom condo."
        }
      ]
    }
  },
  {
    id: 2,
    title: "Top 5 Mistakes Montreal Airbnb Investors Make (And How to Avoid Them)",
    category: "Investment Tips",
    date: "January 12, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    excerpt: "Learn from common mistakes to maximize your Airbnb investment returns and avoid costly errors in the Montreal market.",
    content: {
      intro: "Even experienced real estate investors make mistakes when entering the short-term rental market. Here are the top pitfalls to avoid.",
      sections: [
        {
          title: "1. Underestimating Operating Expenses",
          content: "Many new investors focus only on mortgage costs and forget about utilities, cleaning, maintenance, platform fees, and property management. These can easily consume 30-40% of gross revenue."
        },
        {
          title: "2. Ignoring Seasonal Fluctuations",
          content: "Montreal has distinct seasons affecting demand. Summer (June-August) and festival seasons see peak rates, while January-March can be slower. Budget for the full year, not just peak months."
        },
        {
          title: "3. Poor Property Management",
          content: "DIY management can save money but often leads to lower occupancy and worse reviews. Professional management (15-25% of revenue) often pays for itself through higher rates and better guest experiences."
        },
        {
          title: "4. Not Optimizing for Search Rankings",
          content: "Professional photos, detailed descriptions, instant booking, and flexible cancellation policies dramatically improve visibility on Airbnb. The top-ranked listings get 3-5x more bookings."
        },
        {
          title: "5. Neglecting Legal Compliance",
          content: "Operating without proper permits can result in fines up to $50,000. Always obtain CITQ registration, city permits, and proper insurance before listing your property."
        }
      ]
    }
  },
  {
    id: 3,
    title: "Montreal Airbnb Market Analysis: Winter 2025 Report",
    category: "Market Analysis",
    date: "January 8, 2025",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&q=80",
    excerpt: "Deep dive into current market trends, occupancy rates, and revenue data across Montreal's neighborhoods.",
    content: {
      intro: "Our latest market analysis reveals shifting trends in Montreal's short-term rental landscape. Here's what investors need to know.",
      sections: [
        {
          title: "Overall Market Performance",
          content: "Montreal Airbnb listings averaged 68% occupancy in 2024, with average nightly rates of $135. Revenue per available room (RevPAR) increased 12% year-over-year despite increased supply."
        },
        {
          title: "Top Performing Neighborhoods",
          content: "Old Montreal leads with $175 average nightly rate and 72% occupancy. The Plateau follows at $145/night with 70% occupancy. Downtown shows highest volume but lower per-unit profitability."
        },
        {
          title: "Emerging Opportunities",
          content: "Mile End and Little Italy show strong growth potential with 15-20% year-over-year increases in demand. These neighborhoods offer better value for entry-level investors."
        },
        {
          title: "2025 Forecast",
          content: "We project 5-8% growth in average daily rates driven by increased tourism and business travel. However, new regulation enforcement may reduce overall supply, benefiting compliant hosts."
        }
      ]
    }
  },
  {
    id: 4,
    title: "Furnishing Your Montreal Airbnb: A Budget-Friendly Guide",
    category: "Property Setup",
    date: "January 5, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    excerpt: "Complete checklist and budget breakdown for furnishing an Airbnb property in Montreal, from IKEA essentials to must-have amenities.",
    content: {
      intro: "Smart furnishing can dramatically impact your listing's success while staying within budget. Here's our proven approach.",
      sections: [
        {
          title: "Essential Furniture ($8,000-$12,000)",
          content: "Quality bed and mattress ($1,500), sofa and coffee table ($1,800), dining table and chairs ($900), bedroom storage ($600), and basic kitchen appliances ($2,500). IKEA and Wayfair offer great value for rental properties."
        },
        {
          title: "Kitchen Essentials ($1,500-$2,000)",
          content: "Complete cookware set, dishes for 8, glassware, cutlery, coffee maker, toaster, and basic appliances. Montreal guests expect fully equipped kitchens - don't cut corners here."
        },
        {
          title: "Linens and Soft Goods ($2,000-$3,000)",
          content: "3-4 complete bedding sets per bed, extra towels, blackout curtains, and area rugs. Buy commercial-grade linens that withstand frequent washing."
        },
        {
          title: "Technology and Amenities ($1,500-$2,500)",
          content: "Smart TV with streaming, high-speed WiFi, smart lock, washer/dryer (if space allows). These amenities justify premium pricing and improve reviews."
        },
        {
          title: "Décor and Finishing Touches ($1,000-$2,000)",
          content: "Wall art, plants, mirrors, lighting, and local Montreal touches. Professional staging photos increase booking rates by 40%."
        }
      ]
    }
  },
  {
    id: 5,
    title: "Tax Strategies for Montreal Airbnb Investors",
    category: "Finance & Tax",
    date: "January 2, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    excerpt: "Maximize your returns with proper tax planning. Understanding deductions, GST/QST registration, and Quebec-specific tax rules.",
    content: {
      intro: "Proper tax planning can significantly impact your bottom line. Here's what Montreal Airbnb investors need to know.",
      sections: [
        {
          title: "GST/QST Registration Requirements",
          content: "If your annual revenue exceeds $30,000, you must register for GST/QST. This allows you to claim input tax credits on expenses but requires charging guests sales tax."
        },
        {
          title: "Deductible Expenses",
          content: "Mortgage interest, property taxes, insurance, utilities, repairs, furnishings, cleaning, platform fees, and professional fees are all deductible. Keep detailed records of all expenses."
        },
        {
          title: "Capital Cost Allowance (CCA)",
          content: "You can claim depreciation on furniture, appliances, and property improvements. However, claiming CCA on the property itself may trigger capital gains tax later."
        },
        {
          title: "Quebec Accommodation Tax",
          content: "Montreal requires collection of 3.5% accommodation tax. This is separate from GST/QST and must be remitted quarterly to Revenue Quebec."
        },
        {
          title: "Working with a Tax Professional",
          content: "Quebec has unique tax rules. A qualified accountant familiar with short-term rentals can save you thousands annually through proper planning and compliance."
        }
      ]
    }
  },
  {
    id: 6,
    title: "Building a 5-Star Airbnb Experience in Montreal",
    category: "Operations",
    date: "December 28, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    excerpt: "Step-by-step guide to delivering exceptional guest experiences that lead to top ratings and repeat bookings.",
    content: {
      intro: "Five-star reviews drive visibility and allow you to charge premium rates. Here's how to consistently deliver excellent experiences.",
      sections: [
        {
          title: "Pre-Arrival Communication",
          content: "Send automated messages with check-in details, parking info, and local recommendations 2-3 days before arrival. Clear communication prevents 80% of guest issues."
        },
        {
          title: "Creating a Guidebook",
          content: "Provide digital or physical guidebook with WiFi password, appliance instructions, emergency contacts, and local recommendations. Include your favorite Montreal restaurants, attractions, and metro tips."
        },
        {
          title: "Professional Cleaning Standards",
          content: "Use a professional cleaning service with hospitality experience. Every surface should be spotless, linens fresh, and amenities fully stocked. Budget 2-3 hours for thorough turnover."
        },
        {
          title: "Thoughtful Amenities",
          content: "Stock quality toiletries, provide coffee/tea, leave welcome snacks, and include umbrellas and reusable shopping bags. Small touches create memorable experiences."
        },
        {
          title: "Response Times and Issue Resolution",
          content: "Respond to messages within 1 hour, 24/7. Have backup plans for common issues (WiFi problems, lockouts, heating). A maintenance person on call is essential."
        }
      ]
    }
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = React.useState(null);

  if (selectedArticle) {
    const article = blogArticles.find(a => a.id === selectedArticle);
    return (
      <div className="legal-page blog-page">
        <button onClick={() => setSelectedArticle(null)} className="back-btn">
          ← Back to Blog
        </button>

        <div className="legal-content blog-article">
          <div className="article-header">
            <span className="article-category">{article.category}</span>
            <h1>{article.title}</h1>
            <div className="article-meta">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          <img src={article.image} alt={article.title} className="article-hero-image" />

          <div className="article-content">
            <p className="article-intro">{article.content.intro}</p>

            {article.content.sections.map((section, index) => (
              <section key={index}>
                <h2>{section.title}</h2>
                <p>{section.content}</p>
              </section>
            ))}
          </div>

          <div className="article-footer">
            <p>Want to analyze real Montreal properties with AI-powered insights?</p>
            <button onClick={() => navigate('/')} className="cta-btn">
              Try CashFlow MTL Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="legal-page blog-page">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Dashboard
      </button>

      <div className="legal-content">
        <div className="blog-header">
          <h1>Montreal Airbnb Investment Blog</h1>
          <p className="blog-tagline">
            Expert guides, market insights, and investment strategies for Montreal's short-term rental market
          </p>
        </div>

        <div className="blog-grid">
          {blogArticles.map((article) => (
            <article key={article.id} className="blog-card" onClick={() => setSelectedArticle(article.id)}>
              <div className="blog-card-image">
                <img src={article.image} alt={article.title} />
                <span className="blog-category">{article.category}</span>
              </div>
              <div className="blog-card-content">
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <div className="blog-card-meta">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <button className="read-more-btn">Read Article →</button>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-cta">
          <h2>Ready to Start Your Airbnb Investment Journey?</h2>
          <p>Use our AI-powered platform to analyze real Montreal properties and forecast your returns</p>
          <button onClick={() => navigate('/')} className="cta-btn">
            Analyze Properties Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
