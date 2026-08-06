// constants/leadership.ts

export type LeadershipItem = {
  id: string;
  slug: string;
  title: string;
  chip: string;
  image: string;
  images?: string[];
  labels: string[];
  problem: string;
  approach: string;
  result: string;
  tags?: string[];
  link: string | null;

  size: "feature" | "lg" | "md";
  badge?: string;
};

export const leadership: LeadershipItem[] = [
  {
    id: "gravitas25",
    slug: "gravitas25.app",
    title: "Student Organiser",
    chip: "2025",
    image: "/assets/images/leadership/grav25.jpeg",
    // TODO: swap in the real filenames — this is just wired up to demo the carousel
    images: [
      "/assets/images/leadership/grav25a.jpeg",
      "/assets/images/leadership/grav25b.jpeg",
      "/assets/images/leadership/grav25c.jpeg",
      "/assets/images/leadership/grav25d.jpeg",
    ],
    size: "feature",
    badge: "★ Organiser · Highest Student Post",
    labels: ["The role", "What I did", "The impact"],
    problem:
      "graVITas is VIT's flagship techno-management knowledge carnival, run entirely by students end to end.",
    approach:
      "Organised logistics, scheduling, and cross-team coordination across the event, working alongside sponsors, speakers, and a large student volunteer base.",
    result:
      "A smooth, well-run carnival — and hands-on practice at the kind of coordination and stakeholder management that doesn't show up in a codebase.",
    tags: ["Event Ops", "Team Coordination", "Stakeholder Management"],
    link: null,
  },
  {
    id: "riviera25",
    slug: "riviera25.app",
    title: "Student Manager",
    chip: "2025",
    image: "https://picsum.photos/seed/riviera25-manager/700/700",
    // TODO: swap in the real filenames, same as graVITas'25
    images: [
      "/assets/images/leadership/riv25.jpeg",
      "/assets/images/leadership/riv25first.jpeg",
      "/assets/images/leadership/riv25cert.jpeg",
       "/assets/images/leadership/riv25a.jpeg",
        "/assets/images/leadership/riv25b.jpeg",
         "/assets/images/leadership/riv25c.jpeg",
          "/assets/images/leadership/riv25d.jpeg",
           "/assets/images/leadership/riv25e.jpeg",
            "/assets/images/leadership/riv25f.jpeg",
             "/assets/images/leadership/riv25g.jpeg",
              "/assets/images/leadership/riv25final.jpeg",


    ],
    size: "lg",
    labels: ["The role", "What I did", "The impact"],
    problem:
      "Riviera is VIT's international sports and cultural festival, drawing participants from across the country.",
    approach:
      "Managed a team through event execution — scheduling, on-ground coordination, and troubleshooting issues as they came up in real time.",
    result:
      "A festival that ran on schedule despite its scale, and direct experience managing people under real time pressure.",
    tags: ["Team Management", "Event Ops", "Problem-Solving"],
    link: null,
  },
  {
    id: "riviera26",
    slug: "riviera26.app",
    title: "Student Manager",
    chip: "2026",
    image: "https://picsum.photos/seed/riviera26-manager/700/700",
    // TODO: swap in the real filenames, same as graVITas'25
    images: [
      "/assets/images/leadership/riv26a.jpeg",
      "/assets/images/leadership/riv26b.jpeg",
      "/assets/images/leadership/riv26c.jpeg",
      "/assets/images/leadership/riv26d.jpeg",
    ],
    size: "lg",
    labels: ["The role", "What I did", "The impact"],
    problem:
      "Riviera is VIT's international sports and cultural festival, drawing participants from across the country.",
    approach:
      "Managed a team through event execution — scheduling, on-ground coordination, and troubleshooting issues as they came up in real time.",
    result:
      "A festival that ran on schedule despite its scale, and direct experience managing people under real time pressure.",
    tags: ["Team Management", "Event Ops", "Problem-Solving"],
    link: null,
  },

  {
    id: "gravitas24",
    slug: "gravitas24.app",
    title: "Student Coordinator, graVITas'24",
    chip: "2024",
    image: "https://picsum.photos/seed/gravitas24-coordinator/600/400",
    // TODO: swap in the real filenames, same as graVITas'25
    images: [
       "/assets/images/leadership/grav24a.jpeg",
      "/assets/images/leadership/grav24b.jpeg",
      "/assets/images/leadership/grav24c.jpeg",
      "/assets/images/leadership/grav24d.jpeg",
      "/assets/images/leadership/grav24cert.jpeg",
    ],
    size: "md",
    labels: ["The role", "What I did", "The impact"],
    problem:
      "A step up from volunteering — graVITas'24 needed coordinators to own specific verticals of the event.",
    approach:
      "Took ownership of a coordination vertical, briefing volunteers and keeping that slice of the event on schedule.",
    result:
      "First real taste of owning a piece of a large event rather than just executing tasks — groundwork for the organiser role in '25.",
    tags: ["Coordination", "Volunteer Management"],
    link: null,
  },
  {
    id: "volunteer",
    slug: "volunteer.app",
    title: "Volunteer, graVITas'23 & Riviera'24",
    chip: "2023–24",
    image: "https://picsum.photos/seed/festival-volunteer/600/400",
    // TODO: swap in the real filenames, same as graVITas'25
    images: [
      "/assets/images/leadership/riv24a.jpeg",
      "/assets/images/leadership/riv24b.jpeg",
      "/assets/images/leadership/riv24c.jpeg",
      "/assets/images/leadership/grav23a.jpeg",
      "/assets/images/leadership/grav23cert.jpeg",
    ],
    size: "md",
    labels: ["The role", "What I did", "The impact"],
    problem:
      "Getting a first foothold in VIT's two biggest student-run events, graVITas and Riviera.",
    approach:
      "Volunteered across on-ground event operations — registrations, guest handling, and general execution support.",
    result:
      "Learned how large student-run events actually operate — the experience that led into coordinator and organiser roles the following years.",
    tags: ["Event Ops", "Teamwork"],
    link: null,
  },
];
