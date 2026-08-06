// constants/contact.ts

export const CONTACT_EMAIL = "vijayravi2705@gmail.com";

export type ContactLink = {
  id: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export const contactLinks: ContactLink[] = [
  {
    id: "phone",
    label: "Phone",
    value: "+91 89857 97979",
    href: "tel:+918985797979",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "/vijay-r",
    href: "https://www.linkedin.com/in/vijay-r-093124275",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "/vijayravi2705",
    href: "https://github.com/vijayravi2705",
    external: true,
  },
];
