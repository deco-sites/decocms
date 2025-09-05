// Common types for blog functionality

export interface BlogAuthor {
  /**
   * @title Nome do autor
   * @description Nome completo do autor
   */
  name?: string;
  /**
   * @title E-mail do autor
   * @description E-mail do autor (opcional)
   */
  email?: string;
  /**
   * @title Avatar do autor
   * @description URL da imagem de avatar do autor
   */
  image?: string;
  /**
   * @title Biografia
   * @description Pequena biografia do autor
   */
  bio?: string;
}

export interface BlogCategory {
  /**
   * @title Nome da categoria
   * @description Nome da categoria exibido aos usuários
   */
  name: string;
  /**
   * @title Slug da categoria
   * @description Identificador único da categoria para URLs
   */
  slug: string;
  /**
   * @title Descrição
   * @description Descrição da categoria (opcional)
   */
  description?: string;
}

// Additional blog-related types can be added here
