// constants/credentials.ts

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  image: string;
  links: string[];
};

export type EducationItem = {
  id: string;
  school: string;
  detail: string;
};

export type LanguageItem = {
  id: string;
  name: string;
  level: string;
};

export const certifications: Certification[] = [
  {
    id: "oci",
    title: "OCI 2025 Certified Generative AI Professional",
    issuer: "Oracle Cloud Infrastructure",
    image: "/assets/images/creds/oci.jpeg",
    links: ["https://catalog-education.oracle.com/ords/certview/sharebadge?id=6CA54ACE87DEB4F79C36BE4C5A7CFC1DF47C2EE685B0FACC12F451476C7C87BC",
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=07127B8941F1A077118784A39620029F1DAAF04E886403EA2BDF9009A7A3101D"
    ],
  },
  {
    id: "aws",
    title: "AWS Machine Learning Engineer — Associate",
    issuer: "Ethanus",
    image: "/assets/images/creds/ml.jpeg",
    links: ["https://www.credly.com/badges/efe296b6-cfec-4143-8e60-08cb90012945/linked_in_profile",
      "https://www.credly.com/badges/8cff0caa-9806-4e31-b1ef-4110bad46103/linked_in_profile",
      "https://www.credly.com/badges/4b45d5d8-76b8-4360-a1af-84ad747f6b40/linked_in_profile"
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: "vit",
    school: "Vellore Institute of Technology",
    detail: "B.Tech, Information Technology · 2022–Present · CGPA 8.68/10",
  },
  {
    id: "njc",
    school: "Narayana Junior College, Vijayawada",
    detail: "MPC Stream · 2020–2022 · 92.6%",
  },
  {
    id: "kkr",
    school: "KKR Gowtham High School, Vijayawada",
    detail: "CBSE · 2019–2020 · 90.4%",
  },
];

export const languages: LanguageItem[] = [
  { id: "en", name: "English", level: "Professional" },
  { id: "te", name: "Telugu", level: "Native" },
  { id: "hi", name: "Hindi", level: "Professional" },
  { id: "ta", name: "Tamil", level: "Basic" },
  { id: "fr", name: "French", level: "Basic" },
];
