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
  blocks: readonly ProjectBlock[];
}

export interface SiteCopy {
  lang: "en" | "pl";
  title: string;
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
