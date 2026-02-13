import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import { useEffect, useState } from 'react';
import { trackPageView } from '../../utils/analytics';
import { supabase } from '../../utils/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  featured_image: string;
  created_at: string;
  views: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockPosts = [
    {
      id: '1',
      title: 'Comment Réussir son Étude de Marché au Sénégal en 2024',
      slug: 'reussir-etude-marche-senegal-2024',
      excerpt: 'Découvrez les 7 étapes essentielles pour réaliser une étude de marché efficace et obtenir des insights actionnables pour votre business au Sénégal.',
      author: 'Équipe Dakar Marketing',
      category: 'Études de Marché',
      featured_image: 'https://readdy.ai/api/search-image?query=african%20business%20professionals%20analyzing%20market%20research%20data%20on%20laptop%20in%20modern%20dakar%20office%2C%20professional%20business%20photography%2C%20bright%20natural%20lighting%2C%20collaborative%20work%20environment&width=800&height=500&seq=blog1&orientation=landscape',
      created_at: '2024-01-15',
      views: 1247
    },
    {
      id: '2',
      title: '10 Erreurs à Éviter dans votre Business Plan',
      slug: '10-erreurs-business-plan',
      excerpt: 'Les erreurs les plus courantes qui font échouer les demandes de financement et comment les éviter pour maximiser vos chances de succès.',
      author: 'Équipe Dakar Marketing',
      category: 'Business Plan',
      featured_image: 'https://readdy.ai/api/search-image?query=business%20plan%20document%20with%20red%20warning%20marks%20and%20corrections%2C%20professional%20desk%20setup%2C%20financial%20charts%20and%20graphs%2C%20business%20planning%20concept%20photography&width=800&height=500&seq=blog2&orientation=landscape',
      created_at: '2024-01-10',
      views: 892
    },
    {
      id: '3',
      title: 'Marketing Digital : Les Tendances 2024 en Afrique de l\'Ouest',
      slug: 'tendances-marketing-digital-2024-afrique',
      excerpt: 'Analyse des nouvelles tendances du marketing digital qui transforment le paysage business en Afrique de l\'Ouest et comment en tirer profit.',
      author: 'Équipe Dakar Marketing',
      category: 'Marketing Digital',
      featured_image: 'https://readdy.ai/api/search-image?query=digital%20marketing%20trends%20with%20social%20media%20icons%20and%20analytics%20dashboards%2C%20modern%20african%20tech%20workspace%2C%20colorful%20data%20visualization%2C%20innovative%20business%20technology&width=800&height=500&seq=blog3&orientation=landscape',
      created_at: '2024-01-05',
      views: 1563
    },
    {
      id: '4',
      title: 'Enquêtes Marketing : Méthodologie et Bonnes Pratiques',
      slug: 'methodologie-enquetes-marketing',
      excerpt: 'Guide complet pour concevoir et réaliser des enquêtes marketing qui génèrent des données fiables et exploitables pour votre stratégie.',
      author: 'Équipe Dakar Marketing',
      category: 'Enquêtes Marketing',
      featured_image: 'https://readdy.ai/api/search-image?query=market%20survey%20being%20conducted%20with%20tablet%20showing%20questionnaire%2C%20professional%20interviewer%20with%20respondent%2C%20clean%20modern%20setting%2C%20business%20research%20photography&width=800&height=500&seq=blog4&orientation=landscape',
      created_at: '2023-12-28',
      views: 734
    },
    {
      id: '5',
      title: 'Startups Sénégalaises : Les Secteurs Porteurs en 2024',
      slug: 'secteurs-porteurs-startups-senegal-2024',
      excerpt: 'Analyse des opportunités business les plus prometteuses au Sénégal : fintech, agritech, e-commerce, santé digitale et plus encore.',
      author: 'Équipe Dakar Marketing',
      category: 'Entrepreneuriat',
      featured_image: 'https://readdy.ai/api/search-image?query=young%20african%20entrepreneurs%20in%20modern%20startup%20office%20in%20dakar%2C%20innovative%20business%20environment%2C%20technology%20and%20collaboration%2C%20bright%20inspiring%20workspace&width=800&height=500&seq=blog5&orientation=landscape',
      created_at: '2023-12-20',
      views: 2104
    },
    {
      id: '6',
      title: 'Comment Mesurer la Satisfaction Client Efficacement',
      slug: 'mesurer-satisfaction-client',
      excerpt: 'Les indicateurs clés et méthodologies pour évaluer la satisfaction de vos clients et améliorer continuellement votre offre.',
      author: 'Équipe Dakar Marketing',
      category: 'Satisfaction Client',
      featured_image: 'https://readdy.ai/api/search-image?query=customer%20satisfaction%20survey%20with%20happy%20client%20giving%20five%20star%20rating%2C%20professional%20service%20quality%20measurement%2C%20positive%20feedback%20concept%2C%20modern%20business%20photography&width=800&height=500&seq=blog6&orientation=landscape',
      created_at: '2023-12-15',
      views: 1456
    }
  ];

  const categories = ['Tous', 'Études de Marché', 'Business Plan', 'Marketing Digital', 'Enquêtes Marketing', 'Entrepreneuriat', 'Satisfaction Client'];

  const displayPosts = posts.length > 0 ? posts : mockPosts;
  const filteredPosts = selectedCategory === 'Tous' 
    ? displayPosts 
    : displayPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-black to-red-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Blog <span className="text-red-500">Marketing</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Conseils, analyses et tendances marketing pour entrepreneurs et dirigeants d'entreprise au Sénégal et en Afrique de l'Ouest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50 sticky top-20 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all text-sm whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-auto">
                  <img 
                    src={filteredPosts[0].featured_image} 
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Article Vedette
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
                      {filteredPosts[0].category}
                    </span>
                    <span>{formatDate(filteredPosts[0].created_at)}</span>
                    <span className="flex items-center">
                      <i className="ri-eye-line mr-1"></i>
                      {filteredPosts[0].views} vues
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-user-line text-white"></i>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{filteredPosts[0].author}</div>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${filteredPosts[0].slug}`}
                      className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all whitespace-nowrap"
                    >
                      Lire l'Article
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <i className="ri-loader-4-line text-4xl text-red-600 animate-spin"></i>
              <p className="text-gray-600 mt-4">Chargement des articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-500">
                        <i className="ri-eye-line mr-1"></i>
                        {post.views} vues
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors flex items-center"
                      >
                        Lire plus
                        <i className="ri-arrow-right-line ml-1"></i>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Recevez Nos Meilleurs Articles
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Inscrivez-vous à notre newsletter pour ne rien manquer de nos conseils marketing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email professionnel"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-all whitespace-nowrap cursor-pointer">
                S'Inscrire
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
