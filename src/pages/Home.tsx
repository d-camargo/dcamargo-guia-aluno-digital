import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { loadPosts } from '../utils/postManager';
import type { Post } from '../types/Post';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await loadPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Tutoriais e Orientações para Alunos
        </h1>
        <p className="text-lg text-gray-600">
          Guias passo a passo para desenvolvimento web e tecnologia
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readingTime}
                </div>
              </div>
              
              {post.coverImage && (
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {post.title}
              </h2>
              
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                </span>
                <Link 
                  to={`/post/${post.slug}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Ler mais
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum post encontrado.</p>
            <Link 
              to="/admin" 
              className="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;