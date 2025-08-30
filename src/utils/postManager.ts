import type { Post } from '../types/Post';

const STORAGE_KEY = 'blog_posts';

// Carregar posts do localStorage
export const loadPosts = (): Promise<Post[]> => {
  return new Promise((resolve) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const posts = stored ? JSON.parse(stored) : [];
      
      // Se não há posts no localStorage, criar um post exemplo
      if (posts.length === 0) {
        const examplePost: Post = {
          id: 1,
          title: "Como configurar seu ambiente de desenvolvimento",
          slug: "configurar-ambiente",
          excerpt: "Aprenda a configurar seu ambiente para começar a desenvolver seus primeiros projetos web.",
          content: `# Como configurar seu ambiente de desenvolvimento

Um ambiente de desenvolvimento bem configurado aumenta sua produtividade e torna o processo de programação mais agradável.

## Editores de código

### Visual Studio Code

O Visual Studio Code é um dos editores mais populares atualmente. Veja como instalar:

1. Acesse o [site oficial do VSCode](https://code.visualstudio.com/)
2. Baixe a versão compatível com seu sistema operacional
3. Execute o instalador e siga as instruções

### Extensões úteis

Algumas extensões que recomendo para desenvolvimento web:

- **Live Server**: Para visualizar mudanças em tempo real
- **Prettier**: Para formatação automática de código
- **Auto Rename Tag**: Para renomear tags HTML automaticamente
- **Bracket Pair Colorizer**: Para colorir parênteses correspondentes

## Terminal

Um bom terminal é essencial para desenvolvimento:

### Windows
- **Git Bash**: Vem junto com o Git
- **PowerShell**: Terminal nativo melhorado
- **Windows Terminal**: Terminal moderno da Microsoft

### macOS/Linux
O terminal nativo já é excelente, mas você pode usar:
- **iTerm2** (macOS)
- **Zsh** com **Oh My Zsh**

## Controle de versão

### Git

O Git é essencial para qualquer desenvolvedor:

\`\`\`bash
# Instalar Git (Ubuntu/Debian)
sudo apt install git

# Configurar Git
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
\`\`\`

### GitHub

Crie uma conta no [GitHub](https://github.com) para:
- Hospedar seus repositórios
- Colaborar com outros desenvolvedores
- Exibir seu portfólio

## Node.js e npm

Para desenvolvimento web moderno, você precisará do Node.js:

1. Acesse [nodejs.org](https://nodejs.org/)
2. Baixe a versão LTS (Long Term Support)
3. Execute o instalador

Verificar instalação:
\`\`\`bash
node --version
npm --version
\`\`\`

## Navegadores para desenvolvimento

### Chrome DevTools
O Chrome oferece excelentes ferramentas de desenvolvimento:
- Inspetor de elementos
- Console JavaScript
- Network tab para analisar requisições
- Lighthouse para auditorias

### Firefox Developer Edition
Uma versão especial do Firefox focada em desenvolvimento.

## Conclusão

Com essas ferramentas básicas configuradas, você terá um ambiente produtivo para começar a desenvolver. Lembre-se de sempre manter suas ferramentas atualizadas!`,
          coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1170&auto=format&fit=crop",
          category: "tutoriais",
          publishedAt: "2023-05-15",
          readingTime: "8 min"
        };
        
        const initialPosts = [examplePost];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
        resolve(initialPosts);
      } else {
        resolve(posts);
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      resolve([]);
    }
  });
};

// Carregar post por slug
export const loadPostBySlug = async (slug: string): Promise<Post | null> => {
  const posts = await loadPosts();
  return posts.find(post => post.slug === slug) || null;
};

// Salvar post
export const savePost = (post: Post): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await loadPosts();
      const existingIndex = posts.findIndex(p => p.id === post.id);
      
      if (existingIndex >= 0) {
        posts[existingIndex] = post;
      } else {
        posts.push(post);
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// Deletar post
export const deletePost = (id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await loadPosts();
      const filteredPosts = posts.filter(post => post.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};