export type ParagraphBlock = {
  type: "paragraph";
  text: string;
  tone?: "default" | "aside";
};

export type MetricsBlock = {
  type: "metrics";
  heading: string;
  items: readonly {
    label: string;
    value: string;
  }[];
};

export type LinkBlock = {
  type: "link";
  href: string;
  label: string;
  external?: boolean;
  externalLabel?: string;
};

export type ProjectBlock = ParagraphBlock | MetricsBlock | LinkBlock;

export interface ProjectEntry {
  title: string;
  titleLang?: "en" | "pl";
  blocks: readonly ProjectBlock[];
}

export interface SiteMetadata {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    type: "website";
    locale: string;
    siteName: string;
    url: string;
    image: {
      url: string;
      width: number;
      height: number;
      alt: string;
    };
  };
}

export interface SiteCopy {
  lang: "en" | "pl";
  title: string;
  metadata: SiteMetadata;
  hero: {
    headline: string;
    expansion: string;
  };
  projects: {
    heading: string;
    arc: string;
    items: readonly ProjectEntry[];
  };
  contact: {
    heading: string;
    prompt: string;
    email: string;
  };
}
