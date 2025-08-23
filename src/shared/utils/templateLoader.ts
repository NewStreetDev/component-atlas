import React from 'react';
import { TemplateItem } from '@/shared/types/template';

// Template registry for dynamic imports
const templateRegistry: Record<string, Record<string, () => Promise<{ default: React.ComponentType }>>> = {
  contact: {
    MinimalContact: () => import('@/components/templates/contact/MinimalContact'),
    ModernContact: () => import('@/components/templates/contact/ModernContact'),
    CreativeContact: () => import('@/components/templates/contact/CreativeContact'),
    CorporateContact: () => import('@/components/templates/contact/CorporateContact'),
    StartupContact: () => import('@/components/templates/contact/StartupContact'),
  },
  about: {
    CorporateAbout: () => import('@/components/templates/about/CorporateAbout'),
    TechAbout: () => import('@/components/templates/about/TechAbout'),
    HumanAbout: () => import('@/components/templates/about/HumanAbout'),
  },
  // Future template categories can be added here
  // landing: {
  //   ModernLanding: () => import('@/components/templates/landing/ModernLanding'),
  // },
  // auth: {
  //   SignInForm: () => import('@/components/templates/auth/SignInForm'),
  // },
};

export interface LoadedTemplate {
  component: React.ComponentType | null;
  loading: boolean;
  error: string | null;
}

export class TemplateLoader {
  private static cache = new Map<string, React.ComponentType>();

  static async loadTemplate(category: string, templateFile: string): Promise<LoadedTemplate> {
    try {
      const componentName = templateFile.replace('.tsx', '');
      const cacheKey = `${category}/${componentName}`;

      // Return from cache if available
      if (this.cache.has(cacheKey)) {
        return {
          component: this.cache.get(cacheKey)!,
          loading: false,
          error: null,
        };
      }

      // Check if template exists in registry
      if (!templateRegistry[category] || !templateRegistry[category][componentName]) {
        return {
          component: null,
          loading: false,
          error: `Template ${componentName} not found in category ${category}`,
        };
      }

      // Dynamic import
      const moduleImport = await templateRegistry[category][componentName]();
      const component = moduleImport.default;

      // Cache the component
      this.cache.set(cacheKey, component);

      return {
        component,
        loading: false,
        error: null,
      };
    } catch (error) {
      return {
        component: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load template',
      };
    }
  }

  static getAvailableCategories(): string[] {
    return Object.keys(templateRegistry);
  }

  static getTemplatesInCategory(category: string): string[] {
    return templateRegistry[category] ? Object.keys(templateRegistry[category]) : [];
  }

  static clearCache(): void {
    this.cache.clear();
  }
}

// Hook for loading templates
export function useTemplateLoader(category: string, templateFile: string) {
  const [state, setState] = React.useState<LoadedTemplate>({
    component: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (!category || !templateFile) {
      setState({ component: null, loading: false, error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    TemplateLoader.loadTemplate(category, templateFile)
      .then(result => setState(result))
      .catch(error => setState({
        component: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load template',
      }));
  }, [category, templateFile]);

  return state;
}