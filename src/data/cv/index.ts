import type { CvData } from "@/lib/cv/types";
import { appointments } from "./appointments";
import { credentials } from "./credentials";
import { education } from "./education";
import { experience } from "./experience";
import { honors } from "./honors";
import { presentations } from "./presentations";
import { profile } from "./profile";
import { projects } from "./projects";
import { publications } from "./publications";
import { research } from "./research";
import { service } from "./service";
import { skills } from "./skills";
import { teaching } from "./teaching";
import { training } from "./training";

export const cvData: CvData = {
  profile,
  education,
  training,
  credentials,
  appointments,
  experience,
  publications,
  research,
  presentations,
  teaching,
  service,
  honors,
  projects,
  skills,
};
