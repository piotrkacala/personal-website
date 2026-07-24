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
  machineLabel: string;
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

export interface ConsultingCopy {
  lang: "en" | "pl";
  metadata: SiteMetadata;
  eyebrow: string;
  title: string;
  intro: string;
  homeLabel: string;
  projectExamples: {
    heading: string;
    intro: string;
    items: readonly {
      heading: string;
      body: string;
    }[];
  };
  clientValue: {
    heading: string;
    paragraphs: readonly string[];
    items: readonly string[];
    specialistBoundary: string;
  };
  engagement: {
    heading: string;
    steps: readonly {
      heading: string;
      paragraphs: readonly string[];
      deliverables?: readonly string[];
    }[];
  };
  pricingDelivery: {
    heading: string;
    paragraphs: readonly string[];
  };
  collaboration: {
    heading: string;
    paragraphs: readonly string[];
  };
  ai: {
    heading: string;
    paragraphs: readonly string[];
  };
  fit: {
    goodHeading: string;
    goodItems: readonly string[];
    notHeading: string;
    notItems: readonly string[];
  };
  evidence: {
    heading: string;
    paragraphs: readonly string[];
    linkLabel: string;
    href: string;
  };
  contact: {
    heading: string;
    body: string;
    email: string;
  };
}

export interface SiteCopy {
  lang: "en" | "pl";
  title: string;
  metadata: SiteMetadata;
  hero: {
    headline: string;
    statement: string;
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
    consultingLink: {
      href: string;
      label: string;
    };
  };
  consulting: ConsultingCopy;
}
