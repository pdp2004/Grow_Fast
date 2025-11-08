// src/data/tutorials.js
import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaReact, FaJava } from "react-icons/fa";
import { SiC, SiCplusplus, SiPhp } from "react-icons/si";

const Tutorial = [
  {
    id: 1,
    title: "HTML Tutorial",
    description:
      'The word hypertext markup language is composed of the words "hypertext" and "markup language". HTML is used to create web pages and web applications.',
    buttonText: "Start Learning!",
    icon: FaHtml5,
    color: "#e34c26",
  },
  {
    id: 2,
    title: "CSS Tutorial",
    description:
      "CSS stands for Cascading Style Sheets. It describes how HTML elements are to be displayed on screen, paper, or in other media.",
    buttonText: "Start Learning!",
    icon: FaCss3Alt,
    color: "#264de4",
  },
  {
    id: 3,
    title: "JavaScript Tutorial",
    shortName: "JS",
    description:
      "JavaScript is a lightweight, cross-platform, object-oriented programming language used for web development.",
    buttonText: "Start Learning!",
    icon: FaJs,
    color: "#f0db4f",
  },
  {
    id: 4,
    title: "Python Tutorial",
    description:
      "Python is a high-level, interpreted, general-purpose programming language known for its simplicity and readability.",
    buttonText: "Start Learning!",
    icon: FaPython,
    color: "#3776ab",
  },
  {
    id: 5,
    title: "C Tutorial",
    description:
      "C language is considered as the mother language of all programming languages. It is a procedural programming language.",
    buttonText: "Start Learning!",
    icon: SiC,
    color: "#004482",
  },
  {
    id: 6,
    title: "React JS Tutorial",
    description:
      "React is an open-source front-end JavaScript library. This series will cover React fundamentals and advanced concepts.",
    buttonText: "Start Learning!",
    icon: FaReact,
    color: "#61dafb",
  },
  {
    id: 7,
    title: "Java Tutorial",
    description:
      "Java is a programming language, created in 1995. More than 3 billion devices run Java for various applications.",
    buttonText: "Start Learning!",
    icon: FaJava,
    color: "#007396",
  },
  {
    id: 8,
    title: "C++ Tutorial",
    description:
      "C++ is a cross-platform language that can be used to create high-performance applications and system software.",
    buttonText: "Start Learning!",
    icon: SiCplusplus,
    color: "#00599c",
  },
  {
    id: 9,
    title: "PHP Tutorial",
    description:
      "The term PHP is an acronym for PHP: Hypertext Preprocessor. It is a server-side scripting language designed for web development.",
    buttonText: "Start Learning!",
    icon: SiPhp,
    color: "#777bb4",
  },
];

export default Tutorial;
