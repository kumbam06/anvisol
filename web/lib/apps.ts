export const studio = {
  name: "AnviLabs",
  tagline: "Independent iOS product studio",
  email: "support@anvilabs.com",
  github: "https://github.com/kumbam06",
  trackedRepo: "https://github.com/kumbam06/TrackEd",
  site: "https://anvilabs.com"
};

export type AppStatus = "active" | "lab";

export type StudioApp = {
  slug: string;
  name: string;
  platform: string;
  status: AppStatus;
  summary: string;
  href: string;
};

export const apps: StudioApp[] = [
  {
    slug: "gradmate",
    name: "GradMate",
    platform: "iOS 17+",
    status: "active",
    summary:
      "ATS resume and cover letters in one tap, Pomodoro focus with a deadline-aware task list, and in-app study chat.",
    href: "/#gradmate"
  },
  {
    slug: "north",
    name: "North",
    platform: "iOS · In Lab",
    status: "lab",
    summary: "A quieter campus calendar for studios and student orgs. Design in progress.",
    href: "/apps"
  },
  {
    slug: "harbor",
    name: "Harbor",
    platform: "iOS · In Lab",
    status: "lab",
    summary: "Private career notes that stay on-device until you choose to export. Prototyping.",
    href: "/apps"
  }
];
