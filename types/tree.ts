export interface LocaleContent {
  id?: number;
  cg_name?: string;
  cg_description?: string;
  cg_title?: string;
  cg_slug?: string;
  meta_description?: string;
  meta_keywords?: string;
  link?: string;
}

export interface Locale {
  en: LocaleContent;
  ru: LocaleContent;
  fr: LocaleContent;
}

export interface TreeNode {
  id: number;
  depth: number;
  numchild: number;
  category_image: string | null;
  logo_image: string | null;
  menu_image: string | null;
  separate_menu: boolean;
  c_images: number;
  product_rep_1_id: number | null;
  product_rep_2_id: number | null;
  c_views: number;
  og: any | null;
  twitter: any | null;
  locale: Locale;
  search_target?: boolean;
  path_to_top: number[];
  childs?: TreeNode[];
}